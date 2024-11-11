const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 5,  // Reducido para Netlify
  queueLimit: 0,      // Sin límite de cola
  ssl: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,  // 10 segundos
  timezone: '+00:00',    // Asegura consistencia horaria
  multipleStatements: false  // Por seguridad
});

// Añadir listener para errores de conexión
pool.on('error', (err) => {
  console.error('Pool error:', err);
});

module.exports = pool;