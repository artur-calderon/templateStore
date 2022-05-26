import React,{createContext, useState,useEffect} from "react";
import { db } from '../firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'

export const ProductContext = createContext({});



//provider que carrega todos os produtos de uma vez e manda para todas as páginas se precisar
function ProductProvider({children}){

  const [products, setProducts] = useState({})
  const [cartProducts, setCartProducts] = useState({})

  useEffect(() => {
    const cartLocalStorage = {...window.localStorage}
    if(cartLocalStorage){
      let keys = Object.keys(cartLocalStorage)
      for (let i = 0; i < keys.length; i++) {
        let items = JSON.parse(window.localStorage.getItem(keys[i]))
        setCartProducts(items)
      }
    }
   

   const q = query(collection(db, 'products'));
    const getProducts = onSnapshot(q, res => {
      setProducts(res.docs)
    })
    return getProducts;
  }, [])



  let quantidade = 1;

  function addToCart(id){
    const newArray =  Array.from(cartProducts);
    const duplicated = newArray.find(item => item.id === id);
   
    if(duplicated){
        // duplicated.quantidade += 1
        // duplicated.price *= duplicated.quantidade
        return
    }else{
      products.map(item =>{
          if(id === item.id){
            const itensCopy = Array.from(cartProducts)
            itensCopy.push({
                id:item.id,
                title:item.data().title,
                descricao:item.data().descricao,
                price:item.data().preco,
                url:item.data().url,
                category:item.data().categoria,
                quantidade
              })
              setCartProducts(itensCopy )
              for(let i=0; i < itensCopy.length; i++){
                window.localStorage.setItem(itensCopy[i].id,JSON.stringify(itensCopy))
              }
              }
          })
      }
        
    
   
   
  }



  function deleteProductFromCart(index){
    const copyProducts = Array.from(cartProducts)
    copyProducts.splice(index,1);
    setCartProducts(copyProducts)
  }
  return(
    <ProductContext.Provider value={{products, addToCart,cartProducts,deleteProductFromCart}}>
      {children}
    </ProductContext.Provider>
  )
}


export default ProductProvider;