import { useParams } from 'react-router'
import Error404 from '../Error404/Error404'
import styles from './productPage.module.css'
import arrow from '../../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Category from '../category/category'
import Product from '../../dataModels/product.class'
import { useEffect, useState } from 'react'
// Lib import as bonus to have a nice loader
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

function ProductPage() {

    /**
        * This component will render the Product page, with description, price and image concerning the product.
    */

    let { id } = useParams()
    const [product, setProduct] = useState(undefined)
    const [price, setPrice] = useState('')

    useEffect(() => {
        // get the current product in the storage 
        const storageProducts = JSON.parse(localStorage.getItem('products'))

        // verify the id in URL, if it's not in current datas, render Error 404 page
        if (isNaN(id) || parseInt(id) > storageProducts.length) {
            return () => { window.location.href = 'error/404' }
        }

        // if product exists, then formate it and set it in the current product state
        const productData = storageProducts.find(elt => elt.id === parseInt(id))
        const productDataClass = new Product(productData)
        setProduct(productDataClass)

    }, [id])

    // this function will call API to put a new price in the current product and update VAT
    async function updatePrice() {
        // check if input is > 0
        document.querySelector('#price').value = ''
        if (price < 0) {
            alert('Le prix doit être supérieur à 0')
            return
        }
        // Call API to put the new price in 
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
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
            .then(res => res.json())
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
                    </div>
                    <div className={styles.IbCtn}>
                        <label htmlFor="price" className={styles.productTitleLabel}>Price</label>
                        <div className={styles.pricesCtn}>
                            <input id="price" step="0.01" min='0' onChange={(e) => setPrice(e.currentTarget.value)} type='number' placeholder='€' label='price'></input>
                            <p className={styles.productTVA}><b>Price</b> (including VAT): {product.getTVA()}</p>
                        </div>
                        <button type='submit' disabled={!price} onClick={updatePrice}>Update product</button>
                    </div>
                </div>
            </div>
        </div> : <div className={styles.loading}><LoopCircleLoading style={{ margin: '45%' }} color='var(--primary)' /></div>
    )
}

export default ProductPage