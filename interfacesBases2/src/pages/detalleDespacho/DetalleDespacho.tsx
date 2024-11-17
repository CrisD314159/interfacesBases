import './detalleDespacho.css'
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { useMutation } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface Despacho {
  ID_ENVIO: number,
  ESTADO: string,
  DIRECCION: string,
  CIUDAD: string,
  FECHA:string,
  VENDEDOR: string
}


interface DespachoResponse{
  success: boolean,
  data: Despacho
}


export default function DetalleDespacho(){
  const [despacho, setDespacho] = useState<Despacho>()
  const {id} = useParams()
  console.log(id);
  const despachoMutation = useMutation<DespachoResponse, Error, string>({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/obtenerDetalleEnvioVendedor/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setDespacho(data.data)
      }else{
        alert('No se pudo obtener el despacho');
      }
    },
    onError: (error)=>{
      console.log(error);
    }

  })

  interface ActualizarDespachoValues{
    id: number,
    estado: number
  }
  
  interface ActualizarDespachoResponse{
    success: boolean,
    message: string
  }

  const actualizarDespachos = useMutation<ActualizarDespachoResponse, Error, ActualizarDespachoValues>({
    mutationFn: async (values)=>{
      const response = await fetch(`http://localhost:3000/api/actualizarEnvio`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        alert('Despacho actualizado')
        window.location.reload()
      }else{
        alert('No se pudo obtener los despachos');
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })

  useEffect(()=>{
    if(id){ despachoMutation.mutate(id)}
  }, [])
 
  const handleCLick = (estado:number) => {
    if(id){
      actualizarDespachos.mutate({id: Number(id), estado})
  }
}
  return(
    <div>
      <LoginHeader/>
      <div className='detalleDespachoMainCard'>
        <div key={despacho?.ID_ENVIO} className="detalleDespachoCard">
          <h2 className="despachoName despachoP">Nombre Vendedor: {despacho?.VENDEDOR}</h2>
          <p className="despachoDireccion despachoP">Dirección: {despacho?.DIRECCION}</p>
          <p className="despachoCiudad despachoP">Ciudad: {despacho?.CIUDAD}</p>
          <p className="despachoFecha despachoP">Fecha: {despacho?.FECHA}</p>
          <p className="despachoEstado despachoP">Estado: {despacho?.ESTADO}</p>
        </div>
        <div className="detalleDespachoButtons">
          <Button onClick={()=>handleCLick(1)} sx={{margin:'10px'}} variant='contained' className="detalleDespachoButton">Marcar como Pendiente</Button>
          <Button onClick={()=>handleCLick(2)}  sx={{margin:'10px'}} variant='contained' className="detalleDespachoButton">Marcar como En Camino</Button>
          <Button onClick={()=>handleCLick(3)}  sx={{margin:'10px'}} variant='contained' className="detalleDespachoButton">Marcar como entregado</Button>
          <Button onClick={()=>handleCLick(5)}  sx={{margin:'10px'}} variant='contained' color='error' className="detalleDespachoButton">Cancelar envío</Button>
        </div>
      </div>
    </div>
  )
}