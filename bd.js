//bd.js
import pkg from "pg";
const { Pool } = pkg;

//bd.js
async function connect() {
    const pool = new Pool({
      connectionString: process.env.URL_BD,
    });
    return pool.connect();
  }

  //bd.js
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