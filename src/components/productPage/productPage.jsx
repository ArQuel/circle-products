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

    useEffect(() => {
        const storageProducts = JSON.parse(localStorage.getItem('products'))
        const productData = storageProducts.find(elt => elt.id === parseInt(id))
        const productDataClass = new Product(productData)

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
                            <input type='number' placeholder='€' label='prix'></input>
                            <p className={styles.productTVA}><b>Price</b> (including VAT): {product.getTVA()}</p>
                        </div>
                        <button>Update product</button>
                    </div>
                </div>
            </div>
        </div> : <h1>Chargement..</h1>
    )
}

export default ProductPage