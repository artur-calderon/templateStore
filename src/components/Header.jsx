import React, { useContext, useEffect, useState } from 'react'

import styles from './Header.module.css'
import NavBar from '../components/NavBar';
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import logoUsemarcas from '../img/logo isabela.png'


import { ProductContext } from '../contexts/products';
import { Link } from 'react-router-dom';


export default function Header() {
  const { cartProducts } = useContext(ProductContext)



  return (
    <div>
      <div className={styles.menu}>
        <NavBar />
        <Link to='/' className={styles.img_logo}><img src={logoUsemarcas} alt='Logo usemarcas' /></Link>

        <div className={styles.cartButton}>
          <Link to='/carrinho'><HiOutlineShoppingBag size="25px" className={styles.cartButtonColor} /></Link>
          {cartProducts.length >= 1 ? <span className={styles.cartQuantity}>{cartProducts.length}</span> : null}
          <CgProfile size="25px" className={styles.cartButtonColor} />
        </div>
      </div>

    </div >
  )
}
