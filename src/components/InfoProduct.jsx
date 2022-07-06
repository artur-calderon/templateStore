import React, { useEffect, useState, useContext } from 'react'
import './infoProduct.css'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { BiLeftArrowAlt } from 'react-icons/bi'

import { ProductContext } from '../contexts/products'
import Promotion from './Promotion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import { Pagination } from "swiper";
import 'swiper/css'
import "swiper/css/navigation";



export default function InfoProduct({ id }) {
  const [infoProduct, setInfoProduct] = useState([]);
  const [url, setUrl] = useState([]);
  const history = useNavigate()
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {

    const docRef = doc(db, 'products', id);
    const getInfoProduct = getDoc(docRef)

    getInfoProduct.then(val => {
      setInfoProduct(val.data())
      console.log(val.data().urls)
      setUrl(val.data().urls)

      if (val._document === null) {
        alert('Nenhum Produto Encontrado! Redirecionando para página principal')
        history('/')
      }
    })


    return getInfoProduct
  }, [])


  return (
    <>
      <Promotion />
      <main className="main">

        {
          infoProduct ? (
            <div className="productCard_block">

              <Swiper
                spaceBetween={2}
                slidesPerView={1}
                navigation={true}
                modules={[Pagination]}
                pagination={true}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  }
                }}
                className='info'
              >
                {
                  url.map(url => {
                    return (
                      <SwiperSlide key={url.id}>
                        <img src={url} alt='Produto' key={url.id} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
              <div className="block_product">
                <p className="block_model">
                  <span className="block_model__text">Categoria: </span>
                  <span className="block_model__number">{infoProduct.categoria}</span>
                </p>
                <h2 className="block_name block_name__mainName">{infoProduct.title}<sup>&reg; </sup></h2>
                <div className="block_informationAboutDevice">
                  <div className="block_descriptionInformation">
                    <span>{infoProduct.descricao}</span>
                  </div>


                  <div className="row">
                    <div className="block_price">
                      <p className="block_price__currency">R$ {infoProduct.preco}</p>
                      <p className="block_price__shipping">Frete por conta do comprador</p>
                    </div>
                    <div className="button_addToCard">
                      <FaCartPlus size="50px" onClick={() => addToCart(id)} />
                      <div>
                        <Link to='/'><BiLeftArrowAlt /> Voltar para Produtos</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>

          )

            : (
              <h1>Nenhum Produto encontrado</h1>
            )
        }




      </main>
    </>

  )
}