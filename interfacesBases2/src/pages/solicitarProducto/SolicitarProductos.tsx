import LoginHeader from "../../components/loginHeader/LoginHeader"
import { Button } from "@mui/material"
import { useState } from "react"
import './solicitarProductos.css'

interface Producto{
  id: number,
  nombre: string,
  precio: number,
  descripcion: string,
  imagen: string,
  cantidadInventario: number,
  cantPedir: number
}
export default function SolicitarProductos(){
  const [productos, setProductos] = useState<Producto[]>(
    [
      {
        id: 1,
        nombre: 'Producto 1',
        precio: 1000,
        descripcion: 'Descripcion del producto 1',
        imagen: '',
        cantidadInventario: 20,
        cantPedir: 0
      },
      {
        id: 2,
        nombre: 'Producto 2',
        precio: 2000,
        descripcion: 'Descripcion del producto 2',
        imagen: '',
        cantidadInventario: 32,
        cantPedir: 0
      },
      {
        id: 3,
        nombre: 'Producto 3',
        precio: 3000,
        descripcion: 'Descripcion del producto 3',
        imagen: '',
        cantidadInventario: 12,
        cantPedir: 0
      },
      {
        id: 4,
        nombre: 'Producto 4',
        precio: 3000,
        descripcion: 'Descripcion del producto 3',
        imagen: '',
        cantidadInventario: 12,
        cantPedir: 0
      }
    ]
  )

  const handleAddCant = (id:string)=>{
    const productosActualizados = productos.map((producto) => {
      if (producto.id === parseInt(id)) {
        if(producto.cantPedir === producto.cantidadInventario)return { ...producto, cantPedir: producto.cantPedir };
        return { ...producto, cantPedir: producto.cantPedir + 1 };
      }
      return producto;
    });
  
    setProductos(productosActualizados);
  }
  const handleRedCant = (id:string)=>{
    const productosActualizados = productos.map((producto) => {
      if (producto.id === parseInt(id)) {
        if(producto.cantPedir === 0)return { ...producto, cantPedir: producto.cantPedir };
        return { ...producto, cantPedir: producto.cantPedir - 1 };
      }
      return producto;
    });
  
    setProductos(productosActualizados);
  }

  const handleSubmit = ()=>{
    console.log(productos)
  }
  return(
    <div>
      <LoginHeader/>
      <div className="productos">
        <div>
        <h1 className="productosTitle">Pedir Productos</h1>
        </div>
        
        <div className="productosList">
        {
              productos.map((producto)=>{
                return(
                  <div key={producto.id} className="productoCard">
                    <div className="productoImageContainer">
                      {
                        producto.imagen !== '' ? 
                        <img src={producto.imagen} alt={producto.nombre} className="productoImage"/>
                        :
                        <img src="https://cdn-icons-png.freepik.com/512/8787/8787075.png" alt={producto.nombre} className="productoImage"/>
                      }
                    </div>
                    <div className="productoInfoContainer">
                      <h3 className="productoName">{producto.nombre}</h3>
                      <p className="productoDescription">{producto.descripcion}</p>
                      <p className="productoPrice">Precio: ${producto.precio}</p>
                      <p className="productoPrice">Cantidad disponible: {producto.cantidadInventario}</p>
                      <p className="productoPrice">Cantidad a pedir: {producto.cantPedir}</p>
                      <div className="buttonCont">
                        <Button onClick={()=>handleRedCant(producto.id.toString())} variant="outlined" color="error">Quitar</Button>
                        <Button onClick={()=>handleAddCant(producto.id.toString())} variant="outlined">Añadir</Button>
                      </div>

                    </div>
                  </div>
                )  
              })
            }
        </div>
            <Button variant="contained" onClick={handleSubmit}>Solicitar selección</Button>

      </div>
    </div>
  )
}