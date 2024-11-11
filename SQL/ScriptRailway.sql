-- Seleccionar la base de datos
USE railway;

-- Crear la tabla votos si no existe
CREATE TABLE IF NOT EXISTS votos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(8) NOT NULL,
  comentario VARCHAR(120) NOT NULL,
  valoracion INT NOT NULL,
  candidato ENUM('David Larousse', 'Jonathan Lowrie') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla votos_historico si no existe
CREATE TABLE IF NOT EXISTS votos_historico (
  vh_id_his INT AUTO_INCREMENT PRIMARY KEY,
  vh_created_at_his TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vh_id INT,
  vh_nickname VARCHAR(8) NOT NULL,
  vh_comentario VARCHAR(120) NOT NULL,
  vh_valoracion INT NOT NULL,
  vh_candidato VARCHAR(50) NOT NULL,
  vh_created_at TIMESTAMP
);
