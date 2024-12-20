import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import './header.css'


export default function Header() {
  return (
    <header className="headerComponent">
      <NavLink to={'/'}>
        <h1 className="headerTitle">VitalisPro</h1>
      </NavLink>
      <nav className="navContainer">
        <ul className="navList">
          <li><NavLink to={'/login'}><Button variant="contained" >Iniciar sesión</Button></NavLink></li>
          <li><NavLink to={'/signUp'}><Button variant="outlined">Registrarse</Button></NavLink></li>
          <li><NavLink to={'/estadoEnvio'}><Button variant="outlined">Consultar estado del Envio</Button></NavLink></li>
        </ul>
      </nav>
    </header>
  )
}