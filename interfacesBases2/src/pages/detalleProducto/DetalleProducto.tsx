import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import './detalleProducto.css'
import { Button } from "@mui/material";

export default function DetalleProducto(){
  const {id} = useParams()
  console.log(id);
  const producto = {
    id: 1,
    nombre: 'Producto 1',
    precio: 1000,
    descripcion: 'Descripcion del producto 1',
    imagen: 'https://cdn-icons-png.freepik.com/512/8787/8787075.png'
  }

  const ofertas = [
    {
      id: 1,
      nombreVendedor: 'Juan',
      precio: 500
    },
    {
      id: 2,
      nombreVendedor: 'Pedro',
      precio: 600
    },
    {
      id: 3,
      nombreVendedor: 'Maria',
      precio: 700
    },
    {
      id: 4,
      nombreVendedor: 'Jose',
      precio: 800
    }
    
  ]
  return(
    <div>
      <Header/>
      <div className="mainProductDescContainer">

        <div className="mainProductContainer">
          <div className="productContainer">
            <div className="imgContainer">
              <img src={producto.imagen} alt="" className="productImg"/>
            </div>
            <div className="productDescriptionContainer">
              <h2 className="productTitle">{producto.nombre}</h2>
              <p className="productDescription">{producto.descripcion}</p>
              <p className="productPrice">Precio: ${producto.precio}</p>
            </div>
          </div>
        </div>

        <h2 className="titleOfertas">Ofertas de este producto</h2>

        
        <div className="ofertasContainer">
          {
            ofertas.map((oferta)=>{
              return(
                <div key={oferta.id} className="ofertaContainer">
                  <p className="nombreVendedor">Vendedor: {oferta.nombreVendedor}</p>
                  <NavLink to={`/checkout/${oferta.id}`} className="comprarLink"><Button variant="contained">Comprar</Button></NavLink>
                </div>
              )
            })
          }

        </div>
        
      </div>
      
    </div>
  )
}