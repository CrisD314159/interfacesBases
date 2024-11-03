import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import './header.css'


export default function LoginHeader() {
  return (
    <header className="headerComponent">
      <NavLink to={'/'}>
        <h1 className="headerTitle">VitalisPro</h1>
      </NavLink>
      <nav className="navContainer">
        <ul className="navList">
          <li><NavLink to={'/'}><Button variant="outlined" color="error">Cerrar sesión</Button></NavLink></li>
          <li><NavLink to={'/dashboard'}><Button variant="outlined">Ir al Dashboard</Button></NavLink></li>
          <li><NavLink to={'/despachos'}><Button variant="outlined">Mis despachos</Button></NavLink></li>
          <li><NavLink to={'/inventario'}><Button variant="outlined">Mis Productos</Button></NavLink></li>
        </ul>
      </nav>
    </header>
  )
}