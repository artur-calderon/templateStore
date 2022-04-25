import React, { useContext, useState, useEffect } from 'react'

import { ProductContext } from '../contexts/products';
import { Link } from 'react-router-dom';

import './ShoppingCart.css'

import Header from './Header';
import Footer from './Footer';


export default function ShoppingCart() {


  const { cartProducts, deleteProductFromCart } = useContext(ProductContext)
  const [cartProductsPage, setCartProductsPage] = useState({})
  const [total, setTotal] = useState(0)

  useEffect(() => {

    setCartProductsPage(cartProducts)

    cartProducts.map(val => {
      setTotal(prev => prev += Number(val.price))
    })
  }, [cartProducts])

  function plusProducts(e, id) {
    // variável icon pega o sinal de + ou de - da tag a

    let icon = e.target.firstChild.data

    //cria um novo array para porder ser alterado (pq o react nao deixa alterar diretamente o estado)
    let newArray = Array.from(cartProducts);
    let rightItem = newArray.find(item => item.id === id)

    let preco = 0;
    if (icon === '+') {
      const precoFixo = rightItem.price
      rightItem.quantidade += 1
      preco = precoFixo * rightItem.quantidade
      //adiciona no estado o novo array com as alteraçoes
      rightItem.preco = preco

      setTotal(prev => prev += Number(precoFixo))
      console.log(total)
      setCartProductsPage(newArray)

    } else if (icon === '-') {

      const precoFixo = rightItem.price
      rightItem.quantidade -= 1
      preco = precoFixo * rightItem.quantidade
      rightItem.preco = preco

      if (rightItem.quantidade >= 1) {

        setTotal(prev => prev -= Number(precoFixo))

      }

      if (rightItem.quantidade < 1) {
        rightItem.quantidade = 1;
        preco = precoFixo * rightItem.quantidade
        rightItem.preco = preco
      }
      setCartProductsPage(newArray)
    }
  }

  const handleCLick = (index) => {
    deleteProductFromCart(index)
    setTotal(0)
  }

  function Cart() {

    return (
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4><b>Carrinho de compras</b></h4>
              </div>
              <div className="col align-self-center text-right text-muted">{cartProducts.length} itens</div>
            </div>
          </div>

          {
            cartProductsPage.length > 0 ? (
              cartProductsPage.map((item, index) => {

                return (

                  <div className=" item align-items-center" key={item.id}>
                    <div className="col-2" ><img className="img-fluid" src={item.url} alt='Foto Produto' /></div>
                    <div className="col">
                      <div className=" text-muted">{item.category}</div>
                      <div>{item.title}</div>
                    </div>
                    <div className="col"> <span onClick={(e) => plusProducts(e, item.id)}>-</span><span className="border">{item.quantidade}</span><span onClick={(e) => plusProducts(e, item.id)}>+</span>
                    </div>
                    <div className="col">{item.preco ? item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) : 'R$ ' + item.price} <span className="close" onClick={() => handleCLick(index)} >&#10005;</span></div>
                  </div>

                )
              })
            ) : (<h1>Nenhum Produto</h1>)
          }

          <div className="back-to-shop"><Link to="/"><span className="text-muted">&#x21bc; Back to shop</span></Link></div>
        </div>
        <div className="summary">
          <div>
            <h5><b>Relação de Itens</b></h5>
          </div>
          <hr />
          <div className="row">
            <div className="col" style={{ paddingLeft: 0 }}>ITENS {!cartProducts.length ? 0 : null}</div>
          </div>
          <form>
            <p>SHIPPING</p> <select>
              <option className="text-muted">Standard-Delivery- &euro;5.00</option>
            </select>
            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
          </form>
          <div className="row" >
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">R$ {total}</div>
          </div> <button className="btn">CHECKOUT</button>
        </div>
      </div >
    )

  }

  return (
    <>
      <Header />
      <Cart />
      <Footer />
    </>
  )
}