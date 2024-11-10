export const actualizarStock = async (req, res) => {
    try {
        const {
            id_detalleInventario, cantidad
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`actualizarStock(:1,:2)`, [id_detalleInventario, cantidad], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.json({ mensaje: "Stock actualizado con exito" }).status(200)
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


export const llenarInventario = async (req, res) => {
    try {
        const {
            id_vendedor, cantidad, id_producto
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`llenarInventario(:1,:2, :3)`, [id_vendedor, cantidad, id_producto], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.json({ mensaje: "Inventario lleno con exito" }).status(200)
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


