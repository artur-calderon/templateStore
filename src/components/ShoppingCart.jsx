import React, { useContext, useState, useEffect } from 'react'

import { ProductContext } from '../contexts/products';
import { Link } from 'react-router-dom';

import { db } from '../firebase';
import { collection, addDoc, where, onSnapshot, query } from 'firebase/firestore';

import './ShoppingCart.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import Promotion from './Promotion';
import axios from 'axios';


export default function ShoppingCart() {


  const { cartProducts, deleteProductFromCart } = useContext(ProductContext)
  const [cartProductsPage, setCartProductsPage] = useState({})
  const [total, setTotal] = useState(0)
  const [openCondicional, setOpenCondicional] = useState(false)
  const [openCompra, setOpenCompra] = useState(false)

  // form data 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');


  const Alert = withReactContent(Swal)

  useEffect(() => {
    document.title = 'Usemarcas | Carrinho de compras'
    setCartProductsPage(cartProducts)
    if (cartProducts.length >= 1)
      cartProducts.map(val => {
        // console.log(val);
        if (!val.subtotal) {
          val.subtotal = val.price
          setTotal(prev => prev += Number(val.subtotal))
        } else {
          setTotal(prev => prev += Number(val.subtotal))
        }
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

      rightItem.subtotal = preco
      setTotal(prev => prev += Number(precoFixo))

      //adiciona no estado o novo array com as alteraçoes
      setCartProductsPage(newArray)

    } else if (icon === '-') {

      const precoFixo = rightItem.price
      rightItem.quantidade -= 1
      preco = precoFixo * rightItem.quantidade
      rightItem.subtotal = preco

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

  function Pagar(item, e) {
    e.preventDefault()
    console.log(item)
    let items = [];
    for (let i = 0; i < item.length; i++) {
      items.push({
        "title": item[i].title,
        "quantity": item[i].quantidade,
        "currency_id": "BRL",
        "unit_price": Number(item[i].price),

      })
    }
    axios.post(`https://api.mercadopago.com/checkout/preferences?access_token=TEST-8977151916858959-060220-c512d18edbec866299588d8145a61a6b-157617958`, {
      items,
    }).then(res => {
      console.log(res)
      if (res.status === 201) {
        window.open(res.data.sandbox_init_point, '_blank', 'noopener,noreferrer')
        cadastraCliente()
        cadastraPedido(res.data.id)
      }
    })

  }



  const deleteItem = (index) => {

    let algo = cartProductsPage.find(index => index)
    let count = Number(algo.subtotal) - Number(algo.price) * algo.quantidade
    setTotal(count)
    window.localStorage.removeItem(algo.id)
    deleteProductFromCart(index)

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
                  <div className=" item" key={item.id}>
                    <div className="itemImageAndTitle">
                      <div className="category">{item.category}</div>
                      <div className="imageItem" ><img className="img-fluid" src={item.url[0]} alt='Foto Produto' /></div>
                      <div className="titleItem">
                        <div>{item.title}</div>
                      </div>
                    </div>

                    <div className="quantityItem">
                      <span className="border" onClick={(e) => plusProducts(e, item.id)}>-</span>
                      <span className="border">{item.quantidade}</span>
                      <span className="border" onClick={(e) => plusProducts(e, item.id)}>+</span>
                    </div>
                    <div className="priceItem"><span>Subtotal: </span>{item.subtotal ? item.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) : 'R$ ' + Number(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })} <span className="close" onClick={() => deleteItem(index)} >&#10005;</span></div>
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
          {/* Adicionar consulta de frete ############# */}
          <form>
            <p>Frete</p> <select>
              <option className="text-muted">Standard-Delivery- &euro;5.00</option>
            </select>
            <p>Código Promocional</p> <input id="code" placeholder="Digite seu código..." />
          </form>
          <div className="row" >
            <div className="col">TOTAL</div>
            <div className="col">{total.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}</div>
          </div>
          <button className="btn" onClick={() => cartProductsPage.length > 0 ? setOpenCompra(true) : null}>COMPRAR</button>
          <button className="btn" onClick={() => cartProductsPage.length > 0 ? setOpenCondicional(!openCondicional) : null}>CONDICIONAL</button>
        </div>
      </div >
    )

  }



  function cadastraCliente() {

    const q = query(collection(db, 'clientes'), where('cpf', '==', cpf));
    onSnapshot(q, res => {
      if (res.size === 0) {
        addDoc(collection(db, 'clientes'), {
          name,
          email,
          cpf,
          telefone,
          endereco
        }).then(res => { if (res) console.log('Cliente Cadastrado') })
      } else {
        console.log('cliente já cadastrado')
      }
    })
  }

  function cadastraPedido(id) {
    const date = new Date();
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    console.log(dataAtual)
    if (cartProductsPage.length > 0) {
      addDoc(collection(db, 'pedidos'), {
        cartProductsPage,
        total,
        cpf,
        condicional: openCondicional,
        id,
        dataAtual

      }).then(res => {
        console.log(res)
        if (res)
          Alert.fire({
            title: 'Pedido Realizado',
            icon: 'success',
            text: 'Aguarde que entraremos em contato!',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            }

          })
        setOpenCondicional(false)
        setOpenCompra(false)
        setCartProductsPage({})
        window.localStorage.clear()
      })
    }


  }

  function Condicional(e) {
    e.preventDefault();
    cadastraCliente()
    cadastraPedido(null)
  }

  return (
    <>
      {/* modal de condicional */}
      {openCondicional && <Modal closer={setOpenCondicional}>
        <div className="form-style-8">
          <h2>Insira suas Infomações</h2>
          <form onSubmit={(e) => Condicional(e)}>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} required placeholder="Nome Completo" />
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
            <input type="number" name="cpf" onChange={(e) => setCpf(e.target.value)} required placeholder="CPF" />
            <input type="number" name="telefone" onChange={(e) => setTelefone(e.target.value)} required placeholder="Telefone" />
            <input type="text" name="endereco" onChange={(e) => setEndereco(e.target.value)} required placeholder="Endereço" />
            <input type="submit" value="Pedir Condicional" />
          </form>
        </div>
      </Modal>}

      {/* modal de compra */}
      {openCompra && <Modal closer={setOpenCompra}>
        <div className="form-style-8">
          <h2>Insira suas Infomações</h2>
          <form onSubmit={(e) => Pagar(cartProductsPage, e)}>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} required placeholder="Nome Completo" />
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
            <input type="number" name="cpf" onChange={(e) => setCpf(e.target.value)} required placeholder="CPF" />
            <input type="number" name="telefone" onChange={(e) => setTelefone(e.target.value)} required placeholder="Telefone" />
            <input type="text" name="endereco" onChange={(e) => setEndereco(e.target.value)} required placeholder="Endereço" />
            <input type="submit" value="Comprar" />
          </form>
        </div>
      </Modal>}
      <Header />
      <Promotion />
      <Cart />
      <Footer />
    </>
  )
}