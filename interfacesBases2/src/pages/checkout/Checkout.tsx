import { useNavigate, useParams } from "react-router-dom"
import Header from "../../components/header/Header";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import './checkout.css'
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProductoResponse } from "../detalleProducto/DetalleProducto";
import { Producto } from "../productos/Productos";

export interface Vendedor{
  ID: number,
  NOMBRE: string,
  APELLIDO: number,
  TELEFONO: number,
  EMAIL: string,
  DESCRIPCIÓN: string,
  NOMBRE_REFERIDO: string,
  APELLIDO_REFERIDO: string,
  NOMBRENIVEL: string,
}

interface Ciudad{
  ID: number,
  NOMBRE: string,
  CODIGO_POSTAL: number,
  DEPARTAMENTO: string
}

interface CiudadResponse{
  success: boolean,
  data: Ciudad[]
}

interface CrearCompraValues{
    id_vendedor: number,
    id_producto: number,
    cantidad: number,
    id_comprador: number,
    direccionEnvio: string,
    id_ciudad: number
}

interface CrearCompraResponse{
  success: boolean,
  message: string
}

export default function Checkout(){
  const [ciudades, setCiudades] = useState<Ciudad[]>()
  const [producto, setProducto] = useState<Producto>()
  const {id} = useParams() // id del vendedor
  const idProducto = localStorage.getItem('idProducto')
  const [ciudad, setCiudad] = useState<number>(1)
  const [cantidad, setCantidad] = useState<number>()
  const [direccion, setDireccion] = useState<string>('')
  const [cedula, setCedula] = useState<number>()
  const navigate = useNavigate()

 
  const productoMutation = useMutation<ProductoResponse, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/api/obtenerproducto/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setProducto(data.data)
      console.log(producto);
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const ciudadesMutation = useMutation<CiudadResponse, Error>({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/api/obtenerCiudades`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setCiudades(data.data)
      console.log(ciudades);
    },
    onError: (error) => {
      console.error(error)
    }
  })


  const realizarCompraMutation = useMutation<CrearCompraResponse, Error, CrearCompraValues>({
    mutationFn: async (values:CrearCompraValues) => {
      const response = await fetch(`http://localhost:3000/api/crearCompra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      console.log(data);
      return data
    },
    onSuccess: (data) => {
      if(data.success){
        alert(data.message)
        navigate('/')
      }else{
        alert(data.message)
      }
    },
    onError: (error) => {
      console.error(error)
    }
  })


  const handleSubmit  = ()=>{
    if(producto && ciudad && cantidad && direccion && cedula){ 
      const values: CrearCompraValues = {
        id_vendedor: Number(id),
        id_producto: producto.ID,
        cantidad: cantidad,
        id_comprador: cedula,
        direccionEnvio: direccion,
        id_ciudad: ciudad
      }
      console.log(values);
      realizarCompraMutation.mutate(values)
    }   

  }

  useEffect(()=>{
    if(idProducto) {
      productoMutation.mutate(idProducto)
    }
    ciudadesMutation.mutate()

  },[])

  return(
    <div>
      <Header/>
      <div className="mainCheckoutContainer">
        <div className="checkoutContainer">
          <h1 className="checkoutTitle">Checkout</h1>
          <div className="checkoutDescription">
            <form action="" onSubmit={(e)=>{
              e.preventDefault()
              handleSubmit()
            }}>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" value={producto?.NOMBRE} variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required disabled/>
                <TextField id="outlined-basic" type="text" variant="outlined" value={producto?.PRECIO} sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required disabled/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" label="Cédula" value={cedula} onChange={(e)=> setCedula(Number(e.target.value))} variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="text" label="Nombre" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="number" label="Cantidad"  value={cantidad} onChange={(e)=> setCantidad(Number(e.target.value))}  variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" label="Direccion"  value={direccion} onChange={(e)=> setDireccion(e.target.value)} variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <FormControl fullWidth sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required>
                  <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ciudad}
                    label="Ciudad"
                    onChange={(e)=>setCiudad(Number(e.target.value))}
                  >
                    {
                      ciudades?.map((ciudad)=>{
                        return <MenuItem value={ciudad.ID}>{ciudad.NOMBRE}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <TextField id="outlined-basic" type="text" label="Wallet-id" variant="outlined" sx={{marginBottom:'25px', width:'100%'}} required/>
              <Button variant="contained" type="submit" sx={{width:'100%'}}>Comprar Producto</Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}