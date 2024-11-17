import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import './reporteVentasMensuales.css'

interface ReporteItem{
  MES: string,
  TOTAL_VENTAS: number,
  TOTAL_PRODUCTOS_VENDIDOS: number,
  TOTAL_INGRESOS: number
}

interface ReporteResponse{
  success: boolean,
  data: ReporteItem[]
}

const ReporteVentasMensuales = () => {
  const [reporte, setReporte] = useState<ReporteItem[]>([]);

  const reporteMutation = useMutation<ReporteResponse, Error>({
    mutationFn: async ()=>{
      const response = await fetch(`http://localhost:3000/api/reporteVentasMensuales`)
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
    <div className="monthly-sales-report-container">
      <div className="monthly-sales-report-header">
        <h1 className="monthly-sales-report-title">Reporte de ventas mensuales</h1>
        <p className="monthly-sales-report-description">
          Este reporte muestra las ventas realizadas por mes, incluyendo el total vendido, la cantidad de productos vendidos y los ingresos generados.
        </p>
      </div>
      <div className="monthly-sales-report-body">
        {reporte.map((item: ReporteItem) => (
          <div key={item.MES} className="monthly-sales-report-card">
            <h2 className="monthly-sales-report-card-title">Mes: {item.MES}</h2>
            <p className="monthly-sales-report-card-detail">Total vendido: {item.TOTAL_VENTAS}</p>
            <p className="monthly-sales-report-card-detail">Total productos vendidos: {item.TOTAL_PRODUCTOS_VENDIDOS}</p>
            <p className="monthly-sales-report-card-detail">Total ingresos: {item.TOTAL_INGRESOS}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReporteVentasMensuales;