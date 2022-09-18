import React, { useContext, useEffect, useState } from 'react'
import styles from './Main.module.css'
import Card from './Card'
import { IoIosArrowForward } from 'react-icons/io'
import emptyCart from '../img/basket.png'

import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

import { ProductContext } from '../contexts/products'


import Promotion from './Promotion'


export default function Main() {

  const { products, filter } = useContext(ProductContext)
  const [category, setCategory] = useState([])
  const [showArrow, setShowArrow] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'categoria'));
    const getCategory = onSnapshot(q, res => {
      setCategory(res.docs)
    })
    return getCategory
  }, [])

  function changeStyleAndFilterCategory(category) {
    setShowArrow(category)
    filter(category)

  }
  return (
    <div className={styles.body}>
      <Promotion />
      <div className={styles.container}>
        <ul className={styles.category}>
          <h3 className={styles.sideTitle}>Categorias</h3>
          <li className={styles.reset} onClick={(e) => changeStyleAndFilterCategory(null)}>Todos</li>
          {
            category.map((cat) => {
              return (
                <li
                  key={cat.id}
                  onClick={(e) => changeStyleAndFilterCategory(cat.data().newcategory)}>

                  {showArrow === cat.data().newcategory ? (
                    <>
                      <IoIosArrowForward />
                      {cat.data().newcategory}
                    </>
                  ) : cat.data().newcategory
                  }
                </li>
              )
            })
          }
        </ul>


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
