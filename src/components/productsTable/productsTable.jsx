import Category from '../category/category'
import styles from './productsTable.module.css'

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
            return  <article className={styles.product}>
                        <div className={styles.productTitle}>{data.title}</div>
                        <Category category={data.category}/>
                        {/* <div className={styles.categoryProduct}>{data.category}</div> */}
                        <div className={styles.productPrice}>{data.price}€</div>
                        <div className={styles.productPriceVAT}>{Math.round(data.price + data.price * 0.20 * 100) / 100}€</div>
                    </article>
        })}
        </div>
    )
}

export default Table