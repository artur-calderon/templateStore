import React from "react";
import NavLinks from "./NavLinks";
import styles from './Header.module.css'


const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <NavLinks />
    </div>
  )
}
export default Navigation;