import React, { useEffect, useState, useContext } from 'react'
import './infoProduct.css'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

import { ProductContext } from '../contexts/products'




export default function InfoProduct({ id }) {
  const [infoProduct, setInfoProduct] = useState([]);
  const history = useNavigate()
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {
    const docRef = doc(db, 'products', id);
    const getInfoProduct = getDoc(docRef)

    getInfoProduct.then(val => {
      setInfoProduct(val.data())

      if (val._document === null) {
        alert('Nenhum Produto Encontrado! Redirecionando para página principal')
        history('/')
      }
    })


    return getInfoProduct
  }, [])


  return (
    <main className="main">

      {
        infoProduct ? (
          <div className="productCard_block">
            <div className='imageProduct'>
              <img src={infoProduct.url}>
              </img>
            </div>
            <div className="block_product">
              <p className="block_model">
                <span className="block_model__text">Categoria: </span>
                <span className="block_model__number">{infoProduct.categoria}</span>
                <Link to="/carrinho">Carrinho</Link>
              </p>
              <h2 className="block_name block_name__mainName">{infoProduct.title}<sup>&reg; </sup></h2>
              <h2 className="block_name block_name__addName">Wireless Black</h2>

              {/* <p className="block_product__advantagesProduct">
                {infoProduct.descricao}
              </p> */}

              <div className="block_informationAboutDevice">

                <div className="block_descriptionCharacteristic block_descriptionCharacteristic__disActive">

                </div>


                <div className="block_descriptionInformation">
                  <span>Peak performance with active noise cancelation. Sennheiser's new MOMENTUM Wireless
                    - Closed circumauralheadphone featuring <a className="block_product__link"
                      href="#">Bluetooth<sup>&reg;</sup></a>  wireless technology and NoiseGard Hybrid active noise cancelation
                  </span>
                </div>


                <div className="row ">
                  <div className="large-6 small-12 column left-align">
                    <div className="block_price">
                      <p className="block_price__currency">R$ {infoProduct.preco}</p>
                      <p className="block_price__shipping">Frete por conta do comprador</p>
                    </div>
                    <div className="block_quantity clearfix">
                      <span className="text_specification">Quantidade</span>
                      <div className="block_quantity__chooseBlock">
                        <input className="block_quantity__number" name="quantityNumber"
                          type="text" min="1" />
                        <button className="block_quantity__button block_quantity__up"></button>
                        <button className="block_quantity__button block_quantity__down"></button>
                      </div>
                    </div>
                  </div>
                  <div className="large-6 small-12 column end">
                    {/* <div className="block_goodColor">
                  <span className="text_specification">Choose your colors:</span>
                  <div className="block_goodColor__allColors">
                    <input type="radio" name="colorOfItem" className="radio_button"
                      id="radioColor" checked />
                    <label for="radioColor"
                      className="block_goodColor__radio block_goodColor__black"></label>
                    <input type="radio" name="colorOfItem" className="radio_button"
                      id="radioColor2" />
                    <label for="radioColor2"
                      className="block_goodColor__radio block_goodColor__silver"></label>
                  </div>
                </div> */}
                    <button className="button button_addToCard" onClick={() => addToCart(id)}>
                      Adicionar ao carrinho
                    </button>
                    <button className="button button_addToCard">
                      Adicionar a Condicional
                    </button>
                    <div>
                      <Link to='/'>Voltar para Produtos</Link>
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


  )
}