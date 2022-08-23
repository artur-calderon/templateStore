import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, db, provider } from '../firebase'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'

export const UserContext = createContext({})

function UserProvider({ children }) {
  const [user, setUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        const q = query(
          collection(db, 'clientes'),
          where('uid', '==', user.uid)
        )
        onSnapshot(q, res => {
          if (res.size === 0) {
            addDoc(collection(db, 'clientes'), {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              cpf: '',
              telefone: '',
              endereco: []
            }).then(res => {
              if (res) console.log('Cliente Cadastrado')
            })
          } else {
            console.log('cliente já cadastrado')
          }
        })

        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [])

  function Auth() {
    signInWithPopup(auth, provider).then(result => {
      setUser(result.user)
    })
  }
  function SignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(false)
      })
      .catch(error => {
        // An error happened.
      })
  }
  return (
    <UserContext.Provider
      value={{
        SignOut,
        Auth,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
