import { useMutation } from "@tanstack/react-query"
import LoginHeader from "../../components/loginHeader/LoginHeader"
import './dashboard.css'
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"

interface Estadisticas{
  nombreNivel: string,
    porcentajeComision: number,
    porcentajeComisionReferido: number,
    porcentajeComisionNieto: number,
    sumaComisiones: number,
    totalVentas: number
}

interface EstadisticasResponse{
  success: boolean,
  data: Estadisticas
}

interface ActualizarResponse{
  success: boolean,
  data: Estadisticas
}


const Dashboard = ()=>{
  const [estadisticas, setEstadisticas] = useState<Estadisticas>()
  const estadisticasMutation = useMutation<EstadisticasResponse, Error, string>({
    mutationFn: async (id)=>{
      const response = await fetch(`http://localhost:3000/api/obtenerEstadisticas/${id}`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setEstadisticas(data.data)
      }else{
        alert('No se pudo obtener las estadisticas');
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  })

  const actualizarCategoriasMutation = useMutation<ActualizarResponse, Error>({
    mutationFn: async ()=>{
      const response = await fetch(`http://localhost:3000/api/actualizarCategorias`, {method: 'PUT'})
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        alert('Categorias actualizadas correctamente')
      }else{
        alert('No se pudieron actualizar las categorias')
      }
    },
    onError: (error)=>{
      console.log(error);
    }
  }) 


  const handleUpdateCategorias = ()=>{
    actualizarCategoriasMutation.mutate()
  }
  useEffect(()=>{
    const id = localStorage.getItem('vendedorId')
    if(id){
      estadisticasMutation.mutate(id)
    }
  }, [])


  return (
    <div>
      <LoginHeader/>
      <div className="mainDashboardContainer">
        <div className="buttonCont">
        <h1 className="dashbnoardTitle">Dashboard</h1>
        <Button variant="contained" sx={{margin:'10px'}} color="primary" onClick={handleUpdateCategorias}>Actualizar categorias</Button>
        <NavLink to="/reporteEstadisticas" style={{margin:'10px'}} className="navLink"><Button variant="contained" color="primary">Reporte de las estadisticas de cada vendedor</Button></NavLink>
        <NavLink to="/reporteRentabilidad" style={{margin:'10px'}} className="navLink" ><Button variant="contained" color="primary">Reporte de los productos mas rentables</Button></NavLink>
        <NavLink to="/reporteProdVendidos" style={{margin:'10px'}} className="navLink"><Button variant="contained" color="primary">Reporte de los productos mas vendidos</Button></NavLink>
        <NavLink to="/reporteVentasMensuales" style={{margin:'10px'}} className="navLink"><Button variant="contained" color="primary">Reporte de las ventas mensuales</Button></NavLink>
        </div>
       
        <div className="dashboadCardContainer">
          <div className="dashboardCard">
            <h2 className="cardTitle">Nivel</h2>
            <div>
              <p className="pCard">
                En este momento, su nivel en VitalisPro es: {estadisticas?.nombreNivel}
              </p>
            </div>
          </div>
          <div className="dashboardCard">
            <h2  className="cardTitle">Ganancias totales</h2>
            <div>
              <p className="pCard">
                En total, las ganancias totales de los productos vendidos son: ${estadisticas?.totalVentas}
              </p>
              <p className="pCard">
                En total, las ganancias obtenidas por comisiones de referidos son: ${estadisticas?.sumaComisiones}
              </p>
            </div>
          </div>
          <div className="dashboardCard">
            <h2  className="cardTitle">Porcentajes de comisión</h2>
            
              <p className="pCard">
                Sus porcentajes de comisión están repartidos de la siguiente manera:
              </p>
              <p className="pCardText">
                - {estadisticas?.porcentajeComision}% de comisión por ventas que usted realice
              </p>
              <p className="pCardText">
                - {estadisticas?.porcentajeComisionReferido}% de comisión por ventas de personas que usted haya referido
              </p>
              <p className="pCardText">
              - {estadisticas?.porcentajeComisionNieto}% de comisión por ventas de personas que hayan sido referidas por sus referidos
              </p>
           
          </div>
        
        </div>

      </div>
    </div>
  )
}


export default Dashboard