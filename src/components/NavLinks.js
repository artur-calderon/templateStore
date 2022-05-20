import React from "react";
import { Link } from 'react-router-dom'
import {IoIosArrowForward} from 'react-icons/io'

const NavLinks = (props)=>{
  const arrow = <IoIosArrowForward  className="arrow" color="white" size="20px"/>
  return(
    <ul>
          <Link to='/' style={{ textDecoration: "none", color:"white"}}>
          <div>
            <li>Home</li>
           {props.isMobile ? arrow : null} 
          </div>
          </Link>
          <Link to='/loja' style={{ textDecoration: "none", color:"white"}}>
          <div>
            <li>Loja</li>
            {props.isMobile ? arrow : null}
          </div>  
          </Link>
          <div>
            <li>Atendimento</li>
            {props.isMobile ? arrow : null}
          </div>
          <div>
            <li>Quem somos?</li>
            {props.isMobile ? arrow : null}
          </div>
        </ul>
  )
}

export default NavLinks;