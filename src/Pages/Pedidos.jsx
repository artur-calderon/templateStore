import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './pedidos.css';
import emptyCart from '../img/basket.png'


export default function Pedidos() {
  document.title = 'Usemarcas | Pedidos'
  const { user } = useContext(UserContext)
  const [userPedidos, setUserPedidos] = useState({})


  useEffect(() => {
    if (!user) {
      window.location.href = '/'

    }

    const q = query(collection(db, 'pedidos'), where('uid', '==', user.uid));
    onSnapshot(q, res => {
      setUserPedidos(res.docs)
    })

  }, [user])


  function formatPrice(price) {
    return Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

  }
  return (
    <>
      <Header />
      <div className='cont'>
        <div className='pedidos'>
          <div className='userPedidos'>
            {
              userPedidos.length > 0 ? (
                userPedidos.map(ped => {
                  console.log(ped)
                  const prod = ped.data().cartProductsPage;
                  return (
                    <div className="accordion-wrapper">
                      <div className="accordion">
                        <input type="checkbox" name="radio-a" id={ped.id} defaultChecked />
                        <label className="accordion-label" htmlFor={ped.id}>
                          <strong>Total:</strong>{formatPrice(ped.data().total)}
                          <strong>Data da compra:</strong>{ped.data().dataAtual}
                          <strong>Status do pedido:</strong>{ped.data().status}
                          <strong>Entregar em:</strong>{ped.data().enderecoEntrega.substring(0, 10)}...
                          <strong>{ped.data().condicional ? 'Condicional' : 'Compra'}</strong>
                        </label>
                        <div className="accordion-content">
                          {
                            prod.map(p => {
                              return (
                                <div className='pedidoSingle'>
                                  <div className='imageProd'>
                                    <img src={p.url} alt={p.title} />
                                    <div className='infoPedido'>
                                      <span><b>{p.title}</b></span>
                                      <span><b>Endereço de entrega:</b><br /> {ped.data().enderecoEntrega}</span>
                                      <span><b>Quantidade:</b><br /> {p.quantidade}</span>
                                      <span><b>Tamanho:</b><br /> {p.tamanhoEscolhido}</span>

                                    </div>
                                  </div>

                                </div>

                              )
                            })
                          }
                        </div>
                      </div>
                    </div>


                  )

                })
              ) : (
                <div className='emptyCart'>
                  <h3>Nenhum pedido</h3>
                  <img src={emptyCart} alt='emptyCart'></img>
                </div>
              )
            }
          </div>

        </div>
      </div>
      <Footer />

    </>

  )
}