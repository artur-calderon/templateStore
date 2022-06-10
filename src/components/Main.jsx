import React, { useContext, useEffect, useState } from 'react'
import styles from './Main.module.css'
import Card from './Card'

import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

import { ProductContext } from '../contexts/products'

import Promotion from './Promotion'


export default function Main() {

  const { products, filter } = useContext(ProductContext)
  const [category, setCategory] = useState([])
  const [categoryClicked, setCategoryClicked] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'categoria'));
    const getCategory = onSnapshot(q, res => {
      setCategory(res.docs)
    })
    return getCategory
  }, [])

  function changeStyleAndFilterCategory(category) {
    filter(category)
    setCategoryClicked('categoryClicked')
  }

  return (
    <>
      <Promotion />
      <div className={styles.container}>
        <div className={styles.filter}>
          <h4>Filtrar produtos por categoria</h4>
          <div className={styles.category}>
            {
              category.map((cat) => {
                return (
                  <li key={cat.id} className={categoryClicked} onClick={() => changeStyleAndFilterCategory(cat.data().newcategory)}>{cat.data().newcategory}</li>
                )
              })
            }
          </div>
        </div>


        {
          products.length > 0 ? (
            <Card produtos={products} />
          ) : (
            <h3>Nenhum produto encontrado nessa categoria</h3>
          )
        }

      </div>
    </>
  )
}
