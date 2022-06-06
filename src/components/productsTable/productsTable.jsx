import Category from '../category/category'
import styles from './productsTable.module.css'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import { useEffect, useState } from 'react'
// Bonus => lib import to have a nice loader
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

function Table(props) {
    const [datasProduct, setDatasProduct] = useState(undefined)
    const [catName, setCatName] = useState('Category ▼')

    /**
        * This component will render the main page, including a table with all the products.
        * @param {array} props - Array of objects where datas are.
    */

    useEffect(() => {
        const datas = props.datas
        setDatasProduct(datas)
    }, [props.datas])

    // Bonus => allow to sort the datas with categories
    function handleSort() {
        const sortedDatas = [...datasProduct].sort((a, b) => {
            return b - a ? 1 : -1
        })
        catName === 'Category ▼' ? setCatName('Category ▲') : setCatName('Category ▼')
        setDatasProduct(sortedDatas)
    }

    return (datasProduct ?
        <div className={styles.tableCtn}>

            <div className={styles.table}>
                <div className={styles.titleTable}>
                    <span className={styles.tableName}>Product name</span>
                    <span className={styles.tableCategory} onClick={handleSort}>{catName}</span>
                    <span className={styles.tablePrice}>Price</span>
                    <span className={styles.tablePriceVAT}>Total (TVA)</span>
                </div>
                {datasProduct.map(data => {
                    return <Link key={data.id} className={styles.link} to={`/product/${data.id}`}>
                        <article className={styles.product}>
                            <span className={styles.productTitle}>{data.title}</span>
                            <Category category={data.category} />
                            <span className={styles.productPrice}>{data.formatedPrice()}</span>
                            <span className={styles.productPriceVAT}>{data.getTVA()}</span>
                        </article>
                    </Link>
                })}
            </div>
        </div>
        : <div className={styles.loading}><LoopCircleLoading style={{ margin: '45%' }} color='var(--primary)' /></div>
    )
}

// React propTypes define here which type of props the component must get

Table.propTypes = {
    datas: PropTypes.array.isRequired
}

export default Table