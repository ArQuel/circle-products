import styles from './home.module.css'
import ApiServices from '../../services/fetch'
import { useEffect, useState } from 'react'

function Home () {
    
    const [datas, setDatas] = useState(undefined)

    useEffect(() => {
        ApiServices().then(datas => {
          setDatas(datas)
          console.log(datas)
        })
      }, [])

    return (
        <div className={styles.home}>
            <h1 className={styles.title}>Products management</h1>
            {datas ? <p>coucou</p> : <h1>Chargement</h1>}
        </div>  
    )
}

export default Home