import { Button, TextField } from "@mui/material"
import Header from "../../components/header/Header"
import { useState } from "react"
import './estadoEnvio.css'
import { useMutation } from "@tanstack/react-query"



export interface Envio{
  ID_ENVIO: number,
  ESTADO: string,
  DIRECCION: string,
  CIUDAD: string,
  FECHA: string,
  VENDEDOR: string,

}


interface EnvioResponse{
  success: boolean,
  data: Envio
}
export default function EstadoEnvio(){
  const [envio, setEnvio] = useState<Envio>()
  const [id, setId] = useState('')
  const [num, setNum] = useState(0)


  const envioMutation = useMutation<EnvioResponse, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/api/obtenerDetalleEnvio/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      if(data.success){
        setEnvio(data.data)
        setNum(1)
      }else{
        alert('No se encontró el envío')}
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleSubmit = () => {
    if(id){
      envioMutation.mutate(id)
    }
    
      
    
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
            <div key={envio?.ID_ENVIO} className="detalleDespachoCard">
              <h2 className="despachoName despachoP">Nombre del Vendedor: {envio?.VENDEDOR}</h2>
              <p className="despachoDireccion despachoP">Dirección: {envio?.DIRECCION}</p>
              <p className="despachoCiudad despachoP">Ciudad: {envio?.CIUDAD}</p>
              <p className="despachoFecha despachoP">Fecha: {envio?.FECHA}</p>
              <p className="despachoEstado despachoP">Estado: {envio?.ESTADO}</p>
            </div>
            )
          }
          
          
        </div>
        </div>
    </div>
  )
}