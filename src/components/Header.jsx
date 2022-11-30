import React, { useContext, useEffect, useRef, useState } from 'react'

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

  const menuUser = useRef();


  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target !== menuUser.current) {
        setMenuUserActive(false)
      }
    })
  }, [])





  function openMenuAndClose() {
    setMenuUserActive(!menuUserActive)
  }

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.navAndLogo}>
          <NavBar />
          <Link to='/' className={styles.img_logo}><img src={logoUsemarcas} alt='Logo usemarcas' /></Link>
        </div>

        <div className={styles.cartButton}>
          {cartProducts.length >= 1 ? <span className={styles.cartQuantity}>{cartProducts.length}</span> : null}
          <Link to='/carrinho'><HiOutlineShoppingBag size="25px" className={styles.cartButtonColor} /></Link>
          {user ?
            <>
              <span className={styles.userName} ref={menuUser} onClick={openMenuAndClose}>{user.displayName}</span>
              <div className={styles.profile}>
                <CgProfile size="25px" className={styles.cartButtonColor} />
                {
                  menuUserActive ? (
                    <ul className={styles.menuUser}>
                      <Link to='/perfil'><li>Perfil</li></Link>
                      <Link to='/pedidos'><li>Pedidos</li></Link>
                      <li onClick={SignOut}>Sair</li>
                    </ul>
                  ) : null
                }

              </div>
            </>
            : <p onClick={() => Auth()}>Login</p>}
        </div>
      </div>

    </>
  )
}
