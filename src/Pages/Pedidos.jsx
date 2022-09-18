import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './pedidos.css';


export default function Pedidos() {
  document.title = 'Usemarcas | Pedidos'
  const { user } = useContext(UserContext)
  const [userPedidos, setUserPedidos] = useState({})
  // const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (!user) {
      alert('Você não está logado!')
      window.location.href = '/'

    }
    // const u = query(collection(db, 'clientes'), where('uid', '==', user.uid))
    // onSnapshot(u, res => {
    //   setUserInfo(res.docs)
    // })
    const q = query(collection(db, 'pedidos'), where('uid', '==', user.uid));
    onSnapshot(q, res => {
      setUserPedidos(res.docs)
    })

  }, [user])
  return (
    <>
      <Header />
      <div className='cont'>
        <div className='pedidos'>
          {/* <div className='userPhoto'>
            <img src='https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png' alt='userPhoto' />
            Bem vindo <h3>{user.displayName}</h3>

          </div> */}
          <div className='userPedidos'>
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
          {/* <div className='userInfo'>
            {
              userInfo.length > 0 ? (
                userInfo.map(info => {
                  return (
                    <>
                      <h4>{info.data().name}</h4>
                      <h4>{info.data().email}</h4>
                      <h4>{info.data().telefone}</h4>
                    </>
                  )
                })
              ) : (<p>Nada</p>)
            }
          </div> */}
        </div>
      </div>
      <Footer />

    </>

  )
}