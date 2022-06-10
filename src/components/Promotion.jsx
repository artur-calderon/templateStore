import React from 'react';
import './Promotion.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import 'swiper/css'
import "swiper/css/navigation";
function Promotion() {
  return (
    <div className='mainImage'>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          }
        }}
        className='swiper'
      >
        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2016/11/23/17/25/woman-1853939__340.jpg' alt='images' /></SwiperSlide>
        <SwiperSlide><img src='https://images.unsplash.com/photo-1576248314791-3c17ed9fa182?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9kYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='images' /></SwiperSlide>
        <SwiperSlide><img src='https://images.unsplash.com/photo-1583002083815-8c6305bd56a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='images' /></SwiperSlide>
        <SwiperSlide><img src='https://images.unsplash.com/photo-1583001809873-a128495da465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW9kYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='images' /></SwiperSlide>
      </Swiper>
    </div>
    // <div className={styles.mainImage}>
    //  <div>
    //     <h3>Coleção Primavera e Verão disponível</h3>
    //     <button>Ver mais</button>
    //   </div> 

    // </div>
  )
}

export default Promotion;