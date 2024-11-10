export const agregarVenta = async (req, res) => {
    try {
        const {
            id, fecha_venta, id_vendedor, id_comprador
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`INSERT INTO Venta(id,fecha_venta, vendedor, idComprador) VALUES(:1, :2, :3, :4)`, [id, fecha_venta, id_vendedor, id_comprador], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.json({ mensaje: "Venta agregada con exito" }).status(200)
        console.log(result)
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexion:', err);
            }
        }
    }
}


export const agregarDetalleVenta = async (req, res) => {
    try {
        const {
            id, id_producto, cantidad, valor_unitario, id_venta
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`INSERT INTO DetalleVenta VALUES(:1, :2, :3, :4, :5)`, [id, id_producto, cantidad, valor_unitario, id_venta], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.json({ mensaje: "VentaDetalle agregada con exito" }).status(200)
        console.log(result)
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexion:', err);
            }
        }
    }
}


export const obtenerVenta = async (req, res) => {
    try {
        const {
            codigo
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`SELECT * FROM Venta WHERE id=:1`, [codigo], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        const rs = result.resultSet; 
        let rows = []; 
        let row;

        while ((row = await rs.getRow())) { 
            rows.push(row); 
        }

        res.json({ mensaje: "Consulta exitosa" }).status(200)
        console.log(result)
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexion:', err);
            }
        }
    }
}


