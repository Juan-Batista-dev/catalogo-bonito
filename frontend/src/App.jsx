import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [negocios, setNegocios] = useState([])
  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [contato, setContato] = useState("")
  const [modo, setModo] = useState("usuario")
  const [busca, setBusca] = useState("")
  const [editandoId, setEditandoId] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [categoria_id, setCategoriaId] = useState("")

  // puxando Negocios do DB
const carregarNegocios = () => {
  fetch(`http://localhost:3001/negocios?busca=${busca}`)
    .then(res => res.json())
    .then(data => setNegocios(data))
}

useEffect(() => {
  const delay = setTimeout(() => {
    carregarNegocios()
  }, 300)

  return () => clearTimeout(delay)
}, [busca])

  // puxando Cetegorias do DB
const carregarCategorias = () => {
  fetch("http://localhost:3001/categorias")
    .then(res => res.json())
    .then(data => setCategorias(data))
}

useEffect(() => {
  carregarCategorias()
}, [])

  // cadastrar um novo negócio
  const cadastrar = () => {
    if (!nome || !categoria_id || !contato) {
      alert("Preencha todos os campos")
      return
    }



fetch("http://localhost:3001/negocios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nome,
    categoria_id,
    contato
  })
})
.then(() => {
  carregarNegocios()
  setNome("")
  setCategoria("")
  setContato("")
})
}

const excluir = (id) => {
  fetch(`http://localhost:3001/negocios/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    carregarNegocios()
  })
}

const editar = (negocio) => {
  setNome(negocio.nome)
  setCategoria(negocio.categoria)
  setContato(negocio.contato)
  setEditandoId(negocio.id)
}

const atualizar = () => {
  fetch(`http://localhost:3001/negocios/${editandoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      categoria_id,
      contato
    })
  })
  .then(() => {
    carregarNegocios()
    setNome("")
    setCategoria("")
    setContato("")
    setEditandoId(null)
  })
}

return (
  <div className="container">
    <h1>Catálogo de Negócios de Bonito-MS</h1>

    <div className="botoes">
      <button onClick={() => setModo("usuario")}>Usuário</button>
      <button onClick={() => setModo("admin")}>Admin</button>
    </div>

  {/* USUÁRIO */}
    {modo === "usuario" && (
      <div>
        <h2>Negócios disponíveis</h2>
        
        <label htmlFor="busca">Buscar um Negócio</label>
      
                <input
        placeholder="Buscar negócio..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            carregarNegocios()
          }
        }}
      />
        {negocios.map((negocio) => (
          <div key={negocio.id} className="card">
            <h3>{negocio.nome}</h3>
            <p><strong>Categoria:</strong> {negocio.categoria}</p>
            <p><strong>Contato:</strong> {negocio.contato}</p>
          </div>
        ))}
      </div>
    )}

    {/* ADMIN */}
    {modo === "admin" && (
      <div>
        <h2>Painel Administrativo</h2>

        <label htmlFor="Nome">Nome</label>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <label htmlFor="categoria">Categoria</label>
        <select
           id="categoria"
           value={categoria_id}
           onChange={e => setCategoriaId(e.target.value)}
>
        <option value="">Selecione uma categoria</option>

          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>

        <label htmlFor="Contato">Contato</label>
        <input
          placeholder="Contato"
          value={contato}
          onChange={e => setContato(e.target.value)}
        />

       {editandoId ? (
  <button onClick={atualizar}>Salvar Alterações</button>
) : (
  <button onClick={cadastrar}>Cadastrar</button>
)}

                <h2>Negócios disponíveis</h2>

                <label htmlFor="busca">Buscar um Negócio</label>
                <input
        placeholder="Buscar negócio..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            carregarNegocios()
          }
        }}
      />
        {negocios.map((negocio) => (
          <div key={negocio.id} className="card">
            <h3>{negocio.nome}</h3>
            <p><strong>Categoria:</strong> {negocio.categoria}</p>
            <p><strong>Contato:</strong> {negocio.contato}</p>
            <button onClick={() => excluir(negocio.id)}>Excluir</button>
            <button onClick={() => editar(negocio)}>Editar</button>
          </div>
        ))}
      </div>
    )}
  </div>
)
}


export default App 