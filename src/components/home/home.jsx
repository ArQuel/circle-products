import styles from './home.module.css'
import ApiServices from '../../services/fetch'
import { useEffect, useState } from 'react'
import Table from '../productsTable/productsTable'
import Product from '../../dataModels/product.class'

function Home() {

  /**
    * This component will render Home page, which render the dashboard.
  */

  const [datas, setDatas] = useState(undefined)

  // Each render, the component will verify if there is something in the localStorage to render it, if not, it call the API to get the products and put it in localStorage.
  useEffect(() => {
    if (!datas) {
      const storageProducts = localStorage.getItem('products')
      const products = storageProducts ? JSON.parse(storageProducts).map(elt => new Product(elt)) : undefined
      if (products) {
        setDatas(products)
      } else {
        ApiServices().then(datas => {
          const products = datas.map(data => new Product(data))
          localStorage.setItem('products', JSON.stringify(products))
          setDatas(products)
        })
      }
    }
  }, [datas])

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Products management</h1>
      {datas ? <Table datas={datas} /> : <h1>Chargement</h1>}
    </div>
  )
}

export default Home