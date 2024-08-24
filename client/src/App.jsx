import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import ProductList from '../components/ProductList'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={ProductList} />
        <Route path='/signup' Component={Signup} />
        <Route path='/login' Component={Login} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
