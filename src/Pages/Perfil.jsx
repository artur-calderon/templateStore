import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './perfil.css';


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
            <img src={user.photoURL} referrerpolicy='no-referrer' alt='userPhoto' />
            Bem vindo <h3>{user.displayName}</h3>

          </div>

          <div className='userInfo'>
            <h3>Suas informações</h3>
            {
              userInfo.length > 0 ? (
                userInfo.map(info => {
                  console.log(info.data())
                  return (
                    <>
                      <p>Email: {info.data().email}</p>
                      <p>Telefone: {info.data().telefone}</p>
                      <p>CPF: {info.data().cpf}</p>
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