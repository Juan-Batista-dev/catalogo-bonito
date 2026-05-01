CREATE DATABASE catalogo_bonito;

USE catalogo_bonito;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE negocios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  categoria_id INT,
  contato VARCHAR(100),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);