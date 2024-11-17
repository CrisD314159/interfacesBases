import { Button } from "@mui/material";
import LoginHeader from "../../components/loginHeader/LoginHeader";
import './Profile.css';
import { useMutation } from "@tanstack/react-query";
import { Vendedor } from "../checkout/Checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface VendedorResponse{
  success: boolean,
  data: Vendedor
}

interface EliminarResponse{
  success: boolean,
  message: string
}
const Profile = () => {
  const [vendedor, setVendedor] = useState<Vendedor>()
  const navigate = useNavigate()

  const vendedorMutation = useMutation<VendedorResponse, Error, string>({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/obtenerVendedor/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setVendedor(data.data)
      }else{
        alert('No se pudo obtener el vendedor');
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })

  const eliminarVendedorMutation = useMutation<EliminarResponse, Error, string>({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/eliminarVendedor/${id}`, {method: 'DELETE'})
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        alert('Su cuenta ha sido eliminada, sus vendedores referidos hijos han sido reasignados a su vendedor referido padre')
        localStorage.removeItem('vendedorId')
        navigate('/')
      }
      
    },
    onError: (error)=>{
      console.log(error);
    }
  })

  const handleDelete = ()=>{
    const id = localStorage.getItem('vendedorId')
    if(id)eliminarVendedorMutation.mutate(id)
  }

  useEffect(()=>{
    const id = localStorage.getItem('vendedorId')
    if(id)vendedorMutation.mutate(id)
  },[])

  return (
    <div>
      <LoginHeader />
      <div className="profile-container">
      
      <h1 className="profile-title">Perfil</h1>
      <div className="profile-content">
        <div className="profile-info">
          <h2 className="section-title">Información personal</h2>
          <div className="info-list">
            <p>Nombre: {vendedor?.NOMBRE}</p>
            <p>Apellido:{vendedor?.APELLIDO}</p>
            <p>Cédula: {vendedor?.ID}</p>
            <p>Correo: {vendedor?.EMAIL}</p>
            <p>Teléfono:{vendedor?.TELEFONO}</p>
            <p>Dirección:{vendedor?.DESCRIPCIÓN}</p>
          </div>
        </div>
        <div className="profile-actions">
          <Button variant="contained" color="error" className="delete-button" 
          onClick={handleDelete}
          >
            Eliminar Cuenta
          </Button>
        </div>
      </div>
    </div>
    </div>
  
  );
};



export default Profile;