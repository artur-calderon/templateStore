import React, { useContext } from 'react'
import styles from './Main.module.css'
import Card from './Card'

import emptyCart from '../img/basket.png'



import { ProductContext } from '../contexts/products'


import Promotion from './Promotion'


export default function Main() {

  const { products } = useContext(ProductContext)



  return (
    <div className={styles.body}>
      <Promotion />
      <div className={styles.container}>
        <div className={styles.content}>
          {
            products.length > 0 ? (
              <Card produtos={products} />
            ) : (
              <div className={styles.emptyCart}>
                <h3>Nenhum produto encontrado nessa categoria</h3>
                <img src={emptyCart} alt='emptyCart'></img>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
