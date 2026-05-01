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

//LISTAR CATEGORIAS
app.get('/categorias', (req, res) => {
  db.query('SELECT * FROM categorias', (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// LISTAR (COM BUSCA)
app.get('/negocios', (req, res) => {
  const busca = req.query.busca || ""

  const sql = `
    SELECT 
      n.id,
      n.nome,
      n.contato,
      IFNULL(c.nome, 'Sem categoria') AS categoria,
      n.categoria_id
    FROM negocios n
    LEFT JOIN categorias c ON c.id = n.categoria_id
    WHERE n.nome LIKE ? OR c.nome LIKE ?
  `

  db.query(sql, [`%${busca}%`, `%${busca}%`], (err, result) => {
    if (err) {
      console.log("ERRO SQL:", err)
      return res.status(500).json([])
    }
    res.json(result)
  })
})

// CADASTRAR
app.post('/negocios', (req, res) => {
  const { nome, categoria_id, contato } = req.body

  db.query(
    'INSERT INTO negocios (nome, categoria_id, contato) VALUES (?, ?, ?)',
    [nome, categoria_id, contato],
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
  const { nome, categoria_id, contato } = req.body

  db.query(
    'UPDATE negocios SET nome = ?, categoria_id = ?, contato = ? WHERE id = ?',
    [nome, categoria_id, contato, id],
    (err, result) => {
      if (err) return res.send(err)
      res.send('Negócio atualizado')
    }
  )
})

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})

