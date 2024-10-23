import { useParams } from "react-router-dom"
import Header from "../../components/header/Header";
import { Button, TextField } from "@mui/material";
import './checkout.css'

export default function Checkout(){
  const {id} = useParams()
  console.log(id);
  return(
    <div>
      <Header/>
      <div className="mainCheckoutContainer">
        <div className="checkoutContainer">
          <h1 className="checkoutTitle">Checkout</h1>
          <div className="checkoutDescription">
            <form action="">
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" label="Nombre Producto" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required disabled/>
                <TextField id="outlined-basic" type="text" label="Precio" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required disabled/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" label="Nombre" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="text" label="Apellido" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="tel" label="Telefono" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
              </div>
              <div className="inputsContainer">
                <TextField id="outlined-basic" type="text" label="Direccion" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="text" label="Ciudad" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
                <TextField id="outlined-basic" type="text" label="Departamento" variant="outlined" sx={{marginBottom:'25px', width:'100%', marginLeft:'10px'}} required/>
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