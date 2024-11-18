import { Router } from "express";
import { getHelloAsync } from "../model/methods.js";
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



router.get('/obtenerproductos', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(`SELECT * FROM PRODUCTO`, [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})

router.get('/obtenerproducto/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`SELECT * FROM PRODUCTO WHERE ID = :id`, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    const row = await rs.getRow();

    res.json({success: true, data: row});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})

router.get('/obtenerCiudades', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(`SELECT * FROM CIUDAD`, [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})


router.get('/obtenerproductosVendedor/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
      SELECT v.ID AS vendedor_id, 
      v.NOMBRE AS vendedor_nombre, 
      di.CANTIDAD AS stock
      FROM VENDEDOR v
      JOIN INVENTARIO i ON v.ID = i.VENDEDOR
      JOIN DETALLEINVENTARIO di ON i.ID = di.INVENTARIO
      JOIN PRODUCTO p ON di.ID_PRODUCTO = p.ID
      WHERE p.ID = :id
      AND di.CANTIDAD > 0
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})


router.get('/obtenerVendedorProductos/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
      SELECT * FROM DETALLEINVENTARIO DI
JOIN INVENTARIO I ON I.ID = DI.INVENTARIO
JOIN PRODUCTO P ON P.ID = DI.ID_PRODUCTO
WHERE I.VENDEDOR = :id
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})


router.get('/obtenerEnviosVendedor/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
      -- Obtener todos los despachos o envios de un vendedor
      SELECT e.ID AS envio_id,
       e.FECHA_ENVIO,
       ES.descripción,
       d.DESCRIPCIÓN AS direccion_descripcion,
       v.ID AS venta_id,
       v.Id_comprador AS comprador_id,
       p.NOMBRE AS producto_nombre,
       vendedor.ID AS vendedor_id,
       vendedor.NOMBRE AS vendedor_nombre
      FROM ENVIO e
      JOIN VENTA v ON e.VENTA = v.ID
      JOIN EstadoEnvio ES ON ES.ID = e.estado
      JOIN VENDEDOR vendedor ON v.VENDEDOR = vendedor.ID
      JOIN DETALLEVENTA dv ON v.ID = dv.VENTA
      JOIN PRODUCTO p ON dv.PRODUCTO = p.ID
      JOIN DIRECCION d ON e.DIRECCION = d.ID
      WHERE vendedor.ID = :id
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})


router.get('/obtenerDetalleEnvio/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
    SELECT E.ID AS ID_ENVIO, V.Id_comprador AS COMPRADOR_ID, ES.DESCRIPCIÓN AS ESTADO, D.DESCRIPCIÓN AS DIRECCION, C.NOMBRE AS CIUDAD, E.FECHA_ENVIO AS FECHA, VEN.NOMBRE AS VENDEDOR
FROM ENVIO E
JOIN VENTA V ON V.ID = E.VENTA
JOIN DIRECCION D ON D.ID = E.DIRECCION
JOIN CIUDAD C ON C.ID = D.CIUDAD
JOIN EstadoEnvio ES ON ES.ID = E.ESTADO
JOIN VENDEDOR VEN ON VEN.ID = V.VENDEDOR
WHERE V.ID_COMPRADOR = :id
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    let rows = []; 
    let row;
    while ((row = await rs.getRow())) {   
      rows.push(row); 
    }
    console.log(rows); 

    res.json({success: true, data: rows});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})

router.get('/obtenerVendedor/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
 SELECT V.ID, V.NOMBRE, V.APELLIDO, V.TELEFONO, V.EMAIL, D.DESCRIPCIÓN, RF.NOMBRE AS NOMBRE_REFERIDO, RF.APELLIDO AS APELLIDO_REFERIDO,  N.nombrenivel
FROM VENDEDOR V
JOIN VENDEDOR RF ON RF.ID = V.Vendedor_referido
JOIN DIRECCION D ON D.ID = V.DIRECCION
JOIN NIVEL N ON N.ID = V.NIVEL 
WHERE V.ID = :id
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    const row = await rs.getRow();

    res.json({success: true, data: row});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})



