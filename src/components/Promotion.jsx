import React, { useContext, useEffect, useState } from 'react';
import styles from './Promotion.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css'
import 'swiper/css/autoplay'
import "swiper/css/pagination";

import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'


import { ProductContext } from '../contexts/products';


function Promotion() {
  const [category, setCategory] = useState([])
  const [showArrow, setShowArrow] = useState(null)
  const { filter } = useContext(ProductContext)

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
    <div className={styles.containerPromotion}>
      <ul className={styles.category}>
        <li className={styles.sideTitle}>Categorias</li>
        <li className={styles.reset} onClick={(e) => changeStyleAndFilterCategory(null)}>Todos produtos</li>
        {
          category.map((cat) => {
            return (
              <li
                key={cat.id}
                onClick={(e) => changeStyleAndFilterCategory(cat.data().newcategory)}

                className={showArrow === cat.data().newcategory ? styles.clicked : null}
              >
                {cat.data().newcategory}
              </li>
            )
          })
        }
      </ul>
      <div className={styles.mainImage}>
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 5,
            }
          }}
          className={styles.swiper}
        >
          <SwiperSlide><img className={styles.imgSlide} src='https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80' alt='images' /></SwiperSlide>
          <SwiperSlide><img className={styles.imgSlide} src='https://images.unsplash.com/photo-1503342452485-86b7f54527ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='images' /></SwiperSlide>
          <SwiperSlide><img className={styles.imgSlide} src='https://images.unsplash.com/photo-1538329972958-465d6d2144ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='images' /></SwiperSlide>
          <SwiperSlide><img className={styles.imgSlide} src='https://images.unsplash.com/photo-1477814670986-8d8dccc5640d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80' alt='images' /></SwiperSlide>
        </Swiper>
      </div>

    </div>
  )
}

export default Promotion;