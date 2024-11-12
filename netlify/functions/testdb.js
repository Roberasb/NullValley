const pool = require('./db-config');

exports.handler = async function(event, context) {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Conexión exitosa a la base de datos' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error de conexión a la base de datos',
        details: error.message 
      })
    };
  }
};