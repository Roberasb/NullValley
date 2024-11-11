const pool = require('./db-config');

exports.handler = async function(event, context) {
  console.log('Iniciando función resultados');
  console.log('Variables de entorno:', {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const connection = await pool.getConnection();
    console.log('Conexión a BD exitosa');
    
    try {
      const [votos] = await connection.query('SELECT * FROM votos');
      console.log(`Consulta exitosa: ${votos.length} registros encontrados`);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(votos)
      };
    } catch (queryError) {
      console.error('Error en la consulta:', queryError);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Error en la consulta',
          message: queryError.message
        })
      };
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: 'Error de conexión a la base de datos',
        message: error.message,
        config: {
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT
        }
      })
    };
  }
};

/* Este codigo esta comentado porque me sirve para hacer pruebas, genera datos en duro para probar la respuesta.
exports.handler = async function(event, context) {
  console.log("Función resultados ejecutándose");
  
  try {
    // Datos de prueba estáticos
    const datosTest = [
      {
        id: 1,
        nickname: "Test1",
        comentario: "Comentario test 1",
        valoracion: 5,
        candidato: "David Larousse"
      },
      {
        id: 2,
        nickname: "Test2",
        comentario: "Comentario test 2",
        valoracion: 4,
        candidato: "Jonathan Lowrie"
      }
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(datosTest)
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en la función" })
    };
  }
};

*/