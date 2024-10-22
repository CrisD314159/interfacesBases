import { Button, TextField } from "@mui/material";
import './signUp.css'
import { useState } from "react";


export default function SignUp() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');

  return (
    <div className="mainSignUpContainer">
      <div className="mainFormContainer">

        <div className="signUpTitleContainer">
          <h2 className="signUpTitle">Registrate</h2>
        </div>

        <div className="signUpFormContainer">
          <form action="" className="signUpForm">
            <TextField id="outlined-basic" label="ID" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setCodigo(e.target.value)
              }}
              value={codigo}
              required
            />
            <TextField id="outlined-basic" label="Nombres" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setNombre(e.target.value)
              }}
              value={nombre}
              required
            />
            <TextField id="outlined-basic" label="Apellidos" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setApellido(e.target.value)
              }}
              value={apellido}
              required
            />
            <TextField id="outlined-basic" label="Telefono" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setTelefono(e.target.value)
              }}
              value={telefono}
              required
            />
            <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              required
            />
            <TextField id="outlined-basic" type="password" label="E-mail" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setContrasenia(e.target.value)
              }}
              value={contrasenia}
              required
            />
            <TextField id="outlined-basic" label="Direccion" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setDireccion(e.target.value)
              }}
              value={direccion}
              required
            />
            <TextField id="outlined-basic" label="Ciudad" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setCiudad(e.target.value)
              }}
              value={ciudad}
              required
            />
            <TextField id="outlined-basic" label="Departamento" variant="outlined" sx={{ marginBottom: '25px', width: '100%' }}
              onChange={(e) => {
                setDepartamento(e.target.value)
              }}
              value={departamento}
              required
            />

            <Button variant="contained" sx={{ marginTop: '25px', width: '100%' }}
              onClick={() => {
                console.log('c')
              }}
            >Completar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}