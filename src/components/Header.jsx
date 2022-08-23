import React, { useContext, useEffect, useState } from 'react'

import styles from './Header.module.css'
import NavBar from '../components/NavBar';
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import logoUsemarcas from '../img/logo isabela.png'


import { ProductContext } from '../contexts/products';
import { UserContext } from '../contexts/user';
import { Link } from 'react-router-dom';


export default function Header() {
  const { cartProducts } = useContext(ProductContext)
  const { user, SignOut, Auth } = useContext(UserContext)
  const [menuUserActive, setMenuUserActive] = useState(false)

  return (
    <div>
      <div className={styles.menu}>
        <NavBar />
        <Link to='/' className={styles.img_logo}><img src={logoUsemarcas} alt='Logo usemarcas' /></Link>

        <div className={styles.cartButton}>
          {cartProducts.length >= 1 ? <span className={styles.cartQuantity}>{cartProducts.length}</span> : null}
          <Link to='/carrinho'><HiOutlineShoppingBag size="25px" className={styles.cartButtonColor} /></Link>
          {user ?
            <>
              <span>{user.displayName}</span>
              <div className={styles.profile} onMouseEnter={() => setMenuUserActive(!menuUserActive)} onClick={() => setMenuUserActive(!menuUserActive)}>
                <CgProfile size="25px" className={styles.cartButtonColor} />
                {
                  menuUserActive ? (
                    <ul className={styles.menuUser}>
                      <Link to='/perfil'><li>Perfil</li></Link>
                      <li onClick={SignOut}>Sair</li>
                    </ul>
                  ) : null
                }

              </div>
            </>
            : <p onClick={() => Auth()}>Fazer login</p>}
        </div>
      </div>

    </div >
  )
}