router.get('/obtenerDetalleEnvioVendedor/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
    SELECT E.ID AS ID_ENVIO, V.Id_comprador AS COMPRADOR_ID, ES.DESCRIPCIÓN AS ESTADO, D.DESCRIPCIÓN AS DIRECCION, C.NOMBRE AS CIUDAD, E.FECHA_ENVIO AS FECHA, VEN.NOMBRE AS VENDEDOR
FROM ENVIO E
JOIN VENTA V ON V.ID = E.VENTA
JOIN DIRECCION D ON D.ID = E.DIRECCION
JOIN CIUDAD C ON C.ID = D.CIUDAD
JOIN EstadoEnvio ES ON ES.ID = E.ESTADO
JOIN VENDEDOR VEN ON VEN.ID = V.VENDEDOR
WHERE E.ID = :id
      `, [id], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet; 
    const row = await rs.getRow();
   

    res.json({success: true, data: row});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, data: []});
  }

})


router.put('/actualizarEnvio', async (req, res) => {
  const {id, estado} = req.body;
  try {
    const connection = await getConnection();
    const result = await connection.execute(`
    UPDATE ENVIO SET ESTADO = :estado WHERE ID = :id
      `, [estado, id], { autoCommit: true });
   

    res.json({success: true, message: 'Envio actualizado correctamente'});
  } catch (error) {
    console.log("Error al obtener la conexión", error);
    res.json({success: false, message: 'Error al actualizar el envio'});
  }

})




//----------------------------------------------------------------------------------//

router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Recuperar email y password del cuerpo de la solicitud
  try {
    const connection = await getConnection();

    // Ejecutamos la función con los parámetros correspondientes
    const result = await connection.execute(
      `
      BEGIN
        :resultado := loginVendedor(:correo, :password);
      END;
      `,
      {
        correo: email, // Bind para el correo del vendedor
        password,      // Bind para la contraseña
        resultado: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Bind out para obtener el ID del vendedor
      }
    );

    const vendedorId = result.outBinds.resultado; // Obtenemos el resultado del parámetro out

    // Validamos el resultado
    if (vendedorId > 0) {
      res.json({ success: true, vendedorId });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error("Error al ejecutar la función de login:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});




// Procedimientos requerimientos
//----------------------------------------------------------------------------------//
router.post('/crearCompra', async (req, res) => {
  const {
    id_vendedor,
    id_producto,
    cantidad,
    id_comprador,
    direccionEnvio,
    id_ciudad,
  } = req.body; // Extraer los parámetros del cuerpo de la solicitud

  try {
    const connection = await getConnection();

    // Llamada al procedimiento almacenado
    const result = await connection.execute(
      `
      BEGIN
        crearCompra(
          :id_vendedor,
          :id_producto,
          :cantidad,
          :id_comprador,
          :direccionEnvio,
          :id_ciudad,
          :v_returnValue
        );
      END;
      `,
      {
        id_vendedor, // ID del vendedor
        id_producto, // ID del producto
        cantidad,    // Cantidad del producto
        id_comprador, // ID del comprador
        direccionEnvio, // Descripción de la dirección
        id_ciudad, // ID de la ciudad
        v_returnValue: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Valor de salida
      }
    );

    const returnValue = result.outBinds.v_returnValue; // Obtener el valor de retorno

    if (returnValue === 1) {
      res.json({ success: true, message: 'Compra creada exitosamente' });
    } else {
      res.status(400).json({ success: false, message: 'Error al crear la compra' });
    }
  } catch (error) {
    console.error("Error al ejecutar el procedimiento 'crearCompra':", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});


router.post('/crearVendedor', async (req, res) => {
  const {
    id,
    nombre,
    apellido,
    telefono,
    email,
    password,
    vendedor_referido,
    desc_direccion,
    id_ciudad,
  } = req.body; // Recuperar parámetros de la solicitud
console.log(req.body);
  try {
    const connection = await getConnection();

    // Declarar variable para el parámetro de salida
    let returnValue;

    // Llamada al procedimiento almacenado
    const result = await connection.execute(
      `
      BEGIN
        crearVendedor(
          :id,
          :nombre,
          :apellido,
          :telefono,
          :email,
          :vendedor_referido,
          :desc_direccion,
          :id_ciudad,
          :password,
          :v_returnValue
        );
      END;
      `,
      {
        id, // ID del vendedor
        nombre, // Nombre del vendedor
        apellido, // Apellido del vendedor
        telefono, // Teléfono del vendedor
        email, // Email del vendedor
        password, // Contraseña del vendedor
        vendedor_referido, // Vendedor referido (puede ser nulo)
        desc_direccion, // Descripción de la dirección
        id_ciudad, // ID de la ciudad
        v_returnValue: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Salida
      }
    );

    // Obtener el valor de retorno
    returnValue = result.outBinds.v_returnValue;

    // Evaluar el resultado y responder al cliente
    if (returnValue === 1) {
      res.json({ success: true, message: 'Vendedor creado exitosamente' });
    } else {
      res.status(400).json({ success: false, message: 'Ocurrió un error al crear el vendedor' });
    }
  } catch (error) {
    // Capturar errores específicos
    if (error.errorNum === -1008) {
      res.status(400).json({ success: false, message: 'El vendedor ya existe' });
    } else {
      console.error("Error al ejecutar el procedimiento 'crearVendedor':", error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  }
});


router.put('/llenarInventario', async (req, res) => {
  const { id_vendedor, cantidad, idproducto } = req.body; // Recuperar parámetros de la solicitud

  try {
    const connection = await getConnection();

    // Llamar al procedimiento almacenado con los parámetros adecuados
    const result = await connection.execute(
      `
      BEGIN
        llenarInventario(
          :id_vendedor,
          :cantidad,
          :idproducto,
          :v_returnValue
        );
      END;
      `,
      {
        id_vendedor, // ID del vendedor
        cantidad, // Cantidad a agregar al inventario
        idproducto, // ID del producto
        v_returnValue: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Parámetro de salida
      },
      { autoCommit: true } // Asegurar que los cambios se apliquen automáticamente
    );

    const returnValue = result.outBinds.v_returnValue; // Obtener el valor de retorno

    // Evaluar el resultado y responder
    if (returnValue === 1) {
      res.json({ success: true, message: 'Inventario actualizado exitosamente' });
    } else {
      res.status(400).json({
        success: false,
        message: 'Error al actualizar el inventario. Verifica los datos enviados.',
      });
    }
  } catch (error) {
    // Manejo de errores
    if (error.errorNum === -20008) {
      res.status(400).json({
        success: false,
        message: error.message || 'El vendedor o el producto no existen, o no hay suficiente stock.',
      });
    } else {
      console.error('Error al ejecutar el procedimiento "llenarInventario":', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor. Intenta más tarde.',
      });
    }
  }
});

router.get('/obtenerEstadisticas/:id_vendedor', async (req, res) => {
  const { id_vendedor } = req.params; // Recuperar ID del vendedor desde la URL

  try {
    const connection = await getConnection();

    // Llamar a la función `obtenerEstadisticas`
    const result = await connection.execute(
      `
      DECLARE
        v_estadisticas t_vendedor_est; -- Variable para almacenar el resultado
      BEGIN
        v_estadisticas := obtenerEstadisticas(:id_vendedor);
        :v_nombreNivel := v_estadisticas.nombreNivel;
        :v_porcentajeComision := v_estadisticas.PorcentajeComision;
        :v_porcentajeComisionReferido := v_estadisticas.PorcentajeComisionReferido;
        :v_porcentajeComisionNieto := v_estadisticas.PorcentajeComisionNieto;
        :v_sumaComisiones := v_estadisticas.total_comisiones;
        :v_totalVentas := v_estadisticas.total_ventas;
      END;
      `,
      {
        id_vendedor, // Parámetro de entrada
        v_nombreNivel: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
        v_porcentajeComision: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        v_porcentajeComisionReferido: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        v_porcentajeComisionNieto: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        v_sumaComisiones: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        v_totalVentas: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );
    const estadisticas = {
      nombreNivel: result.outBinds.v_nombreNivel,
      porcentajeComision: result.outBinds.v_porcentajeComision,
      porcentajeComisionReferido: result.outBinds.v_porcentajeComisionReferido,
      porcentajeComisionNieto: result.outBinds.v_porcentajeComisionNieto,
      sumaComisiones: result.outBinds.v_sumaComisiones,
      totalVentas: result.outBinds.v_totalVentas,
    };

    res.json({ success: true, data: estadisticas });
  } catch (error) {
    console.error('Error al ejecutar la función "obtenerEstadisticas":', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Intenta más tarde.',
    });
  }
});

router.delete('/eliminarVendedor/:id', async (req, res) => {
  const { id } = req.params; // ID del vendedor a eliminar

  try {
    const connection = await getConnection();

    // Ejecutar DELETE sobre la vista, lo que invocará el trigger
    const result = await connection.execute(
      `
      DELETE FROM vista_vendedores_eliminar WHERE ID = :id
      `,
      [id], // Parámetro para el ID del vendedor
      { autoCommit: true } // Asegura que los cambios se apliquen automáticamente
    );

    // Verifica si se realizó alguna acción de eliminación
    if (result.rowsAffected > 0) {
      res.json({
        success: true,
        message: 'Vendedor marcado como eliminado y sus hijos reasignados correctamente.'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No se encontró el vendedor con el ID proporcionado.'
      });
    }
  } catch (error) {
    console.error('Error al eliminar vendedor:', error);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al intentar eliminar el vendedor.'
    });
  }
});



router.put('/actualizarCategorias', async (req, res) => {
  try {
    const connection = await getConnection();

    // Ejecutar DELETE sobre la vista, lo que invocará el trigger
    const result = await connection.execute(
      `
      BEGIN
      
        actualizarCategorias;

      END;
      `,
      [], // Parámetro para el ID del vendedor
      { autoCommit: true } // Asegura que los cambios se apliquen automáticamente
    );

    // Verifica si se realizó alguna acción de eliminación
  
      res.json({
        success: true,
        message: 'Categorias actualizadas correctamente.'
      });
    
  } catch (error) {
    console.error('Error al eliminar vendedor:', error);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al actualizar las categorias.'
    });
  }
});







//----------------------------------------------------------------------------------//
// Reportes varios

//ventas realizadas por cada vendedor, incluyendo el total vendido, las comisiones generadas, y la cantidad de productos vendidos.
router.get('/estadisticasVentasVendedores', async (req, res) => {
  try {
    const connection = await getConnection();

    // Consulta SQL
    const query = `
      SELECT v.ID AS vendedor_id,
       v.NOMBRE AS vendedor_nombre,
       v.APELLIDO AS vendedor_apellido,
       COUNT(DISTINCT ve.ID) AS total_ventas,
       NVL(SUM(dv.CANTIDAD),0) AS total_productos_vendidos,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos,
       NVL(SUM(c.VALORCOMISION),0) AS total_comisiones,
       COUNT(vr.ID) AS cant_ref
FROM VENDEDOR v
LEFT JOIN VENTA ve ON v.ID = ve.VENDEDOR
LEFT JOIN DETALLEVENTA dv ON ve.ID = dv.VENTA
LEFT JOIN COMISION c ON c.VENDEDOR = v.ID
LEFT JOIN VENDEDOR vr ON vr.VENDEDOR_REFERIDO = v.ID
GROUP BY v.ID, v.NOMBRE, v.APELLIDO
ORDER BY total_ingresos DESC
    `;

    // Ejecutar la consulta
    const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT, resultSet: true });
    const rs = result.resultSet; // obtenemos el resultSet, es decir, el array con los valores
    let rows = []; // declaramos un array para guardar los valores
    let row;
    while ((row = await rs.getRow())) {   // mientras haya filas, las guardamos en el array (Esta bd no tiene un metodo como tal que obtenga todos los valores, por eso se hace de esta manera)
      rows.push(row); // guardamos la fila en el array
    }
    console.log(rows); // mo
    // Enviar respuesta con los datos
    res.json({
      success: true,
      data:rows
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas de los vendedores:', error);

    // Manejar errores
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas de los vendedores.'
    });
  }
});


// Productos mas vendidos por ciudad
router.get('/reportesProductosMasVendidos', async (req, res) => {
  try {
    const connection = await getConnection();

    // Consulta SQL
    const query = `
   SELECT  ciu.NOMBRE AS ciudad,
       p.ID AS producto_id,
       p.NOMBRE AS producto_nombre,
       NVL(SUM(dv.CANTIDAD),0) AS total_vendido,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos
FROM DETALLEVENTA dv
JOIN PRODUCTO p ON dv.PRODUCTO = p.ID
JOIN VENTA ve ON dv.VENTA = ve.ID
JOIN ENVIO e ON e.VENTA = ve.ID
JOIN DIRECCION d ON e.DIRECCION = d.ID
JOIN CIUDAD ciu ON d.CIUDAD = ciu.ID
GROUP BY ciu.NOMBRE, p.ID, p.NOMBRE
ORDER BY ciu.NOMBRE, total_vendido DESC
    `;

    // Ejecutar la consulta
    const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT, resultSet: true });
    const rs = result.resultSet; // obtenemos el resultSet, es decir, el array con los valores
    let rows = []; // declaramos un array para guardar los valores
    let row;
    while ((row = await rs.getRow())) {   // mientras haya filas, las guardamos en el array (Esta bd no tiene un metodo como tal que obtenga todos los valores, por eso se hace de esta manera)
      rows.push(row); // guardamos la fila en el array
    }
    console.log(rows); // mo
    // Enviar respuesta con los datos
    res.json({
      success: true,
      data:rows
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas de los vendedores:', error);

    // Manejar errores
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas de los vendedores.'
    });
  }
});


//muestra las ventas mensuales, con el total de ingresos y la cantidad de productos vendidos por cada mes.
router.get('/reporteVentasMensuales', async (req, res) => {
  try {
    const connection = await getConnection();

    // Consulta SQL
    const query = `
SELECT TO_CHAR(ve.FECHA_VENTA, 'YYYY-MM') AS mes,
       COUNT(ve.ID) AS total_ventas,
       NVL(SUM(dv.CANTIDAD),0) AS total_productos_vendidos,
       NVL(SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos
FROM VENTA ve
JOIN DETALLEVENTA dv ON ve.ID = dv.VENTA
GROUP BY TO_CHAR(ve.FECHA_VENTA, 'YYYY-MM')
ORDER BY mes ASC

    `;

    // Ejecutar la consulta
    const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT, resultSet: true });
    const rs = result.resultSet; // obtenemos el resultSet, es decir, el array con los valores
    let rows = []; // declaramos un array para guardar los valores
    let row;
    while ((row = await rs.getRow())) {   // mientras haya filas, las guardamos en el array (Esta bd no tiene un metodo como tal que obtenga todos los valores, por eso se hace de esta manera)
      rows.push(row); // guardamos la fila en el array
    }
    console.log(rows); // mo
    // Enviar respuesta con los datos
    res.json({
      success: true,
      data:rows
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas de los vendedores:', error);

    // Manejar errores
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas de los vendedores.'
    });
  }
});

router.get('/reporteProductosRentabilidad', async (req, res) => {
  try {
    const connection = await getConnection();

    // Consulta SQL
    const query = `
SELECT p.ID AS producto_id,
       p.NOMBRE AS producto_nombre,
      NVL( SUM(dv.CANTIDAD * dv.VALORUNITARIO),0) AS total_ingresos,
      NVL( SUM(c.VALORCOMISION),0) AS total_comisiones,
       NVL((SUM(dv.CANTIDAD * dv.VALORUNITARIO) - SUM(c.VALORCOMISION)) ,0)AS rentabilidad
FROM PRODUCTO p
JOIN DETALLEVENTA dv ON p.ID = dv.PRODUCTO
JOIN VENTA ve ON dv.VENTA = ve.ID
JOIN COMISION c ON c.VENTA = ve.ID
GROUP BY p.ID, p.NOMBRE
ORDER BY rentabilidad DESC

    `;

    // Ejecutar la consulta
    const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT, resultSet: true });
    const rs = result.resultSet; // obtenemos el resultSet, es decir, el array con los valores
    let rows = []; // declaramos un array para guardar los valores
    let row;
    while ((row = await rs.getRow())) {   // mientras haya filas, las guardamos en el array (Esta bd no tiene un metodo como tal que obtenga todos los valores, por eso se hace de esta manera)
      rows.push(row); // guardamos la fila en el array
    }
    console.log(rows); // mo
    // Enviar respuesta con los datos
    res.json({
      success: true,
      data:rows
    });
  } catch (error) {
    console.error('Error al obtener las estadísticas de los vendedores:', error);

    // Manejar errores
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas de los vendedores.'
    });
  }
});








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


