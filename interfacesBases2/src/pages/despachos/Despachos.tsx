import { NavLink, useParams } from "react-router-dom"
import './despachos.css'
import { Button } from "@mui/material"
import LoginHeader from "../../components/loginHeader/LoginHeader";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export interface Despacho {
      ENVIO_ID: number,
      FECHA_ENVIO: string,
      DESCRIPCIÓN: string,
      DIRECCION_DESCRIPCION: string,
      VENTA_ID: number,
      PRODUCTO_NOMBRE: string,
      VENDEDOR_ID: number,
      VENDEDOR_NOMBRE: string,
      COMPRADOR_ID: number
}

interface DespachosResponse{
  success: boolean,
  data: Despacho[]
}




export default function Despachos(){
  const {id} = useParams() // se saca el id del localstorage, por ahora usar useParams
  console.log(id);
  const [despachos, setDespachos] = useState<Despacho[]>([])


  const despachosMutation = useMutation<DespachosResponse, Error, string>({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/obtenerEnviosVendedor/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setDespachos(data.data)
      }else{
        alert('No se pudo obtener los despachos');
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })

 


  useEffect(()=>{
    const id = localStorage.getItem('vendedorId')
    if(id){
      despachosMutation.mutate(id)
    }
  }, [])


  return(
    <div>
      <LoginHeader/>
      <div className="despachosMainContainer">
        <div className="despachosList">
          {
            despachos.map((despacho:Despacho) => (
              <div key={despacho.ENVIO_ID} className="despachoCard">
                <h2 className="despachoName">Nombre Producto: {despacho.PRODUCTO_NOMBRE}</h2>
                <p className="despachoDireccion">Dirección: {despacho.DIRECCION_DESCRIPCION}</p>
                <p className="despachoFecha">Fecha: {despacho.FECHA_ENVIO}</p>
                <p className="despachoEstado">Estado: {despacho.DESCRIPCIÓN}</p>
                <NavLink to={`/despachos/${despacho.ENVIO_ID}`} className="verDespachoLink"><Button variant="contained">Ver Detalle</Button></NavLink>
              </div>
            ))
          }
        </div>


      </div>
    </div>
  )
}