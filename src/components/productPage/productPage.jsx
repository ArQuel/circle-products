import { useParams } from 'react-router'
import Error404 from '../Error404/Error404'
import styles from './productPage.module.css'

function ProductPage () {
    let {id} = useParams()

    if (id > 7) {
        return <Error404 />
    }
    return (
        <div className={styles.page}>
        <h1>Coucou</h1>
        </div>
    )
}

export default ProductPage