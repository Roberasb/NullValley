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



/* para tener data pre pacargada */
CREATE TABLE votos_respaldo (
  nickname varchar(8) NOT NULL,
  comentario varchar(120) NOT NULL,
  valoracion int NOT NULL,
  candidato enum('David Larousse','Jonathan Lowrie') NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

-- data
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario1', 'comentario con mazanas y manzana rojo', '2', 'David Larousse', '2024-11-12 00:26:10');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario2', 'Buen combate. saludos.', '2', 'Jonathan Lowrie', '2024-11-12 01:02:30');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario3', 'hola, dejo mi comentario y voto', '-1', 'David Larousse', '2024-11-12 01:02:55');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario4', 'yo voy por el participante rojo', '2', 'David Larousse', '2024-11-12 01:03:41');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario5', 'yo le doy mi voto al participante azul, pero es negativo', '-1', 'Jonathan Lowrie', '2024-11-12 01:04:04');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario6', 'hola, no se quienes son pero dejo mi votación.', '2', 'Jonathan Lowrie', '2024-11-12 01:04:51');
INSERT INTO votos_respaldo (nickname,comentario,valoracion,candidato,created_at) VALUES ('usuario7', 'buenas tardes, vengo a dejar plasmada mi elección. me parece una forma justa de elegir un ganador en nuestra comunidad.', '2', 'David Larousse', '2024-11-12 01:05:40');



-- SP
DELIMITER //

CREATE PROCEDURE `restaurar_data_pruebas2`()
BEGIN
    /* sp para restaurar data */
    TRUNCATE TABLE votos;

    INSERT INTO votos (nickname, comentario, valoracion, candidato, created_at)
    SELECT nickname, comentario, valoracion, candidato, created_at
    FROM votos_respaldo;
END //

DELIMITER ;