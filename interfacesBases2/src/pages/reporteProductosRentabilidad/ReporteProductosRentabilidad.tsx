import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import './reporteRentabilidad.css'
import formatCurrency from "../formatCurrency";

interface ReporteItem{
  PRODUCTO_ID: string,
  PRODUCTO_NOMBRE: string,
  TOTAL_INGRESOS: number,
  TOTAL_COMISIONES: number,
  RENTABILIDAD: number
}

interface ReporteResponse{
  success: boolean,
  data: ReporteItem[]
}

const ReporteProductosRentabilidad = () => {
  const [reporte, setReporte] = useState<ReporteItem[]>([]);

  const reporteMutation = useMutation<ReporteResponse, Error>({
    mutationFn: async ()=>{
      const response = await fetch(`http://localhost:3000/api/reporteProductosRentabilidad`)
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
    <div className="profit-report-container">
      <div className="profit-report-header">
        <h1 className="profit-report-title">Reporte de productos por rentabilidad</h1>
        <p className="profit-report-description">
          Este reporte muestra los productos con mayor rentabilidad.
        </p>
      </div>
      <div className="profit-report-body">
        {reporte.map((item: ReporteItem) => (
          <div key={item.PRODUCTO_ID} className="profit-report-card">
            <h2 className="profit-report-card-title">{item.PRODUCTO_NOMBRE}</h2>
            <p className="profit-report-card-detail">Total ingresos: ${formatCurrency( item.TOTAL_INGRESOS)}</p>
            <p className="profit-report-card-detail">Total comisiones: ${formatCurrency(item.TOTAL_COMISIONES)}</p>
            <p className="profit-report-card-detail">Total rentabilidad: ${formatCurrency(item.RENTABILIDAD)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReporteProductosRentabilidad;