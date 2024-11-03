import { Button, TextField } from "@mui/material"
import Header from "../../components/header/Header"
import { useState } from "react"
import './estadoEnvio.css'

export default function EstadoEnvio(){
  const [id, setId] = useState('')
  const [num, setNum] = useState(0)
  const envio = {
    id: 1,
    nombre: 'Despacho 1',
    direccion: 'Calle 1 # 1-1',
    ciudad: 'Bogotá',
    fecha: '2021-12-31',
    hora: '10:00',
    estado: 'En camino',
  }

  const handleSubmit = () => {
    setNum(1)
    
      
    
  }
  return(
    <div>
      <Header/>
      <div className="estadoEnvioMainContainer">
        <h2 className ="estadoEnvioTitle">Consultar estado del Envio</h2>
        <form action="" className="estadoEnvioForm" onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}>
          <TextField type="text" name="idEnvio" id="idEnvio" label="Id envío" placeholder="Ingrese el ID del envio" value={id} required onChange={(e) => {
            setId(e.target.value)
          }}/>
          <Button type="submit" variant="contained" sx={{marginTop:'30px'}}>Consultar</Button>
        </form>
        <div className="detalleEnvioMain">
          {
            num === 1 &&(
            <div key={envio.id} className="detalleDespachoCard">
              <h2 className="despachoName despachoP">Nombre: {envio.nombre}</h2>
              <p className="despachoDireccion despachoP">Dirección: {envio.direccion}</p>
              <p className="despachoCiudad despachoP">Ciudad: {envio.ciudad}</p>
              <p className="despachoFecha despachoP">Fecha: {envio.fecha}</p>
              <p className="despachoHora despachoP">Hora: {envio.hora}</p>
              <p className="despachoEstado despachoP">Estado: {envio.estado}</p>
            </div>
            )
          }
          
          
        </div>
        </div>
    </div>
  )
}