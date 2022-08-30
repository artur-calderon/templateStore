import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './perfil.css';


export default function Perfil() {
  document.title = 'Usemarcas | Meu perfil'
  const { user } = useContext(UserContext)
  const [userPedidos, setUserPedidos] = useState({})

  useEffect(() => {
    if (!user) {
      alert('Você não está logado!')
      window.location.href = '/'
    }
    const q = query(collection(db, 'pedidos'), where('uid', '==', user.uid));
    onSnapshot(q, res => {
      setUserPedidos(res.docs)
    })

  }, [user])
  return (
    <>
      <Header />
      <div className='cont'>
        <div className='perfil'>
          <div className='userPhoto'>
            <img src='https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png' alt='userPhoto' />
            Bem vindo <h3>{user.displayName}</h3>

          </div>
          <div className='userPedidos'>
            <h4>Meus pedidos:</h4>
            {
              userPedidos.length > 0 ? (
                userPedidos.map(ped => {
                  const prod = ped.data().cartProductsPage;

                  return (
                    prod.map(p => {
                      return (
                        <div className='pedidoSingle'>
                          <div className='imageProd'>
                            <img src={p.url} alt={p.title} />
                            <div className='infoPedido'>
                              <span><b>{p.title}</b></span>
                              <span><b>Data:</b> {ped.data().dataAtual}</span>
                              <span><b>Endereço de entrega:</b><br /> {ped.data().enderecoEntrega}</span>
                              <span><b>Itens:</b><br /> {p.quantidade}</span>
                              <span><b> Tipo do pedido: </b> {ped.data().condicional ? 'Condicional' : 'Compra'}</span>

                            </div>
                          </div>
                          <span><b>Total:</b> {ped.data().total}</span>
                        </div>
                      )
                    })
                  )

                })
              ) : (
                <h1>Nenhum prod</h1>
              )
            }
          </div>
          <div className='userInfo'>
            <p>Pedido X</p>
            <p>Pedido X</p>
            <p>Pedido X</p>
            <p>Pedido X</p>
            <p>Pedido X</p>
            <p>Pedido X</p>

          </div>
        </div>
      </div>
      <Footer />

    </>

  )
}