import React, { useEffect, useState, useContext } from 'react'
import './infoProduct.css'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { BiLeftArrowAlt } from 'react-icons/bi'

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
              </p>
              <h2 className="block_name block_name__mainName">{infoProduct.title}<sup>&reg; </sup></h2>
              <div className="block_informationAboutDevice">
                <div className="block_descriptionInformation">
                  <span>Peak performance with active noise cancelation. Sennheiser's new MOMENTUM Wireless
                    - Closed circumauralheadphone featuring <a className="block_product__link"
                      href="#">Bluetooth<sup>&reg;</sup></a>  wireless technology and NoiseGard Hybrid active noise cancelation
                  </span>
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


  )
}