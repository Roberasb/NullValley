const pool = require('./db-config');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Manejar preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    await pool.query('START TRANSACTION');

    await pool.query(`
      INSERT INTO votos_historico (vh_id, vh_nickname, vh_comentario, vh_valoracion, vh_candidato, vh_created_at)
      SELECT id, nickname, comentario, valoracion, candidato, created_at
      FROM votos
    `);

    await pool.query('TRUNCATE TABLE votos');
    await pool.query('COMMIT');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Votación reiniciada exitosamente' })
    };
  } catch (error) {
    await pool.query('ROLLBACK');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al reiniciar votación y respaldar datos',
        details: error.message
      })
    };
  }
};
