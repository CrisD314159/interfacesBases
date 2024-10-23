import { Button } from "@mui/material"
import Header from "../../components/header/Header"
import './productos.css'
import { NavLink } from "react-router-dom"

export default function Productos(){
  const ejemploProductos = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      descripcion: 'Descripcion del producto 1',
      imagen: ''
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 2000,
      descripcion: 'Descripcion del producto 2',
      imagen: ''
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 3000,
      descripcion: 'Descripcion del producto 3',
      imagen: ''
    }
  ]
  return(
    <div>
      <Header/>
      <div className="productsMainContainer">
        <h1 className="productosTitle">Productos Destacados en VitalisPro</h1>
        <div className="productosContainer">
          <div className="productosList">
            {
              ejemploProductos.map((producto)=>{
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
                    </div>
                    <NavLink to={`/producto/${producto.id}`} className="productLink">
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