require('dotenv').config();
const mysql = require('mysql2/promise');

// Valores de conexión
const dbConfig = {
  host: process.env.DB_HOST || 'autorack.proxy.rlwy.net',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'zGEQQgcRJJVrFsEBrTuDPjQvnMdDzjCr',
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || '11366',
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
};

/*
console.log('Configuración de BD:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port
});
*/
const pool = mysql.createPool(dbConfig);

// Añadir listener para errores de conexión
pool.on('error', (err) => {
  console.error('Pool error:', err);
});

module.exports = pool;