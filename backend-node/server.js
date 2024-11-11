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
   await pool.query(
     'INSERT INTO votos (nickname, comentario, valoracion, candidato) VALUES (?, ?, ?, ?)',
     [nickname, comentario, valoracion, candidato]
   );
   res.json({ message: 'Voto registrado exitosamente' });
 } catch (error) {
   res.status(500).json({ error: 'Error al registrar voto' });
 }
});

// Reiniciar la votación
app.post('/api/reset', async (req, res) => {
 try {
   await pool.query('TRUNCATE TABLE votos');
   res.json({ message: 'Votación reiniciada exitosamente' });
 } catch (error) {
   res.status(500).json({ error: 'Error al reiniciar votación' });
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