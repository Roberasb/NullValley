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
    const { nickname, comentario, valoracion, candidato } = JSON.parse(event.body);

    if (candidato !== 'David Larousse' && candidato !== 'Jonathan Lowrie') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Candidato inválido. Debe ser "David Larousse" o "Jonathan Lowrie"'
        })
      };
    }

    await pool.query(
      'INSERT INTO votos (nickname, comentario, valoracion, candidato) VALUES (?, ?, ?, ?)',
      [nickname, comentario, valoracion, candidato]
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Voto registrado exitosamente' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al registrar voto',
        details: error.message
      })
    };
  }
};