import React,{createContext, useState,useEffect} from "react";
import { db } from '../firebase'
import { collection, query, onSnapshot, where,getDocs} from 'firebase/firestore'

export const ProductContext = createContext({});



//provider que carrega todos os produtos de uma vez e manda para todas as páginas se precisar
function ProductProvider({children}){

  const [products, setProducts] = useState({})
  const [cartProducts, setCartProducts] = useState({})

  useEffect(() => {
    const cartLocalStorage = {...window.localStorage}
    if(cartLocalStorage){
      let keys = Object.keys(cartLocalStorage)
      let localStorageItems = []
      for (let i = 0; i < keys.length; i++) {
        let items = JSON.parse(window.localStorage.getItem(keys[i]))
        localStorageItems.push(items)
        setCartProducts(localStorageItems)
      }
    }
   

   const q = query(collection(db, 'products'));
    const getProducts = onSnapshot(q, res => {
      setProducts(res.docs)
    })
    return getProducts;
  }, [])

  function filter(category){

    if(category == null){
      const q = query(collection(db, 'products'));
    const getProducts = onSnapshot(q, res => {
      setProducts(res.docs)
    })
    }else{
    const dbRef = collection(db, 'products');
    const q = query(dbRef,where('categoria','==',category));
    const getProducts = getDocs(q);
    getProducts.then(res =>{
      if(res.docs.length > 0){
        setProducts(res.docs)
      }else{
        setProducts({})
      }
    })
  }
}

  let quantidade = 1;

  function addToCart(id){
    const newArray =  Array.from(cartProducts);
    const duplicated = newArray.find(item => item.id === id);
   
    if(duplicated){
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
              for(let i=0; i < itensCopy.length; i++){
                if(item.id === itensCopy[i].id)
                window.localStorage.setItem(item.id,JSON.stringify(itensCopy[i]))
              }
              setCartProducts(itensCopy)
              
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
    <ProductContext.Provider value={{products, addToCart,cartProducts,deleteProductFromCart,filter}}>
      {children}
    </ProductContext.Provider>
  )
}


export default ProductProvider;