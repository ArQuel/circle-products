import styles from './category.module.css'

function Category (props) {

    const styleCategory = props.category === "jewelery" ? styles.categoryJewelery : styles.categoryMens

    return (
        <div className={styleCategory}>{props.category}</div>
    )
}

export default Category