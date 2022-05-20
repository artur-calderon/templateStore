import React, { useContext } from 'react'
import styles from './Main.module.css'
import Card from './Card'


import { ProductContext } from '../contexts/products'


export default function Main() {

  const { products } = useContext(ProductContext)

  return (
    <div className={styles.container}>
      <h2>Ano inteiro</h2>
      <p>Itens essenciais</p>

      {
        products.length > 0 ? (
          <Card produtos={products} />
        ) : (
          <h3>Carregando...</h3>
        )
      }

    </div>
  )
}
