import Category from '../category/category'
import styles from './productsTable.module.css'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

function Table (props) {
    /**
        * This component will render the main page, including a table with all the products.
        * @param {array} props - Array of objects where datas are.
    */

    const datas = Array.from(props.datas)
    // const tabSort = false
    // datas.sort(compareCategory)

    // function compareCategory (a , b) {
    //     if (a.category.toLowerCase() < b.category.toLowerCase()) {
    //         return !tabSort
    //     }
    // }

    return(
        <div className={styles.tableCtn}>

        <div className={styles.table}>
            <div className={styles.titleTable}>
                <span className={styles.tableName}>Product name</span>
                <span className={styles.tableCategory}>Category</span>
                <span className={styles.tablePrice}>Price</span>
                <span className={styles.tablePriceVAT}>Total (TVA)</span>
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
        </div>

    )
}

// React propTypes define here which type of props the component must get

Table.propTypes = {    
    datas : PropTypes.array.isRequired
  } 

export default Table