import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductProvider from '../src/contexts/products'
import ThemeProvider from './contexts/themeContext'
import UserProvider from './contexts/user'

import Home from './Pages/Home'
import InfoProductPage from './Pages/InfoProductPage'
import ShoppingCart from './components/ShoppingCart'
import Pedidos from './Pages/Pedidos'
import Perfil from './Pages/Perfil'
import { ScrollTop } from './components/ScrollTop'

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <ThemeProvider>
            <ProductProvider>
              <ScrollTop>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pedidos" element={<Pedidos />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/carrinho" element={<ShoppingCart />} />
                  <Route path="/infoProduct/:id" element={<InfoProductPage />} />
                </Routes>
              </ScrollTop>
            </ProductProvider>
          </ThemeProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
