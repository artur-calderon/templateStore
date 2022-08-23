import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductProvider from '../src/contexts/products'
import ThemeProvider from './contexts/themeContext'
import UserProvider from './contexts/user'

import Home from './Pages/Home'
import Loja from './Pages/Loja'
import Perfil from './Pages/Perfil'
import InfoProductPage from './Pages/InfoProductPage'
import ShoppingCart from './components/ShoppingCart'

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <ThemeProvider>
            <ProductProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/carrinho" element={<ShoppingCart />} />
                <Route path="/infoProduct/:id" element={<InfoProductPage />} />
              </Routes>
            </ProductProvider>
          </ThemeProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
