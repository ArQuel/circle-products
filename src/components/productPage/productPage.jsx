import { useParams } from 'react-router'
import Error404 from '../Error404/Error404'
import styles from './productPage.module.css'
import arrow from '../../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Category from '../category/category'
import Product from '../../dataModels/product.class'
import { useEffect, useState } from 'react'

function ProductPage() {
    let { id } = useParams()
    const [product, setProduct] = useState(undefined)
    const [price, setPrice] = useState('')

    async function updatePrice () {
        // this function will call API to put a new price in the current product
        await fetch(`https://fakestoreapi.com/products/${id}`,{
               method:"PUT",
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                   {
                       title: product.title,
                       price: parseInt(price),
                       description: product.description,
                       image: product.image,
                       category: product.category
                   }
               )
           })
               .then(res=>res.json())
               .then(produit => {
                   // Creating new class of Product with the render of API, then get storage and update it, then update useState of product 
                   const newProduct = new Product(produit)
                   const storageProducts = JSON.parse(localStorage.getItem('products'))
                   for (let i = 0; i < storageProducts.length; i++) {
                       if (parseInt(id) === storageProducts[i].id) {
                          storageProducts[i] = newProduct
                          localStorage.setItem('products', JSON.stringify(storageProducts))
                          setProduct(newProduct)
                       }
                   }
               })
               .catch(error => {
                    alert(error.message)
                    return <Error404 />
               }
                )
   }

    useEffect(() => {
        // get current product in the storage and render it
        const storageProducts = JSON.parse(localStorage.getItem('products'))
        const productData = storageProducts.find(elt => elt.id === parseInt(id))
        const productDataClass = new Product(productData)

        // verify the id in URL, if it's not in current DB fetched, render Error 404
        if (parseInt(id) > storageProducts.length) {
            return <Error404 />
        }
        setProduct(productDataClass)

    }, [id])

    

    return (product ?
        <div className={styles.page}>
            <Link to={`/product`}>
                <img className={styles.arrow} src={arrow} alt='Back arrow'></img>
            </Link>
            <div className={styles.titleCtn}>
                <h1 className={styles.title}>{product.title}</h1>
            </div>
            <div className={styles.productCtn}>
                <div className={styles.imageCtn}>
                    <img src={product.image} className={styles.productIMG} alt="Product pic" />
                </div>
                <div className={styles.productDescCtn}>
                    <div className={styles.descBr}>
                        <div className={styles.productDesc}>
                            <h2 className={styles.productTitle}>Description</h2>
                            <p className={styles.productDescText}>{product.description}</p>
                        </div>
                        <div className={styles.productCategoryCtn}>
                            <h2 className={styles.productTitle}>Category</h2>
                            <Category category={product.category} />
                        </div>
                    </div>

                    <div className={styles.productPrice}>
                        <h2 className={styles.productTitle}>Price</h2>
                    </div>
                    <div className={styles.IbCtn}>
                        <div className={styles.pricesCtn}>
                            <input value={price} onChange={(e) => setPrice(e.currentTarget.value)} type='number' placeholder='€' label='prix'></input>
                            <p className={styles.productTVA}><b>Price</b> (including VAT): {product.getTVA()}</p>
                        </div>
                        <button type='submit' disabled={!price} onClick={updatePrice}>Update product</button>
                    </div>
                </div>
            </div>
        </div> : <h1>Chargement..</h1>
    )
}

export default ProductPage