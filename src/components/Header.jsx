import React, { useContext, useState } from 'react'

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
              <div className={styles.profile} onClick={openMenuAndClose}>
                <CgProfile size="25px" className={styles.cartButtonColor} />
                <span className={styles.userName}  >{user.displayName}</span>
                {
                  menuUserActive ? (
                    <div className={styles.overlayMenu} onClick={openMenuAndClose}>
                      <ul className={styles.menuUser}>
                        <Link to='/perfil'><li>Perfil</li></Link>
                        <Link to='/pedidos'><li>Pedidos</li></Link>
                        <li onClick={SignOut}>Sair</li>
                      </ul>
                    </div>
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
