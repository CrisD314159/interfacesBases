import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import './reporteProductosVentas.css'
import formatCurrency from "../formatCurrency";

interface ReporteItem{
  CIUDAD: string,
  PRODUCTO_ID: number,
  PRODUCTO_NOMBRE: string,
  TOTAL_VENDIDO: number,
  TOTAL_INGRESOS: number
}

interface ReporteResponse{
  success: boolean,
  data: ReporteItem[]
}


const ReporteProductosVendidos = () => {
    const [reporte, setReporte] = useState<ReporteItem[]>([]);

    const reporteMutation = useMutation<ReporteResponse, Error>({
      mutationFn: async ()=>{
        const response = await fetch(`http://localhost:3000/api/reportesProductosMasVendidos`)
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
      <div className="sales-report-container">
      <div className="sales-report-header">
        <h1 className="sales-report-title">Reporte de productos vendidos</h1>
        <p className="sales-report-description">
          Este reporte muestra los productos más vendidos por ciudad.
        </p>
      </div>
      <div className="sales-report-body">
        {reporte.map((item: ReporteItem) => (
          <div key={item.PRODUCTO_ID} className="sales-report-card">
            <h2 className="sales-report-card-city">{item.CIUDAD}</h2>
            <p className="sales-report-card-detail">Producto: {item.PRODUCTO_NOMBRE}</p>
            <p className="sales-report-card-detail">Total vendido: {item.TOTAL_VENDIDO}</p>
            <p className="sales-report-card-detail">Total ingresos: ${formatCurrency(item.TOTAL_INGRESOS)}</p>
          </div>
        ))}
      </div>
    </div>
    );
}

export default ReporteProductosVendidos;