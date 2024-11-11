const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la base de datos, datos de conexion para nos subir el .env
const pool = mysql.createPool({
 host: process.env.DB_HOST || 'localhost',
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD || 'rootpsw',
 database: process.env.DB_NAME || 'bd_null_valley',
 waitForConnections: true,
 connectionLimit: 10
});

// Obtener todos los votos y resultados actuales
app.get('/api/resultados', async (req, res) => {
 try {
   const [votos] = await pool.query('SELECT * FROM votos');
   res.json(votos);
 } catch (error) {
   res.status(500).json({ error: 'Error al obtener resultados' });
 }
});

// Registrar un nuevo voto
app.post('/api/votar', async (req, res) => {
  try {
    const { nickname, comentario, valoracion, candidato } = req.body;
    
    // Validación del candidato
    if (candidato !== 'David Larousse' && candidato !== 'Jonathan Lowrie') {
      return res.status(400).json({ 
        error: 'Candidato inválido. Debe ser "David Larousse" o "Jonathan Lowrie"' 
      });
    }

    await pool.query(
      'INSERT INTO votos (nickname, comentario, valoracion, candidato) VALUES (?, ?, ?, ?)',
      [nickname, comentario, valoracion, candidato]
    );
    
    res.json({ message: 'Voto registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al registrar voto',
      details: error.message 
    });
  }
});


// Reiniciar la votación (con histórico)
app.post('/api/reset', async (req, res) => {
  try {
    // Iniciamos la transacción
    await pool.query('START TRANSACTION');

    // Insertamos en el histórico
    await pool.query(`
      INSERT INTO votos_historico (vh_id, vh_nickname, vh_comentario, vh_valoracion, vh_candidato, vh_created_at)
      SELECT id, nickname, comentario, valoracion, candidato, created_at
      FROM votos
    `);

    // Truncamos la tabla de votos
    await pool.query('TRUNCATE TABLE votos');

    // Confirmamos la transacción
    await pool.query('COMMIT');

    res.json({ 
      message: 'Votación reiniciada exitosamente' 
    });
  } catch (error) {
    // Si hay error, revertimos
    await pool.query('ROLLBACK');
    console.error('Error en reset:', error);
    res.status(500).json({ 
      error: 'Error al reiniciar votación y respaldar datos',
      details: error.message 
    });
  }
});


// Para probar la conexion a la base de datos 
app.get('/api/testdb', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      connection.release();
      
      // Si llegamos aquí, la conexión fue exitosa
      res.json({ 
        status: 'success',
        message: 'Conexión a base de datos exitosa',
        dbConfig: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME
        }
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: 'Error al conectar con la base de datos',
        error: error.message,
        dbConfig: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME
        }
      });
    }
   });

const PORT = process.env.PORT || 5000; //puerto 5000
app.listen(PORT, () => {
 console.log(`Servidor corriendo en puerto ${PORT}`);
});