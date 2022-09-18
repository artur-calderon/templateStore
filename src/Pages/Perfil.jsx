import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './pedidos.css';


export default function Perfil() {
  document.title = 'Usemarcas | Perfil'
  const { user } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (!user) {
      alert('Você não está logado!')
      window.location.href = '/'

    }
    const u = query(collection(db, 'clientes'), where('uid', '==', user.uid))
    onSnapshot(u, res => {
      setUserInfo(res.docs)
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

          <div className='userInfo'>
            {
              userInfo.length > 0 ? (
                userInfo.map(info => {
                  return (
                    <>
                      <h4>{info.data().email}</h4>
                      <h4>{info.data().telefone}</h4>
                    </>
                  )
                })
              ) : (<p>Nada</p>)
            }
          </div>
        </div>
      </div>
      <Footer />

    </>

  )
}