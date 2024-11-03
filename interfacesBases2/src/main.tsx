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
import DetalleDespacho from './pages/detalleDespacho/DetalleDespacho.tsx'
import EstadoEnvio from './pages/estadoEnvio/EstadoEnvio.tsx'
import MisProductos from './pages/misProductos/MisProductos.tsx'
import SolicitarProductos from './pages/solicitarProducto/SolicitarProductos.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/producto/:id" element={<DetalleProducto/>}/>
        <Route path="/checkout/:id" element={<Checkout/>}/>
        <Route path="/despachos" element={<Despachos/>}/>
        <Route path="/despachos/:id" element={<DetalleDespacho/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/estadoEnvio' element={<EstadoEnvio/>}/>
        <Route path='/inventario' element={<MisProductos/>}/>
        <Route path='/pedirProductos' element={<SolicitarProductos/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
