-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS catalogo_bonito;

-- Usa o banco
USE catalogo_bonito;

-- Cria a tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Cria a tabela de negócios com chave estrangeira
CREATE TABLE IF NOT EXISTS negocios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria_id INT NOT NULL,
  contato VARCHAR(100) NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- Insere categorias iniciais (evita duplicar se rodar mais de uma vez)
INSERT INTO categorias (nome) VALUES
('Alimentação'),
('Transporte'),
('Turismo'),
('Serviços');