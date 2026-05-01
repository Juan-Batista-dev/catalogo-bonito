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

### 2. Backend

```bash
cd backend
npm install
node server.js
```

O servidor será iniciado em:
http://localhost:3001

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:
http://localhost:5173

---

## Banco de dados

O projeto utiliza MySQL.

É necessário criar um banco chamado:

```sql
catalogo_bonito
```

E uma tabela chamada:

```sql
CREATE TABLE negocios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  categoria VARCHAR(255),
  contato VARCHAR(255)
);
```

---

## Autor

Juan Ruiz Batista
