export const afiliar = async (req, res) => {
    try {
        const {
            codigo, nombre, apellido, telefono, email
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("INSERT INTO Vendedor(id,nombre,apellido,telefono, email) VALUES(:codigo, :nombre, :apellido, :telefono, :email)")
        res.json({ mensaje: respuesta }).status(200)
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


export const obtenerVendedor = async (req, res) => {
    try {
        const {codigo} = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("SELECT codigo, nombre, apellido, telefono, email FROM Vendedor WHERE codigo = :codigo")
        res.json({ mensaje: respuesta }).status(200)
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


export const obtenerVendedores = async (req, res) => {
    try {
        const connection = await getConnection()
        const respuesta = await connection.execute("SELECT codigo, nombre, apellido, telefono, email FROM Vendedor")
        res.json(respuesta.rows)
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


export const actualizarVendedor = async (req, res) => {
    try {
        const {
            codigo, telefono, email
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("UPDATE Vendedor SET telefono=:telefono, email=:email WHERE codigo=:codigo")
        res.json({mensaje:respuesta}).status(200)
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


export const eliminarVendedor = async (req, res) => {
    try {
        const {
            codigo
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("DELETE FROM Vendedor WHERE codigo=:codigo")
        res.json({mensaje:respuesta}).status(200)
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


export const obtenerNivel = async (req, res) => {
    try {
        const {
            codigo
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("SELECT nivel FROM Vendedor WHERE id=:codigo")
        res.json({mensaje:respuesta}).status(200)
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
