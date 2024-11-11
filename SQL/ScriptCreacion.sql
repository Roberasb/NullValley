-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS bd_null_valley;

-- Seleccionar la base de datos
USE bd_null_valley;

-- Crear la tabla votos si no existe
CREATE TABLE IF NOT EXISTS votos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(8) NOT NULL,
  comentario VARCHAR(120) NOT NULL,
  valoracion INT NOT NULL,
  candidato ENUM('david', 'jonathan') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear la tabla votos_historico si no existe
CREATE TABLE IF NOT EXISTS votos_historico (
  vh_id INT AUTO_INCREMENT PRIMARY KEY,
  vh_nickname VARCHAR(8) NOT NULL,
  vh_comentario VARCHAR(120) NOT NULL,
  vh_valoracion INT NOT NULL,
  vh_candidato ENUM('david', 'jonathan') NOT NULL,
  vh_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


