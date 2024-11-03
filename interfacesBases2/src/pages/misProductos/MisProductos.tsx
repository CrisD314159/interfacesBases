import { NavLink } from "react-router-dom"
import LoginHeader from "../../components/loginHeader/LoginHeader"
import './misProductos.css'
import { Button } from "@mui/material"

export default function MisProductos(){
  const ejemploProductos = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 1000,
      descripcion: 'Descripcion del producto 1',
      imagen: '',
      cantidadInventario: 20
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 2000,
      descripcion: 'Descripcion del producto 2',
      imagen: '',
      cantidadInventario: 32
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 3000,
      descripcion: 'Descripcion del producto 3',
      imagen: '',
      cantidadInventario: 12
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 3000,
      descripcion: 'Descripcion del producto 3',
      imagen: '',
      cantidadInventario: 12
    }
  ]
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
                      <p className="productoPrice">Cantidad en invetario: {producto.cantidadInventario}</p>
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