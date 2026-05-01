# Catálogo de Negócios de Bonito-MS

## Sobre o projeto

Eu desenvolvi esse projeto com o objetivo de criar um catálogo digital de pequenos negócios da cidade de Bonito-MS. A ideia é facilitar a divulgação desses negócios e permitir que usuários encontrem serviços de forma simples.

O sistema possui um painel administrativo onde é possível cadastrar, editar e excluir negócios, além de uma área de visualização para os usuários.

---

## Tecnologias utilizadas

* React (frontend)
* Node.js + Express (backend)
* MySQL (banco de dados)
* Vite

---

## Funcionalidades

* Cadastro de negócios
* Listagem de negócios
* Busca por nome ou categoria
* Edição de informações
* Exclusão de registros

---

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Juan-Batista-dev/catalogo-bonito.git
```

---

### 2. Banco de dados

Certifique-se de que o MySQL esteja em execução.

Execute o arquivo `database.sql` que está no projeto para criar o banco de dados e as tabelas.

Caso prefira, você pode executar manualmente:

```sql
CREATE DATABASE IF NOT EXISTS catalogo_bonito;

USE catalogo_bonito;

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS negocios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria_id INT NOT NULL,
  contato VARCHAR(100) NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

INSERT INTO categorias (nome) VALUES
('Alimentação'),
('Transporte'),
('Turismo'),
('Serviços');
```

---

### 3. Backend

```bash
cd backend
npm install
node server.js
```

O servidor será iniciado em: http://localhost:3001

Caso necessário, altere as credenciais do banco no arquivo `backend/server.js`.

---

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

---

## Banco de dados

O sistema utiliza duas tabelas principais: `categorias` e `negocios`.

A tabela `negocios` possui uma chave estrangeira (`categoria_id`) que referencia a tabela `categorias`. Isso foi feito para evitar duplicidade de categorias e manter os dados organizados.

---

## Autor

Juan Ruiz Batista
