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
        <Link to='/' className={styles.img_logo}><img src={logoUsemarcas} alt='Logo usemarcas' /></Link>
        <NavBar />
        <div className={styles.cartButton}>
          <Link to='/carrinho'><HiOutlineShoppingBag size="25px" className={styles.cartButtonColor} /></Link>
          {cartProducts.length >= 1 ? <span className={styles.cartQuantity}>{cartProducts.length}</span> : null}
        </div>
      </div>

    </div >
  )
}
