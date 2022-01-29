import React from 'react'
import styles from './Main.module.css'

export default function Main() {
  return (
    <div className={styles.container}>
      <div>
        <h2>Ano inteiro</h2>
        <p>Itens essenciais</p>
      </div>

      <div className={styles.containercard}>
        <div className={styles.card}>
          <div>
            <img
              src="https://static.wixstatic.com/media/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.jpg/v1/fill/w_298,h_353,al_c,q_85,usm_0.66_1.00_0.01/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.webp"
              alt="foto"
            />
          </div>
          <div>
            <button>Product Name</button>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <img
              src="https://static.wixstatic.com/media/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.jpg/v1/fill/w_298,h_353,al_c,q_85,usm_0.66_1.00_0.01/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.webp"
              alt="foto"
            />
          </div>
          <div>
            <button>Product Name</button>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <img
              src="https://static.wixstatic.com/media/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.jpg/v1/fill/w_298,h_353,al_c,q_85,usm_0.66_1.00_0.01/11062b_4ac1336b18834289a842e7e5ffee8234~mv2.webp"
              alt="foto"
            />
          </div>
          <div>
            <button>Product Name</button>
          </div>
        </div>
      </div>
    </div>
  )
}
