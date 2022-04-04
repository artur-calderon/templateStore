import React, { useEffect, useState } from 'react'
import './infoProduct.css'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

export default function InfoProduct({ id }) {
  const [infoProduct, setInfoProduct] = useState([]);
  const history = useNavigate()


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
              </p>
              <h2 className="block_name block_name__mainName">{infoProduct.title}<sup>&reg; </sup></h2>
              <h2 className="block_name block_name__addName">Wireless Black</h2>

              <p className="block_product__advantagesProduct">
                {infoProduct.descricao}
              </p>

              <div className="block_informationAboutDevice">

                <div className="block_descriptionCharacteristic block_descriptionCharacteristic__disActive">

                </div>


                <div className="block_descriptionInformation">
                  <span>Peak performance with active noise cancelation. Sennheiser's new MOMENTUM Wireless
                    - Closed circumauralheadphone featuring <a className="block_product__link"
                      href="#">Bluetooth<sup>&reg;</sup></a>  wireless technology and NoiseGard Hybrid active noise cancelation
                  </span>
                </div>

                {/* <div class="block_rating clearfix">
              <fieldset class="block_rating__stars">
                <input type="radio" id="star5" name="rating" value="5" /><label
                  class="full" for="star5" title="Awesome - 5 stars"></label>
                <input type="radio" id="star4half" name="rating"
                  value="4 and a half" /><label class="half" for="star4half"
                    title="Pretty good - 4.5 stars"></label>
                <input type="radio" id="star4" name="rating" value="4" /><label
                  class="full" for="star4" title="Good - 4 stars"></label>
                <input type="radio" id="star3half" name="rating"
                  value="3 and a half" /><label class="half" for="star3half"
                    title="Above average - 3.5 stars"></label>
                <input type="radio" id="star3" name="rating" value="3" /><label
                  class="full" for="star3" title="Average - 3 stars"></label>
                <input type="radio" id="star2half" name="rating"
                  value="2 and a half" /><label class="half" for="star2half"
                    title="Kinda bad - 2.5 stars"></label>
                <input type="radio" id="star2" name="rating" value="2" /><label
                  class="full" for="star2"
                  title="Kinda bad - 2 stars"></label>
                <input type="radio" id="star1half" name="rating"
                  value="1 and a half" /><label class="half" for="star1half"
                    title="Meh - 1.5 stars"></label>
                <input type="radio" id="star1" name="rating" value="1" /><label
                  class="full" for="star1"
                  title="Sucks big time - 1 star"></label>
                <input type="radio" id="starhalf" name="rating"
                  value="half" /><label
                    class="half" for="starhalf"
                    title="Sucks big time - 0.5 stars"></label>
              </fieldset>

              <span class="block_rating__avarage">4.25</span>
              <span class="block_rating__reviews">(153 reviews)</span>

            </div> */}
                <div className="row ">
                  <div className="large-6 small-12 column left-align">
                    <div className="block_price">
                      <p className="block_price__currency">R$ {infoProduct.preco}</p>
                      <p className="block_price__shipping">Shipping and taxes extra</p>
                    </div>
                    <div className="block_quantity clearfix">
                      <span className="text_specification">Quantity</span>
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
                    <button className="button button_addToCard">
                      Add to Cart
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