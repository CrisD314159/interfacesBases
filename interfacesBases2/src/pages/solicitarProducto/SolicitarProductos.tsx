import LoginHeader from "../../components/loginHeader/LoginHeader"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import './solicitarProductos.css'
import { useMutation } from "@tanstack/react-query"

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

interface SolucitudResponse {
  success: boolean,
  message: string
}

async function obtenerProductos(){
  const response = await fetch('http://localhost:3000/api/obtenerproductos')
  const data = await response.json()
  return data
}

interface CantidadVal{
  cantPedir: number,
  producto: number
}

interface SolicitudValues {
  id_vendedor: number, 
  cantidad: number, 
  idproducto:number
}


export default function SolicitarProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantPedir, setCantPedir] = useState<CantidadVal>({ cantPedir: 0, producto: 0 });
  const idVendedor = localStorage.getItem('vendedorId')
  const productosMutation = useMutation<ProductoResponse, Error>({
    mutationFn: obtenerProductos,
    onSuccess: (data) => {
      if (data.success) {
        setProductos(data.data);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const pedirProductoMutation = useMutation<SolucitudResponse, Error, SolicitudValues>({
    mutationFn: async (solicitud: SolicitudValues) => {
      const response = await fetch('http://localhost:3000/api/llenarInventario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitud)
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        window.location.reload();
      }else{
        alert(data.message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  })

  useEffect(() => {
    productosMutation.mutate();
  }, []);

  const handleAddCant = (id: number) => {
    setCantPedir((prev) => ({
      cantPedir: prev.producto === id ? prev.cantPedir + 1 : 1,
      producto: id,
    }));
  };

  const handleRedCant = (id: number) => {
    setCantPedir((prev) => ({
      cantPedir: prev.producto === id && prev.cantPedir > 0 ? prev.cantPedir - 1 : 0,
      producto: id,
    }));
  };

  const handleSubmit = () => {
    if (cantPedir.cantPedir === 0) {
      alert('Por favor selecciona una cantidad a pedir');
      return;
    }
    if (idVendedor === null) {
      alert('No se ha iniciado sesión');
      return;
    }
    console.log(cantPedir);
    const solicitud: SolicitudValues = {
      id_vendedor: Number(idVendedor),
      cantidad: cantPedir.cantPedir,
      idproducto: cantPedir.producto
    }
    pedirProductoMutation.mutate(solicitud);
  };

  return (
    <div>
      <LoginHeader />
      <div className="productos">
        <div>
          <h1 className="productosTitle">Pedir Productos</h1>
        </div>

        <div className="productosList">
          {productos.map((producto) => {
            const isEditing = cantPedir.producto === producto.ID;
            return (
              <div key={producto.ID} className="productoCard pedir">
                <div className="productoImageContainer">
                  <img
                    src="https://play-lh.googleusercontent.com/XgVRjdtqeVbPMZ6qyIUZH_cFbWi2WfaWNZXFhyzy1xzKg2qTRrFqxfaUMzwxSTa5Orw"
                    alt={producto.NOMBRE}
                    className="productoImage"
                  />
                </div>
                <div className="productoInfoContainer">
                  <h3 className="productoName">{producto.NOMBRE}</h3>
                  <p className="productoDescription">{producto.DESCRIPCIÓN}</p>
                  <p className="productoPrice">Precio: ${producto.PRECIO}</p>
                  <p className="productoPrice">Cantidad disponible: {producto.STOCK}</p>
                  <p className="productoPrice">
                    Cantidad a pedir: {isEditing ? cantPedir.cantPedir : 0}
                  </p>
                  <div className="buttonCont">
                    {isEditing ? (
                      <div className="buttonContCont">
                        <Button onClick={() => handleRedCant(producto.ID)} sx={{marginTop:'10px'}} variant="outlined" color="error">
                          Quitar
                        </Button>
                        <Button onClick={() => handleAddCant(producto.ID)} sx={{marginTop:'10px'}} variant="outlined">
                          Añadir
                        </Button>
                        <Button variant="contained" onClick={handleSubmit} sx={{marginTop:'10px'}}>
                          Solicitar selección
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleAddCant(producto.ID)} sx={{marginTop:'10px'}} variant="contained">
                        Editar cantidad
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
