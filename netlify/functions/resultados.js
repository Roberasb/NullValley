const pool = require('./db-config');

exports.handler = async function(event, context) {
  console.log('Iniciando función resultados');
  
  try {
    const connection = await pool.getConnection();
    console.log('Conexión obtenida exitosamente');

    try {
      // Intenta ejecutar la consulta
      const [votos] = await connection.query('SELECT * FROM votos');
      console.log('Consulta ejecutada exitosamente');
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Permite CORS
        },
        body: JSON.stringify(votos)
      };
    } catch (queryError) {
      console.error('Error en la consulta:', queryError);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Error al ejecutar la consulta',
          details: queryError.message
        })
      };
    } finally {
      // Siempre libera la conexión
      connection.release();
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al conectar con la base de datos',
        details: error.message,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      })
    };
  }
};