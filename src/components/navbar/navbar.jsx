import styles from './navbar.module.css'
import circle from '../../assets/circle.svg'
import { Link } from 'react-router-dom'

function Navbar () {
    return (
        <div className={styles.navbar}>
            <Link className={styles.link} to={`/product/`}>
                <div className={styles.logo}>
                    <img src={circle} className={styles.circleLogo} alt="Logo Circle Products"></img>
                    <h3 className={styles.circleTitle}>Circle <br/> Products</h3>
                </div>
            </Link>
            <div className={styles.menu}>   
                <span>Dashboard</span>
                <span>• Products Management</span>
                <span>Employees Management</span>
                <p className={styles.bar}>______________________________</p>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default Navbar