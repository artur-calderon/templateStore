import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../contexts/user';
import { onSnapshot, collection, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import './perfil.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Perfil() {
  document.title = 'Usemarcas | Perfil'
  const { user } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({})
  const [inputValue, setIputValue] = useState('')
  const dialog = withReactContent(Swal)

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


  async function updateUserInfo(att) {

    const { value: ipAddress } = await dialog.fire({
      title: 'Atualize seu dado',
      input: 'text',
      inputLabel: 'Novo',
      inputValue: att,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    console.log(ipAddress)
  }
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
                  return (
                    <>
                      <p>Email:{info.data().email}</p><b onClick={() => updateUserInfo(info.data().email)}><u>Editar</u></b>
                      {/* <p>Telefone: {info.data().telefone} <b><u>Editar</u></b></p>
                      <p>CPF: {info.data().cpf} <b><u>Editar</u></b></p>
                      <p>Endereço: {info.data().endereco[0]} <b><u>Editar</u></b></p> */}
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