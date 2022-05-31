import styles from './category.module.css'

function Category (props) {
    console.log(props.category)

    const styleCategory = props.category === "jewelery" ? styles.categoryJewelery : styles.categoryMens

    return (
        <div className={styleCategory}>{props.category}</div>
    )
}

export default Category