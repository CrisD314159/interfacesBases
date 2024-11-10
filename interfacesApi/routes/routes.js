import { Router } from "express";
import { getHelloAsync } from "../model/methods.js";
import { getConnection } from "oracledb";
import * as pm from "../model/personalMethods.js"
import * as ventasMetodos from "../model/ventas.js"
import { afiliar } from "../model/personalMethods.js"
import { getConnection } from "../connDB/connDB.js";
import oracledb from "oracledb";

export const router = Router(); // Crea la instancia de Router para establecer las rutas

router.get("/", (req, res) => { // se pueden establecer rutas con los métodos HTTP
  // req es el objeto de la petición (puede contener datos del cliente en el req.body, y parametros en la url con req.params)
  // res.send envía una respuesta al cliente
  res.send("Hello World");
} );


router.post("/getHello", getHelloAsync); // tmabien se pueden llamar a otras funciones que se encuentren en otro archivo para especificar la lógica de la app

//----------------------------------------------------------------------------------//
router.post("/agregarVenta", ventasMetodos.agregarVenta)


//----------------------------------------------------------------------------------//


router.get("/getExampleUsers", async(req, res)=>{
  try {
    // obtenemos la conexion a la bd
    const connection = await getConnection();
    // ejecutamos la consulta, Sintaxis (query, parametros, opciones{ resultSet: permite que nos devuelva array con los valores, outFormat: oracledb.OUT_FORMAT_OBJECT permite que este en formato objeto})
    const result = await connection.execute(`SELECT * FROM USER_VSCODE`, [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; // obtenemos el resultSet, es decir, el array con los valores
    let rows = []; // declaramos un array para guardar los valores
    let row;
    while ((row = await rs.getRow())) {   // mientras haya filas, las guardamos en el array (Esta bd no tiene un metodo como tal que obtenga todos los valores, por eso se hace de esta manera)
      rows.push(row); // guardamos la fila en el array
    }
    console.log(rows); // mostramos los valores
    // Si queremos obtener solo un valor, se puede hacer de la siguiente manera
    // let row = await rs.getRows(1); debemos pasar por parametro la cantidad de valores que queremos obtener, de lo contrario devuelve vacio 

    res.json({message: "Consulta exitosa"});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    
  }
})


router.post("/getExampleUsers", async(req, res)=>{
  try {
    // obtenemos la conexion a la bd
    const connection = await getConnection();
    // ejecutamos la consulta, Sintaxis (query, parametros, opciones{ autoCommit: permite que se haga un commit automatico})
    const result = await connection.execute(`INSERT INTO USER_VSCODE VALUES (:1, :2)`, ['098765432', 'Jane Doe'], { autoCommit: true });
    console.log(result);
    res.json({message: "Inserción exitosa"});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    
  }
})


