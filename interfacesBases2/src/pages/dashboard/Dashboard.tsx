import LoginHeader from "../../components/loginHeader/LoginHeader"
import './dashboard.css'

const Dashboard = ()=>{

  const level = 'Platino'
  const vendido = 12312312

  return (
    <div>
      <LoginHeader/>
      <div className="mainDashboardContainer">
        <h1 className="dashbnoardTitle">Dashboard</h1>
        <div className="dashboadCardContainer">
          <div className="dashboardCard">
            <h2 className="cardTitle">Nivel</h2>
            <div>
              <p className="pCard">
                En este momento, su nivel en VitalisPro es: {level}
              </p>
            </div>
          </div>
          <div className="dashboardCard">
            <h2  className="cardTitle">Ganancias totales</h2>
            <div>
              <p className="pCard">
                En total, las ganancias totales de los productos vendidos son: ${vendido}
              </p>
            </div>
          </div>
          <div className="dashboardCard">
            <h2  className="cardTitle">Porcentajes de comisión</h2>
            
              <p className="pCard">
                Sus porcentajes de comisión están repartidos de la siguiente manera:
              </p>
              <p className="pCardText">
                - 10% de comisión por ventas de personas que usted haya referido
              </p>
              <p className="pCardText">
              - 5% de comisión por ventas de personas que hayan sido referidas por sus referidos
              </p>
           
          </div>
          <div className="dashboardCard"></div>
        </div>

      </div>
    </div>
  )
}


export default Dashboard