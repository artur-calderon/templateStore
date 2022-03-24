import React from 'react'
import styles from './Main.module.css'

export default function Card({ produtos }) {


  return (
    <div className={styles.containercard}>

      {
        produtos.map(itens => {
          return (
            <div className={styles.card} key={itens.id}>
              <div>
                <img
                  src={itens.data().url}
                  alt="foto"
                />
              </div>
              <div>
                <button>{itens.data().title}</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
