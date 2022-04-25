import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductProvider from '../src/contexts/products'


import Home from './Pages/Home'
import Loja from './Pages/Loja'
import Cadastrar from './Pages/Cadastrar'
import InfoProductPage from './Pages/InfoProductPage'
import ShoppingCart from './components/ShoppingCart'

function App() {
  return (
    <div className="App">
      <Router>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/carrinho" element={<ShoppingCart />} />
            <Route path="/cadastrar_produtos" element={<Cadastrar />} />
            <Route path="/infoProduct/:id" element={<InfoProductPage />} />
          </Routes>
        </ProductProvider>
      </Router>
    </div>
  )
}

export default App
