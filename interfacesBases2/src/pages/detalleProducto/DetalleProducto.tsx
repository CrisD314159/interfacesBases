import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import './detalleProducto.css'
import { Button } from "@mui/material";
import { Producto } from "../productos/Productos";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export interface ProductoResponse{
  success: boolean,
  data: Producto
}

interface Oferta{
  VENDEDOR_ID: number,
  VENDEDOR_NOMBRE: string,
  STOCK: number
}

interface OfertaResponse{
  success: boolean,
  data: Oferta[]
}

export default function DetalleProducto(){
  const [producto, setProducto] = useState<Producto>()
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const {id} = useParams()
  console.log(id);
  const productoMutation = useMutation<ProductoResponse, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/api/obtenerproducto/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setProducto(data.data)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const ofertasMutation = useMutation<OfertaResponse, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/api/obtenerproductosVendedor/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setOfertas(data.data)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  useEffect(()=>{
    if(id) {
      localStorage.setItem('idProducto', id)
      productoMutation.mutate(id)
      ofertasMutation.mutate(id)
    }
  },[])
  return(
    <div>
      <Header/>
      <div className="mainProductDescContainer">

        <div className="mainProductContainer">
          <div className="productContainer">
            <div className="imgContainer">
              <img src="https://play-lh.googleusercontent.com/XgVRjdtqeVbPMZ6qyIUZH_cFbWi2WfaWNZXFhyzy1xzKg2qTRrFqxfaUMzwxSTa5Orw" alt="" className="productImg"/>
            </div>
            <div className="productDescriptionContainer">
              <h2 className="productTitle">{producto?.NOMBRE}</h2>
              <p className="productDescription">{producto?.DESCRIPCIÓN}</p>
              <p className="productPrice">Precio: ${producto?.PRECIO}</p>
            </div>
          </div>
        </div>

        <h2 className="titleOfertas">Ofertas de este producto</h2>

        
        <div className="ofertasContainer">
          {
            ofertas.map((oferta:Oferta)=>{
              return(
                <div key={oferta.VENDEDOR_ID} className="ofertaContainer">
                  <p className="nombreVendedor">Vendedor: {oferta.VENDEDOR_NOMBRE}</p>
                  <p className="stockVendedor">Stock: {oferta.STOCK}</p>
                  <NavLink to={`/checkout/${oferta.VENDEDOR_ID}`} className="comprarLink"><Button variant="contained">Comprar</Button></NavLink>
                </div>
              )
            })
          }

        </div>
        
      </div>
      
    </div>
  )
}