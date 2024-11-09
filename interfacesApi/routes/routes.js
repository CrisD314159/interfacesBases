import { Router } from "express";
import { getHelloAsync } from "../model/methods.js";
import { getConnection } from "oracledb";
import * as pm from "../model/personalMethods.js"
import * as prodm from "../model/productoMethods.js"

export const router = Router(); // Crea la instancia de Router para establecer las rutas

router.get("/", (req, res) => { // se pueden establecer rutas con los métodos HTTP
  // req es el objeto de la petición (puede contener datos del cliente en el req.body, y parametros en la url con req.params)
  // res.send envía una respuesta al cliente
  res.send("Hello World");
} );


router.post("/getHello", getHelloAsync); // tmabien se pueden llamar a otras funciones que se encuentren en otro archivo para especificar la lógica de la app

//------------- Endpoints personal -------------//
router.post("/crearUsuario", pm.afiliar)

router.get("/obtenerUsuario", pm.obtenerVendedor)

router.get("/obtenerUsuarios", pm.obtenerVendedores)

router.put("/actualizarUsuario", pm.actualizarVendedor)

router.delete("/eliminarUsuario", pm.eliminarVendedor)

router.get("/obtenerNivel", pm.obtenerNivel)

router.post("/actualizarComision", (req, res) =>{ //duda
  res.send()
})

//duda con el nivel//

//------------- Endpoints productos -------------//
router.post("/agregarProducto", ) //duda

router.get("/obtenerProducto", prodm.obtenerProducto)

router.get("/obtenerProductos", prodm.obtenerProductos)

router.put("/actualizarProducto", prodm.actualizarProducto)

router.delete("/eliminarProducto", ) //duda


//------------- Endpoints ventas -------------//
router.post("/aregarVenta", (req,res)=>{
  //llamar metodo para realizar la venta
  res.send()
})

router.get("/obtenerVentas", (req, res)=>{
  //obtener la cantidad de ventas de un afiliado
  res.send()
})


//------------- Endpoints envios -------------//
router.post("/agregarEnvio", (req, res)=>{
  res.send()
})


