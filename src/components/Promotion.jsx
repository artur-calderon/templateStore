import React from 'react';
import styles from './Promotion.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import 'swiper/css'
import "swiper/css/navigation";
function Promotion() {
  return (
    <div className={styles.mainImage}>
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
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

  )
}

export default Promotion;