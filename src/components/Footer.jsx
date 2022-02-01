import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

import { Link } from 'react-router-dom'

import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'
import { app } from '../firebase'

export default function Footer() {
  const [isLogado, setIsLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')

  const auth = getAuth(app)
  function Login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        console.log(response)
        if (response) {
          setPassowrd('')
          setEmail('')
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    const logado = onAuthStateChanged(auth, user => {
      console.log(user)
      if (user) setIsLogado(true)
    })

    return logado
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerFooter}>
          <div className={styles.form}>
            {isLogado ? (
              <>
                <h3>Logado</h3>
                <ul>
                  <Link to="cadastrar_produtos">
                    <li>Cadastrar Produtos</li>
                  </Link>
                  <li>Ver Produtos</li>
                  <li>Configurações</li>
                </ul>
              </>
            ) : (
              <>
                <label>Área administrativa</label>
                <input
                  type="email"
                  placeholder="Insira o seu e-mail aqui"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Insira o sua senha"
                  value={password}
                  onChange={e => setPassowrd(e.target.value)}
                />
                <button type="submit" onClick={Login}>
                  Entrar
                </button>
              </>
            )}
          </div>
          {/* <form className={styles.form}>
            <label>Faça parte</label>
            <input type="email" placeholder="Insira o seu e-mail aqui" />
            <button type="submit">Participar</button>
          </form> */}
          <div className={styles.needHelp}>
            <p>Precisa de ajuda?</p>
            <p>(69) 9 9946-2554</p>
          </div>
        </div>
        <div className={styles.infoloja}>
          <p>
            © 2023 por NOME LOJA. Orgulhosamente criado por
            artur.calderonart@gmail.com
          </p>
          <p>
            NOME LOJA Ltda. - CPF/CNPJ: 12.345.678/0000-01 - Av. Bernardino de
            Campos, 98 São Paulo, SP 12345-678 - info@meusite.com -  Telefone:
            (11) 3456-7890
          </p>
        </div>
      </div>
    </>
  )
}