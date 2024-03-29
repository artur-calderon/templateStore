import React from 'react'
import '../components/Card.css'
import { Link } from 'react-router-dom'


import { GoInfo } from 'react-icons/go'

export default function Card({ produtos }) {



  function formatPrice(price) {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

  }

  return (
    <div className='containercard'>

      {
        produtos.map(itens => {
          return (
            <Link to={`/infoProduct/${itens.id}`
            } key={itens.id} >
              <div className="cardContainer" >
                <div className="imageCard">
                  <img src={itens.data().url || itens.data().urls[0]} alt="Product" className="img-responsive" />
                </div>
                <div className="cardDescription">
                  <div className="title-product">
                    <h3>{itens.data().title}</h3>
                    <span>{itens.data().categoria}</span>
                  </div>
                  {/* <div className="description-prod">
                    <p>Description Product tell me how to change playlist height size like 600px in html5 player. player good work now check this link</p>
                  </div> */}
                  <div className="card-footer">
                    <span className="price">{formatPrice(itens.data().preco)}</span>
                    <span><GoInfo size="25px" /></span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      }










    </div >
  )
}
