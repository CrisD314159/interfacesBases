import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Productos from './pages/Productos.tsx'
import Login from './pages/login/Login.tsx'
import SignUp from './pages/SignUp.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Productos/>

  },
  {
    path:'/login',
    element: <Login/>

  },
  {
    path:'/signUp',
    element: <SignUp/>

  },
  {
    path:'/app',
    element: <App/>

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
