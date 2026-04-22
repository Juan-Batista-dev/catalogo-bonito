CREATE DATABASE catalogo_bonito;

USE catalogo_bonito;

CREATE TABLE negocios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 categoria VARCHAR(100),
 contato VARCHAR(100)
);