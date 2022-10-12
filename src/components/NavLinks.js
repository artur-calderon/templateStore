import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { ProductContext } from '../contexts/products'
import styles from './Header.module.css'

const NavLinks = props => {
  const [category, setCategory] = useState([])
  const { filter } = useContext(ProductContext)

  useEffect(() => {
    const q = query(collection(db, 'categoria'))
    const getCategory = onSnapshot(q, res => {
      setCategory(res.docs)
    })
    return getCategory
  }, [])

  function playFilter(cat) {
    filter(cat)
    props.fecharMenu(false)
  }

  const arrow = (
    <IoIosArrowForward className="arrow" color="white" size="20px" />
  )
  return (
    <>
      <ul>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.item}>
            <li>Home</li>
            {props.isMobile ? arrow : null}
          </div>
        </Link>

        <Link to="/loja" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.item}>
            <li>Loja</li>
            {props.isMobile ? arrow : null}
          </div>
        </Link>

        <div className={styles.item}>
          <li>Atendimento</li>
          {props.isMobile ? arrow : null}
        </div>

        <div className={styles.item}>
          <li>Quem somos?</li>
          {props.isMobile ? arrow : null}
        </div>
        <div className={styles.filter}>
          <div className={styles.item}>
            <li className={styles.reset} onClick={() => playFilter(null)}>
              Todos produtos
            </li>
            {props.isMobile ? arrow : null}
          </div>
          {category.map(cat => {
            return (
              <div className={styles.item} key={cat.id}>
                <li onClick={() => playFilter(cat.data().newcategory)}>
                  {cat.data().newcategory}
                </li>
                {props.isMobile ? arrow : null}
              </div>
            )
          })}
        </div>
      </ul>
    </>
  )
}

export default NavLinks
