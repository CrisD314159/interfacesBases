import { Button, TextField } from "@mui/material";
import './login.css'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface LoginResponse{
  success: boolean,
  vendedorId: number
}

interface LoginRequest{
  email: string,
  password: string
}

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (login: LoginRequest)=>{
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        localStorage.setItem('vendedorId', data.vendedorId.toString()) // Siempre mandar al id en numero
        navigate('/dashboard')
      }else{
        alert('Usuario o contraseña incorrectos')
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })


  const handleSubmit = ()=>{

    if(!email || !password){
      alert('Por favor llena todos los campos')
      return
    }
    const login : LoginRequest = {
      email,
      password
    }
    loginMutation.mutate(login)
    console.log(login);
  }

  return(
    <div className="mainLoginContainer">
      <div className="mainFormContainer">
        <div className="formTitleContainer">
          <h3 className="formTitle">Inicia Sesión</h3>
        </div>
        <div className="formContiner">
          <form action="" className="loginForm" onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()

          }}>
            <TextField id="outlined-basic" type="email" label="E-mail" variant="outlined" sx={{marginBottom:'25px', width:'100%'}}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              value={email}
              required
            />
            <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password"variant="outlined" sx={{marginBottom:'25px', width:'100%'}}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            value={password}
            required
            />
            <Button variant="contained" sx={{marginTop:'25px', width:'100%'}}
           type="submit"
            >Iniciar Sesión</Button>
          </form>
        </div>
      </div>
    </div>
  )
}