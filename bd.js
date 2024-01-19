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

export { selectCadastrar };


async function selectAlterar() {
  const client = await connect();
  const res = await client.query("SELECT * FROM alterar");
  return res.rows;
}

export { selectAlterar };

async function selectServicos() {
  const client = await connect();
  const res = await client.query("SELECT * FROM alterar");
  return res.rows;
}

export { selectServicos };


