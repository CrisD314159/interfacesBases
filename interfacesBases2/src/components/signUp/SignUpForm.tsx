import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import './SignUpForm.css'
export default function SignUpForm() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamento, setDepartamento] = useState('');
  
  const handleSubmit = ()=>{
    const registry = {
      codigo,
      nombre,
      apellido,
      telefono,
      email,
      contrasenia,
      direccion,
      ciudad,
      departamento
    }
    console.log(registry);
  }
  return(
    <form action="" className="signUpForm" onSubmit={(e)=> {
      e.preventDefault()
      handleSubmit()
    }}>
           
              <div className="inputsContainer">
                <TextField id="outlined-basic" label="Cédula" variant="outlined" sx={{ marginBottom: '25px', width: '100%', marginLeft:'10px' }}
                  onChange={(e) => {
                    setCodigo(e.target.value)
                  }}
                  value={codigo}
                  required
                />
                <TextField id="outlined-basic" label="Nombres" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                  onChange={(e) => {
                    setNombre(e.target.value)
                  }}
                  value={nombre}
                  required
                />
                <TextField id="outlined-basic" label="Apellidos" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                  onChange={(e) => {
                    setApellido(e.target.value)
                  }}
                  value={apellido}
                  required
                />
              </div>
              <div className="inputsContainer">

                <TextField id="outlined-basic" label="Telefono" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                type="tel"
                  onChange={(e) => {
                    setTelefono(e.target.value)
                  }}
                  value={telefono}
                  required
                />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                  onChange={(e) => {
                    setDireccion(e.target.value)
                  }}
                  value={direccion}
                  required
                />
              </div>

              <div className="inputsContainer">
                <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={email}
                    required
                  />
                  <TextField id="outlined-basic" type="password" label="Password" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                    onChange={(e) => {
                      setContrasenia(e.target.value)
                    }}
                    value={contrasenia}
                    required
                  />
              </div>
             
              <div className="inputsContainer">
                <FormControl fullWidth sx={{marginLeft:'10px'}}>
                  <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ciudad}
                    label="Ciudad"
                    onChange={(e)=>{setCiudad(e.target.value)}}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{marginLeft:'10px'}}>
                  <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={departamento}
                    label="Departamento"
                    onChange={(e)=>{setDepartamento(e.target.value)}}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              
              <Button variant="contained" sx={{ marginTop: '25px', width: '100%' }} type="submit"
              >Registrarse</Button>
          </form>
  )
}