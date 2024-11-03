import { NavLink, useParams } from "react-router-dom"
import './despachos.css'
import { Button } from "@mui/material"
import LoginHeader from "../../components/loginHeader/LoginHeader";

export default function Despachos(){
  const {id} = useParams() // se saca el id del localstorage, por ahora usar useParams
  console.log(id);
  const despachos =[
    {
      id: 1,
      nombre: 'Despacho 1',
      direccion: 'Calle 1 # 1-1',
      ciudad: 'Bogotá',
      fecha: '2021-12-31',
      hora: '10:00',
      estado: 'En camino',
    },
    {
      id: 2,
      nombre: 'Despacho 2',
      direccion: 'Calle 2 # 2-2',
      ciudad: 'Bogotá',
      fecha: '2021-12-31',
      hora: '11:00',
      estado: 'En camino',
    },
    {
      id: 3,
      nombre: 'Despacho 3',
      direccion: 'Calle 3 # 3-3',
      ciudad: 'Bogotá',
      fecha: '2021-12-31',
      hora: '12:00',
      estado: 'En camino',
    },
    {
      id: 4,
      nombre: 'Despacho 4',
      direccion: 'Calle 4 # 4-4',
      ciudad: 'Bogotá',
      fecha: '2021-12-31',
      hora: '13:00',
      estado: 'En camino',
    },
    {
      id: 5,
      nombre: 'Despacho 5',
      direccion: 'Calle 5 # 5-5',
      ciudad: 'Bogotá',
      fecha: '2021-12-31',
      hora: '14:00',
      estado: 'En camino',
    },

    
  ]
  return(
    <div>
      <LoginHeader/>
      <div className="despachosMainContainer">
        <div className="despachosList">
          {
            despachos.map((despacho) => (
              <div key={despacho.id} className="despachoCard">
                <h2 className="despachoName">Nombre: {despacho.nombre}</h2>
                <p className="despachoDireccion">Dirección: {despacho.direccion}</p>
                <p className="despachoCiudad">Ciudad: {despacho.ciudad}</p>
                <p className="despachoFecha">Fecha: {despacho.fecha}</p>
                <p className="despachoHora">Hora: {despacho.hora}</p>
                <p className="despachoEstado">Estado: {despacho.estado}</p>
                <NavLink to={`/despachos/${despacho.id}`} className="verDespachoLink"><Button variant="contained">Ver Detalle</Button></NavLink>
              </div>
            ))
          }
        </div>


      </div>
    </div>
  )
}