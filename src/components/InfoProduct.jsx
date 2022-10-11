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
import { Pagination, Navigation } from "swiper";
import 'swiper/css'
import "swiper/css/navigation";



export default function InfoProduct({ id }) {
  const [infoProduct, setInfoProduct] = useState([]);
  const [url, setUrl] = useState([]);
  const [classeClick, setClasseClick] = useState('');
  const history = useNavigate()
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {

    const docRef = doc(db, 'products', id);
    const getInfoProduct = getDoc(docRef)

    getInfoProduct.then(val => {
      setInfoProduct(val.data())
      setUrl(val.data().urls)

      if (val._document === null) {
        alert('Nenhum Produto Encontrado! Redirecionando para página principal')
        history('/')
      }
    })


    return getInfoProduct
  }, [])

  function adicionaToCart(id) {
    setClasseClick('clicked')
    setTimeout(() => {
      setClasseClick('')
    }, 3000);
    addToCart(id)
  }

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
                modules={[Pagination, Navigation]}
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
                  url.map((url, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={url} alt='Produto' key={index} />
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
                      <button className={`cart-button ${classeClick}`} onClick={() => adicionaToCart(id)}>
                        <span className="add-to-cart">Adicionar ao carrinho</span>
                        <span className="added">Adicionado</span>
                        <i className="fa fa-shopping-cart"></i>
                        <i className="fa fa-square"></i> </button>
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