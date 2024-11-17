import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './SignUpForm.css'
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


interface RegistryValues {
    id: number,
    nombre: string,
    apellido: string,
    telefono : number,
    email: string,
    password: string,
    vendedor_referido: number,
    desc_direccion: string,
    id_ciudad: number,
}

interface RegistryResponse {
  success: boolean,
  message: string,
}

interface Ciudad{
  ID: number,
  NOMBRE: string,
  CODIGO_POSTAL: number,
  DEPARTAMENTO: string
}

interface CiudadResponse{
  success: boolean,
  data: Ciudad[]
}

export default function SignUpForm() {
  const [ciudades, setCiudades] = useState<Ciudad[]>()
  const [ciudad, setCiudad] = useState<number>(1)
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [referido, setReferido] = useState('');
  const navigate = useNavigate()

  const registryMutation = useMutation<RegistryResponse, Error, RegistryValues>({
    mutationFn: async (values) => {
      const response = await fetch(`http://localhost:3000/api/crearVendedor`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      if(data.success){
        alert('Registro exitoso')
        navigate('/login')

      }else{
        alert('Error al registrarse')
      }
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const ciudadesMutation = useMutation<CiudadResponse, Error>({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/api/obtenerCiudades`)
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setCiudades(data.data)
    },
    onError: (error) => {
      console.error(error)
    }
  })
  
  const handleSubmit = ()=>{
    const registry:RegistryValues = {
      id:Number(codigo),
      nombre,
      apellido,
      telefono:Number(telefono),
      email,
      password:contrasenia,
      vendedor_referido:Number(referido),
      desc_direccion: direccion,
      id_ciudad:Number(ciudad)
    }
    registryMutation.mutate(registry)
  }

  useEffect(()=>{
    ciudadesMutation.mutate()
  },[])

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
                <TextField id="outlined-basic" type="text" label="Cédula referido" variant="outlined" sx={{ marginBottom: '25px', width: '100%' , marginLeft:'10px'}}
                    onChange={(e) => {
                      setReferido(e.target.value)
                    }}
                    value={referido}
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
                    onChange={(e)=>{setCiudad(Number(e.target.value))}}
                  >
                    {ciudades?.map((ciudad) => (
                      <MenuItem key={ciudad.ID} value={ciudad.ID}>{ciudad.NOMBRE}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              
              <Button variant="contained" sx={{ marginTop: '25px', width: '100%' }} type="submit"
              >Registrarse</Button>
          </form>
  )
}