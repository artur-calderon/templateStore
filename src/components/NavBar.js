import React from 'react'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import styles from './Header.module.css'

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <Navigation />
      <MobileNavigation />
    </nav>
  )
}
export default NavBar
