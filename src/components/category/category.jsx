import styles from './category.module.css'
import PropTypes from "prop-types"


/**
    * This component will render category element, and will switch style between two ones.
    * @param {array} props - Array of objects where datas are.
*/
function Category(props) {



    // is the category jewelery ? if yes, give it his own style, if no give men's clothing style.
    const styleCategory = props.category === "jewelery" ? styles.categoryJewelery : styles.categoryMens

    return (
        <div className={styleCategory}>{props.category}</div>
    )
}

// React propTypes define here which type of props the component must get

Category.propTypes = {
    category: PropTypes.array.isRequired
}

export default Category