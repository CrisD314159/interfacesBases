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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Profile from './pages/profile/Profile.tsx'
import ReporteEstadisticas from './pages/reporteEstadisticas/ReporteEstadisticas.tsx'
import ReporteProductosRentabilidad from './pages/reporteProductosRentabilidad/ReporteProductosRentabilidad.tsx'
import ReporteProductosVendidos from './pages/reporteProductosVendidos/ReporteProductosVendidos.tsx'
import ReporteVentasMensuales from './pages/reporteVentasMensuales/ReporteVentasMensuales.tsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/reporteEstadisticas' element={<ReporteEstadisticas/>}/>
        <Route path='/reporteRentabilidad' element={<ReporteProductosRentabilidad/>}/>
        <Route path='/reporteProdVendidos' element={<ReporteProductosVendidos/>}/>
        <Route path='/reporteVentasMensuales' element={<ReporteVentasMensuales/>}/>

      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    
  </StrictMode>,
)
