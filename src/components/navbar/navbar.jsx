import styles from './navbar.module.css'
import circle from '../../assets/circle.svg'

function Navbar () {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={circle} className={styles.circleLogo} alt="Logo Circle Products"></img>
                <h3 className={styles.circleTitle}>Circle <br/> Products</h3>
            </div>
            <div className={styles.menu}>   
                <span>Dashboard</span>
                <span>• Products Management</span>
                <span>Employees Management</span>
                <span className={styles.bar}>______________________________</span>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default Navbar