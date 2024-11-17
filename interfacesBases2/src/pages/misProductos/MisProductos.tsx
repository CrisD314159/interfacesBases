import { NavLink } from "react-router-dom"
import LoginHeader from "../../components/loginHeader/LoginHeader"
import './misProductos.css'
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface DetalleInvetario{
  ID: number,
  DESCRIPCIÓN: string,
  CANTIDAD: number,
  FECHA_ULT_ACTUALIZACION: string,
  ID_PRODUCTO: number,
  INVENTARIO: number,
  ID_1: number,
  VENDEDOR: number,
  NOMBRE: string,
  DESCRIPCIÓN_1: string,
  TIPOPRODUCTO: number,
  STOCK: number,
  PRECIO: number
}

interface ProductoResponse{
  success: boolean,
  data: DetalleInvetario[]
}

export default function MisProductos(){
  const [productosList, setProductosList] = useState<DetalleInvetario[]>([])

  const productos = useMutation<ProductoResponse, Error, string> ({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/obtenerVendedorProductos/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setProductosList(data.data);
      }else{
        alert('No se pudo obtener los productos');
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })

useEffect(()=>{
  const id = localStorage.getItem('vendedorId');
  if(id){
    productos.mutate(id);
  }
},[])
  return(
    <div>
      <LoginHeader/>
      <div className="productos">
        <div>
        <h1 className="productosTitle">MisProductos</h1>
        <NavLink to={'/pedirProductos'}><Button variant="outlined">Añadir más al inventario</Button></NavLink>

        </div>
        
        <div className="productosList">
        {
              productosList.map((producto)=>{
                return(
                  <div key={producto.ID_PRODUCTO} className="productoCard">
                    <div className="productoImageContainer">
                        <img src="https://play-lh.googleusercontent.com/XgVRjdtqeVbPMZ6qyIUZH_cFbWi2WfaWNZXFhyzy1xzKg2qTRrFqxfaUMzwxSTa5Orw" alt={producto.NOMBRE} className="productoImage"/>
                    </div>
                    <div className="productoInfoContainer">
                      <h3 className="productoName">{producto.NOMBRE}</h3>
                      <p className="productoDescription">{producto.DESCRIPCIÓN_1}</p>
                      <p className="productoPrice">Precio: ${producto.PRECIO}</p>
                      <p className="productoPrice">Cantidad en invetario: {producto.CANTIDAD}</p>
                    </div>
                  </div>
                )  
              })
            }
        </div>

      </div>
    </div>
  )
}