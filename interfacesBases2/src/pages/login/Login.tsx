import { Button, TextField } from "@mui/material";
import './login.css'
import { useState } from "react";

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <div className="mainLoginContainer">
      <div className="mainFormContainer">
        <div className="formTitleContainer">
          <h3 className="formTitle">Inicia Sesión</h3>
        </div>
        <div className="formContiner">
          <form action="" className="loginForm">
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
            onClick={()=>{
              console.log('Email:', email)
              console.log('Password', password)
            }}
            >Iniciar Sesión</Button>
          </form>
        </div>
      </div>
    </div>
  )
}