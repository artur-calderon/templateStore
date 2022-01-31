import React from 'react'
import styles from './Header.module.css'

import { Link } from 'react-router-dom'

export default function header() {
  return (
    <div>
      <div className={styles.menu}>
        <div>
          <h3>Logo Loja</h3>
        </div>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='loja'>
              <li>Loja</li>
          </Link>

          <a href="#">
            <li>Atendimento</li>
          </a>
          <a href="#">
            <li>Quem somos?</li>
          </a>
        </ul>
      </div>
      <div className={styles.mainImage}>
        <div>
          <h3>Coleção Primavera e Verão disponível</h3>
          <button>Ver mais</button>
        </div>
      </div>
    </div>
  )
}
