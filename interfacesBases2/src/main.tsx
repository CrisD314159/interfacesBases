import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Productos from './pages/productos/Productos.tsx'
import Login from './pages/login/Login.tsx'
import SignUp from './pages/signUp/SignUp.tsx'
import DetalleProducto from './pages/detalleProducto/DetalleProducto.tsx'
import Checkout from './pages/checkout/Checkout.tsx'
import Despachos from './pages/despachos/Despachos.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/producto/:id" element={<DetalleProducto/>}/>
        <Route path="/checkout/:id" element={<Checkout/>}/>
        <Route path="/despachos/:id" element={<Despachos/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
