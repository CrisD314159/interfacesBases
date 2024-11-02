import oracleDB from "oracledb";


const dbConfig = {
  user: 'system',
  password: '12345678',
  connectString: 'localhost:1521/xe'
};


export async function getConnection() {
  try {
    const connection = await oracleDB.getConnection(dbConfig);
    console.log('Conexión a Oracle exitosa');
    return connection;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
}


// ejemplo de uso de la base de datos


async function getDatos() {
  let connection;
  
  try {
    connection = await getConnection();

    const result = await connection.execute(`SELECT * FROM tabla`);
    console.log('Resultado', result.rows);

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