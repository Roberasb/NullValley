const pool = require('./db-config');

exports.handler = async function(event, context) {
  // Asegura que la función tenga tiempo suficiente para conectar
  context.callbackWaitsForEmptyEventLoop = false;
  
  console.log('Iniciando función resultados');
  
  try {
    // Test de conexión rápido
    const [testResult] = await pool.query('SELECT 1');
    console.log('Prueba de conexión exitosa');

    const [votos] = await pool.query('SELECT * FROM votos');
    console.log(`${votos.length} votos recuperados`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(votos)
    };
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error en base de datos',
        details: error.message,
        code: error.code
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