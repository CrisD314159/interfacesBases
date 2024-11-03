import { Router } from "express";
import { getHelloAsync } from "../model/methods.js";
import { getConnection } from "oracledb";
import { afiliar } from "../model/personalMethods.js"

export const router = Router(); // Crea la instancia de Router para establecer las rutas

router.get("/", (req, res) => { // se pueden establecer rutas con los métodos HTTP
  // req es el objeto de la petición (puede contener datos del cliente en el req.body, y parametros en la url con req.params)
  // res.send envía una respuesta al cliente
  res.send("Hello World");
} );


router.post("/getHello", getHelloAsync); // tmabien se pueden llamar a otras funciones que se encuentren en otro archivo para especificar la lógica de la app

//------------- Endpoints personal -------------// afiliar a alguien
router.post("/crearUsuario", afiliar)

router.get("/obtenerUsuario", (req, res) =>{
  //llamar metodo para obtener un usuario en especifico
  res.send()
})

router.get("/obtenerUsuarios", (req, res) =>{
  //llamar metodo para obtener todos los usuarios
  res.send()
})

router.put("/actualizarUsuario", (req, res) =>{
  //llamar metodo para actualizar usuario
  res.send()
})

router.delete("/eliminarUsuario", (req, res) =>{
  //llamar metodo para eliminar usuario
  res.send()
})

router.get("/obtenerNivel", (req, res) =>{
  //llamar metodo para obtener el nivel en el cual se encuentra un afiliado
  res.send()
})

router.post("/actualizarComision", (req, res) =>{
  res.send()
})


//------------- Endpoints productos -------------//
router.post("/agregarProducto", (req,res)=>{
  //llamar metodo para agregar productos
  res.send()
})

router.get("/obtenerProducto", (req,res)=>{
  //llamar metodo para obtener un producto en especifico
  res.send()
})

router.get("/obtenerProductos", (req,res)=>{
  //llamar metodo para obtener todos los productos
  res.send()
})

router.put("/actualizarProducto", (req,res)=>{
  //llamar metodo para actualizar un producto
  res.send()
})

router.delete("/eliminarProducto", (req,res)=>{
  //llamar metodo para eliminar un producto
  res.send()
})


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


