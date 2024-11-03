export const afiliar = async (req, res) => { // este es un metodo sincrono

    try {
        const {
            cedula, nombre, telefono, idReferido
        } = req.body
        const connection = await getConnection()
        const respuesta = connection.execute("query")
        res.json({ mensaje: respuesta }).status
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