import './detalleDespacho.css'
import LoginHeader from '../../components/loginHeader/LoginHeader';

export default function DetalleDespacho(){
  const despacho = {
    id: 1,
    nombre: 'Despacho 1',
    direccion: 'Calle 1 # 1-1',
    ciudad: 'Bogotá',
    fecha: '2021-12-31',
    hora: '10:00',
    estado: 'En camino',
  }
  return(
    <div>
      <LoginHeader/>
      <div className='detalleDespachoMainCard'>
        <div key={despacho.id} className="detalleDespachoCard">
          <h2 className="despachoName despachoP">Nombre: {despacho.nombre}</h2>
          <p className="despachoDireccion despachoP">Dirección: {despacho.direccion}</p>
          <p className="despachoCiudad despachoP">Ciudad: {despacho.ciudad}</p>
          <p className="despachoFecha despachoP">Fecha: {despacho.fecha}</p>
          <p className="despachoHora despachoP">Hora: {despacho.hora}</p>
          <p className="despachoEstado despachoP">Estado: {despacho.estado}</p>
        </div>
      </div>
    </div>
  )
}