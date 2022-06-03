import styles from './Error404.module.css'

function Error404 () {
    return (
        <div className={styles.error404Ctn}>
            <div className={styles.error404}>
                <h1 className={styles.erreurTitre}>
                    Erreur 404 : Page non trouvée
                </h1>
                <h2 className={styles.erreurDesc}>
                    Veuillez rentrer un URL ou un ID de produit correct.
                </h2>
            </div>
        </div>
    )
}

export default Error404