import { useNavigate, useParams } from 'react-router'
import Error404 from '../Error404/Error404'
import styles from './productPage.module.css'
import arrow from '../../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Category from '../category/category'
import Product from '../../dataModels/product.class'
import { useCallback, useEffect, useState } from 'react'
// Lib import as bonus to have a nice loader
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import ApiServices from '../../services/fetch'

function ProductPage() {
    /**
        * This component will render the Product page, with description, price and image concerning the product.
    */

    let { id } = useParams()
    const [product, setProduct] = useState(undefined)
    const [price, setPrice] = useState('')
    const navigate = useNavigate()

    // using Callback to work with async 
    const fetchData = useCallback(async () => {
        // take datas from API and put it in localStorage
        const products = await ApiServices()
        localStorage.setItem('products', JSON.stringify(products))
        // verify if the id match with a product id
        const productData = products.find(elt => elt.id === parseInt(id))
        if (!productData) {
            navigate('/product/error/404')
        } else {
            const productDataClass = new Product(productData)
            setProduct(productDataClass)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Each render, the component will verify if there is something in the localStorage to render it, if not, it call the API to get the products and put it in localStorage.
    useEffect(() => {
        // verify if id in URL is a number
        if (isNaN(id)) {
            navigate('/product/error/404')
        } else {
            // verify if there is something in localStorage
            const products = JSON.parse(localStorage.getItem('products'))
            if (products) {
                // if there is products in localStorage, compare the id with the products id
                const productData = products.find(elt => elt.id === parseInt(id))
                // go error 404 if the id is not matching
                if (!productData) {
                    navigate('/product/error/404')
                } else {
                    const productDataClass = new Product(productData)
                    setProduct(productDataClass)
                }
            } else {
                // if there is nothing in localStorage, recall the API
                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // this function will call API to put a new price in the current product and update VAT
    const updatePrice = useCallback(async () => {
        // check if input is > 0
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
                // Creating new class of Product with the render of API, then get storage and update it, then update useState of product and clear price
                const newProduct = new Product(produit)
                const storageProducts = JSON.parse(localStorage.getItem('products'))
                for (let i = 0; i < storageProducts.length; i++) {
                    if (parseInt(id) === storageProducts[i].id) {
                        storageProducts[i] = newProduct
                        localStorage.setItem('products', JSON.stringify(storageProducts))
                        setProduct(newProduct)
                        setPrice('')
                    }
                }
            })
            .catch(error => {
                alert(error.message)
                return <Error404 />
            }
            )
    }, [id, price, product])

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
                            <input id="price" step="0.01" min='0' onChange={(e) => setPrice(e.currentTarget.value)} type='number' placeholder='€' label='price' value={price} />
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