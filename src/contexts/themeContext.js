import React,{createContext} from 'react'
import styles from '../theme.module.css'

export const ThemeContext = createContext({});


function ThemeProvider({children}){
  return(
    <ThemeContext.Provider value={styles.temaPadrao}>
     <div className={styles.temaPadrao}> {children} </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;