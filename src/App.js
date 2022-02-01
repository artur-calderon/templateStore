import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Loja from './Pages/Loja'
import Cadastrar from './Pages/Cadastrar'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="loja" element={<Loja />} />
          <Route path="cadastrar_produtos" element={<Cadastrar />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
