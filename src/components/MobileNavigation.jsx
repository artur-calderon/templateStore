import React, { useState } from "react";
import NavLinks from "./NavLinks";
import styles from './Header.module.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCloseCircle } from 'react-icons/ai'


const MobileNavigation = () => {
  const [open, setOpen] = useState(false);


  const openButton = <GiHamburgerMenu color="white" size='20px' onClick={() => setOpen(!open)} />

  const closeButton = <AiFillCloseCircle color="white" size='20px' onClick={() => setOpen(!open)} />



  return (
    <div className={styles.MobileNavigation}>
      {open ? closeButton : openButton}
      {open && <NavLinks isMobile={open} fecharMenu={setOpen} />}


    </div>

  )
}
export default MobileNavigation;