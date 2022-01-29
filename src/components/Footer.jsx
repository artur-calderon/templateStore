import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.containerFooter}>
        <div className={styles.fiqueconect}>
          <p>Fique conectado</p>
          <p>Icons social media</p>
        </div>
        <form className={styles.form}>
          <label>Faça parte</label>
          <input type="email" placeholder="Insira o seu e-mail aqui" />
          <button type="submit">Participar</button>
        </form>
        <div className={styles.needHelp}>
          <p>Precisa de ajuda?</p>
          <p>(69) 9 9946-2554</p>
        </div>
      </div>
      <div className={styles.infoloja}>
        <p>© 2023 por MOÇA LINDA. Orgulhosamente criado com Wix.com</p>
        <p>
          NOME LOJA Ltda. - CPF/CNPJ: 12.345.678/0000-01 - Av. Bernardino de
          Campos, 98 São Paulo, SP 12345-678 - info@meusite.com -  Telefone:
          (11) 3456-7890
        </p>
      </div>
    </div>
  )
}
