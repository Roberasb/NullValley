const pool = require('./db-config');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Manejar preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('Iniciando consulta a la base de datos');
    /*console.log('Configuración DB:', {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });*/

    // Primero probamos la conexión
    const connection = await pool.getConnection();
    console.log('Conexión establecida');

    try {
      const [votos] = await pool.query('SELECT * FROM votos');
      console.log(`Consulta exitosa: ${votos.length} registros encontrados`);
      connection.release();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(votos)
      };
    } catch (queryError) {
      connection.release();
      console.error('Error en la consulta:', queryError);
      throw queryError;
    }
  } catch (error) {
    console.error('Error completo:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      stack: error.stack
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al obtener votos',
        details: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage
      })
    };
  }
};
/*
 //Este codigo esta comentado porque me sirve para hacer pruebas, genera datos en duro para probar la respeusta.
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
