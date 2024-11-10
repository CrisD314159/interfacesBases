import { getConnection } from "oracledb";

export const login = async (req, res) => {
    try{
        const {
            email, contrasenia
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("login(:1, :2)", [email, contrasenia], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })
        res.json({ mensaje: respuesta }).status(200)
    } catch (err) {
        console.error("Error al ejecutarla consulta: ", err)
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


export const crearVendedor = async (req, res) => {
    try {
        const {
            id, nombre, apellido, telefono, email, id_referido, id_direccion, id_nivel, estado
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("INSERT INTO Vendedor VALUES(:1, :2, :3, :4, :5, :6, :7, :8, :9)", [id, nombre, apellido, telefono, email, id_referido, id_direccion, id_nivel, estado], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })
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
        const respuesta = await connection.execute("SELECT * FROM Vendedor WHERE id = :1",[codigo], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })

        const rs = result.resultSet; 
        let rows = []; 
        let row;

        while ((row = await rs.getRow())) { 
            rows.push(row); 
        }

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
        const respuesta = await connection.execute("SELECT * FROM Vendedor", [], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })

        const rs = result.resultSet; 
        let rows = []; 
        let row;

        while ((row = await rs.getRow())) { 
            rows.push(row); 
        }

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
            id, nombre, apellido, telefono, email, id_direccion, id_nivel, estado
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("llamar el procedimiento",[id, nombre, apellido, telefono, email, id_direccion, id_nivel, estado], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })
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

export const actualizarNivelVendedor = async (req, res) => {
    try {
        const {
            id, id_nivel
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("UPDATE Vendedor SET id_nivel =:2 WHERE id=:1",[], { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })
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

//Borrado logico, unicamente modifica el estado del vendedor de activo a inactivo
export const eliminarVendedor = async (req, res) => {
    try {
        const {
            id, estado_nuevo
        } = req.body
        const connection = await getConnection()
        const respuesta = await connection.execute("UPDATE FROM Vendedor SET estado=:2 WHERE id=:1", [id, estado_nuevo],  { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT })
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
