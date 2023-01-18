import React, { useEffect, useState, useContext } from 'react'
import './infoProduct.css'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { ProductContext } from '../contexts/products'
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
  const [sizeSelected, setSizeSelected] = useState('')
  const [fullImage , setFullImage] = useState('')

  const Alert = withReactContent(Swal)

  useEffect(() => {

    const docRef = doc(db, 'products', id);
    const getInfoProduct = getDoc(docRef)

    getInfoProduct.then(val => {
      setInfoProduct(val.data())
      setUrl(val.data().urls)

      if (val._document === null) {
        Alert.fire( 'Nenhum Produto Encontrado! Redirecionando para página principal', 'info')
        history('/')
      }
    })


    return getInfoProduct
  }, [history, id])

  function formatPrice(price) {
    if (price)
      return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

  }



  function adicionaToCart(id) {
    setClasseClick('clicked')
    setTimeout(() => {
      setClasseClick('')
    }, 3000);
    if (!sizeSelected) {
      Alert.fire('Atenção', 'Selecione um tamanho para continuar', 'info')
      setClasseClick('')
    } else {
      addToCart(id, sizeSelected)

    }
  }

  function chooseSize(e) {
    setSizeSelected(e.target.innerText)
  }

  return (
    <>
      <main className="main">

        {
          infoProduct ? (
            <div className="productCard_block">
              <div className='info'>
                <img src={fullImage && url[0]} alt=''/>
              </div>
              <Swiper
                spaceBetween={3}
                slidesPerView={3}
                navigation={true}
                modules={[Pagination, Navigation]}
                pagination={false}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  }
                }}
                className='smallView'
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
                  <div className="block_descriptionInformation">
                    <span><b>Selecione o Tamanho:{'  '}</b></span>
                    {
                      infoProduct.tamanhos ?
                        infoProduct.tamanhos.map(size =>
                        (<span className={`sizes ${sizeSelected === size ? 'clicked' : ''}`} key={size} onClick={e => chooseSize(e)}>
                          {size}
                        </span>))
                        : (<span>Nenhum tamanho</span>)}
                  </div>


                  <div className="row">
                    <div className="block_price">
                      <p className="block_price__currency">{formatPrice(infoProduct.preco)}</p>
                      <p className="block_price__shipping">Frete por conta do comprador</p>
                    </div>
                    <div className="button_addToCard">
                      <button className={`cart-button ${classeClick}`} onClick={() => adicionaToCart(id)}>
                        <span className="add-to-cart">Adicionar ao carrinho</span>
                        <span className="added">Adicionado</span>
                        <i className="fa fa-shopping-cart"></i>
                        <i className="fa fa-square"></i> </button>
                      <div  className='voltar_comprar'>
                        <Link to='/'><BiLeftArrowAlt /> Voltar a comprar</Link>
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