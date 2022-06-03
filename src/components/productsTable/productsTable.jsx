import Category from '../category/category'
import styles from './productsTable.module.css'
import { Link } from 'react-router-dom'

function Table (props) {
    const datas = Array.from(props.datas)
    return(
        <div className={styles.table}>
            <div className={styles.titleTable}>
                <span className={styles.tableName}>Product name</span>
                <span className={styles.tableCategory}>Category</span>
                <span className={styles.tablePrice}>Price</span>
                <span className={styles.tablePriceVAT}>Price (including VAT)</span>
            </div>
        {datas.map(data => {
            return  <Link key={data.id} className={styles.link} to={`/product/${data.id}`}>
                        <article  className={styles.product}>
                            <span className={styles.productTitle}>{data.title}</span>
                            <Category category={data.category}/>
                            <span className={styles.productPrice}>{data.formatedPrice()}</span>
                            <span className={styles.productPriceVAT}>{data.getTVA()}</span>
                        </article>
                    </Link>
                     
        })}
        </div>
    )
}

export default Table