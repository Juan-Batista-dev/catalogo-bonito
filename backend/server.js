const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'catalogo_bonito'
})

// LISTAR (COM BUSCA)
app.get('/negocios', (req, res) => {
  const busca = req.query.busca || ""

  const sql = `
    SELECT * FROM negocios
    WHERE nome LIKE ? OR categoria LIKE ?
  `
  console.log("BUSCA:", busca)
  db.query(sql, [`%${busca}%`, `%${busca}%`], (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
// CADASTRAR
app.post('/negocios', (req, res) => {
  const { nome, categoria, contato } = req.body

  db.query(
    'INSERT INTO negocios (nome, categoria, contato) VALUES (?, ?, ?)',
    [nome, categoria, contato],
    (err, result) => {
      if (err) return res.send(err)
      res.send('Cadastrado com sucesso')
    }
  )
})

//EXCLUIR
app.delete('/negocios/:id', (req, res) => {
  const { id } = req.params

  db.query(
    'DELETE FROM negocios WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.send(err)
      res.send('Negócio excluído')
    }
  )
})
//UPDATE
app.put('/negocios/:id', (req, res) => {
  const { id } = req.params
  const { nome, categoria, contato } = req.body

  db.query(
    'UPDATE negocios SET nome = ?, categoria = ?, contato = ? WHERE id = ?',
    [nome, categoria, contato, id],
    (err, result) => {
      if (err) return res.send(err)
      res.send('Negócio atualizado')
    }
  )
})

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})

