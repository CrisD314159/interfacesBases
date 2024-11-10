export const crearEnvio = async (req, res) => {
    try {
        const {
            id_venta, id_direccion
        } = req.body
        const connection = await getConnection()
        const result = await connection.execute(`crearEnvio(:1,:2)`, [id_venta, id_direccion], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.json({ mensaje: "Compra agregada con exito" }).status(200)
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