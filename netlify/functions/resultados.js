const pool = require('./db-config');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    const [votos] = await pool.query('SELECT * FROM votos');
    return {
      statusCode: 200,
      body: JSON.stringify(votos)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener resultados' })
    };
  }
};