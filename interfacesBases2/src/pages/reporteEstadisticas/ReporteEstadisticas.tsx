import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import './reporteEstadisticas.css'

interface ReporteItem{
  VENDEDOR_ID: number,
  VENDEDOR_NOMBRE: string,
  TOTAL_VENTAS: number,
  TOTAL_PRODUCTOS_VENDIDOS: number,
  TOTAL_INGRESOS: number
  TOTAL_COMISIONES: number
}

interface ReporteResponse{
  success: boolean,
  data: ReporteItem[]
}

const ReporteEstadisticas = () => {
  const [reporte, setReporte] = useState<ReporteItem[]>([]);

  const reporteMutation = useMutation<ReporteResponse, Error>({
    mutationFn: async ()=>{
      const response = await fetch(`http://localhost:3000/api/estadisticasVentasVendedores`)
      const data = await response.json()
      return data
    },
    onSuccess: (data)=>{
      if(data.success){
        setReporte(data.data)
      }else{
        alert("Error al obtener el reporte")
      }
      
    },
    onError: (error)=>{
      console.log(error);
    }
  })

  useEffect(()=>{
    reporteMutation.mutate()
  },[])
  return (
    <div className="report-container">
    <div className="report-header">
      <h1 className="report-title">Reporte de estadísticas</h1>
      <p className="report-description">
        Este reporte muestra las ventas realizadas por cada vendedor, incluyendo el total vendido, las comisiones generadas, y la cantidad de productos vendidos.
      </p>
    </div>
    <div className="report-body">
      {reporte.map((item: ReporteItem) => (
        <div key={item.VENDEDOR_ID} className="report-card">
          <h2 className="report-card-title">{item.VENDEDOR_NOMBRE}</h2>
          <p className="report-card-detail">Cantidad total ventas: {item.TOTAL_VENTAS}</p>
          <p className="report-card-detail">Total productos vendidos: {item.TOTAL_PRODUCTOS_VENDIDOS}</p>
          <p className="report-card-detail">Total ingresos: {item.TOTAL_INGRESOS}</p>
          <p className="report-card-detail">Total comisiones: {item.TOTAL_COMISIONES}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ReporteEstadisticas;