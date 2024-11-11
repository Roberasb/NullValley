const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'zGEQQgcRJJVrFsEBrTuDPjQvnMdDzjCr',
  database: 'railway',
  port: '11366',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;