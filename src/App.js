import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductProvider from '../src/contexts/products'
import ThemeProvider from './contexts/themeContext'

import Home from './Pages/Home'
import Loja from './Pages/Loja'
import InfoProductPage from './Pages/InfoProductPage'
import ShoppingCart from './components/ShoppingCart'

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loja" element={<Loja />} />
              <Route path="/carrinho" element={<ShoppingCart />} />
              <Route path="/infoProduct/:id" element={<InfoProductPage />} />
            </Routes>
          </ProductProvider>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
