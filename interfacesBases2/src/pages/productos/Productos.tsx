import { Button } from "@mui/material"
import Header from "../../components/header/Header"
import './productos.css'
import { NavLink } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import formatCurrency from "../formatCurrency"

export interface Producto{
  ID: number,
  NOMBRE: string,
  DESCRIPCIÓN: string,
  TIPOPRODUCTO: number,
  STOCK: number,
  PRECIO: number

}

interface ProductoResponse{
  success: boolean,
  data: Producto[]
}

async function obtenerProductos(){
  const response = await fetch('http://localhost:3000/api/obtenerproductos')
  const data = await response.json()
  return data
}

export default function Productos(){
  const [productos, setProductos] = useState<Producto[]>([])

  const productosMutation = useMutation<ProductoResponse, Error>({
    mutationFn:obtenerProductos,
    onSuccess: (data) => {
      setProductos(data.data)
    },
    onError: (error) => {
      console.error(error)
    }
    
  })


  useEffect(()=>{
    productosMutation.mutate()
  },[])
  return(
    <div>
      <Header/>
      <div className="productsMainContainer">
        <h1 className="productosTitle">Productos Destacados en VitalisPro</h1>
        <div className="productosContainer">
          <div className="productosList">
            {
              productos.map((producto:Producto)=>{
                return(
                  <div key={producto.ID} className="productoCard">
                    <div className="productoImageContainer">
                  
                        <img src="https://play-lh.googleusercontent.com/XgVRjdtqeVbPMZ6qyIUZH_cFbWi2WfaWNZXFhyzy1xzKg2qTRrFqxfaUMzwxSTa5Orw" alt={producto.NOMBRE} className="productoImage"/>
                      
                    </div>
                    <div className="productoInfoContainer">
                      <h3 className="productoName">{producto.NOMBRE}</h3>
                      <p className="productoDescription">{producto.DESCRIPCIÓN}</p>
                      <p className="productoPrice">Precio: ${formatCurrency(producto.PRECIO)}</p>
                    </div>
                    <NavLink to={`/producto/${producto.ID}`} className="productLink">
                      <Button variant="contained">Ver Detalle</Button>

                    </NavLink>
                  </div>
                )  
              })
            }

          </div>
        </div>
      </div>
    </div>
  )
}