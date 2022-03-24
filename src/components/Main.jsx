import React, { useEffect, useState } from 'react'
import styles from './Main.module.css'
import Card from './Card'
import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'


export default function Main() {

  const [products, setProducts] = useState({})
  const q = query(collection(db, 'products'));

  useEffect(() => {
    const getProducts = onSnapshot(q, res => {
      setProducts(res.docs)
    })
    return getProducts;
  }, [])

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
