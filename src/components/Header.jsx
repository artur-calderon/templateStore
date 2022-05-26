import React, { useContext } from 'react'

import styles from './Header.module.css'
import NavBar from '../components/NavBar';
import { HiOutlineShoppingBag } from 'react-icons/hi'
import logoUsemarcas from '../img/logo isabela.png'


import { ProductContext } from '../contexts/products';
import { Link } from 'react-router-dom';

export default function Header() {
  const { cartProducts } = useContext(ProductContext)
  return (
    <div>
      <div className={styles.menu}>
        <img src={logoUsemarcas} alt='Logo usemarcas' />
        <NavBar />
        <div className={styles.cartButton}>
          <Link to='/carrinho'><HiOutlineShoppingBag size="25px" color='white' /></Link>
          {cartProducts.length >= 1 ? <span className={styles.cartQuantity}>{cartProducts.length}</span> : null}

        </div>
      </div>
      <div className={styles.mainImage}>
        <div>
          <h3>Coleção Primavera e Verão disponível</h3>
          <button>Ver mais</button>
        </div>
      </div>
    </div >
  )
}
