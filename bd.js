import pkg from "pg";
const { Pool } = pkg;

async function connect() {
    const pool = new Pool({
      connectionString: process.env.URL_BD,
    });
    return pool.connect();
  }

async function selectCadastrar() {
  const client = await connect();
  const res = await client.query("SELECT * FROM cadastrar");
  return res.rows;
}


async function selectAlterar() {
  const client = await connect();
  const res = await client.query("SELECT * FROM alterar");
  return res.rows;
}


async function selectServicos() {
  const client = await connect();
  const res = await client.query("SELECT * FROM servicos");
  return res.rows;
}


//bd.js
async function selectServico(id) {
  const client = await connect();
  const query = "SELECT * FROM servicos WHERE id = $1";
  const servico = [id];
  const res = await client.query(query, servico);
  return res.rows;
}


//bd.js
async function insertServico(data) {
  const client = await connect();
  const query = "INSERT INTO servicos (nome,preco,descricao) VALUES ($1,$2,$3) ";
  const servico = [data.nome, data.preco, data.descricao];
  await client.query(query, servico);
}


//bd.js
async function deleteServico(id) {
  const client = await connect();
  const query = "DELETE FROM servicos WHERE id = $1";
  await client.query(query, [id]);
}


//bd.js
async function updateServico(data) {
  const client = await connect();
  const query =
    "UPDATE servicos SET nome = $1, preco $2, descricao = $3 WHERE id = $4";
  const servico = [data.nome, data.preco, data.descricao, data.id];
  await client.query(query, servico);
}

export { updateServico, deleteServico, selectCadastrar, selectAlterar, selectServicos, insertServico, selectServico };
