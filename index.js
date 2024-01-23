import dotenv from "dotenv";
import express from "express";
import { selectCadastrar } from "./bd.js";
import { selectAlterar } from "./bd.js";
import { selectServicos } from "./bd.js";
import { selectServico } from "./bd.js";
import { insertServico } from "./bd.js";
import { deleteServico } from "./bd.js";
import { updateServico } from "./bd.js";


dotenv.config();

const app = express(); // Instancia o Express
const port = 3000; // Define a porta
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Rota / solicitada");
    // Cria a rota da raiz do projeto
    res.json({
        nome: "Agendamento&Salão", // Substitua pelo seu nome
    });
});

app.get("/servicos", async (req, res) => {
    try {
        const servicos = await selectServicos();
        res.json(servicos);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

    console.log("Rota GET/servicos solicitada");
});


app.get("/alterar", async (req, res) => {
    try {
        const alterar = await selectAlterar();
        res.json(alterar);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

    console.log("Rota GET/alterar solicitada");
});

app.get("/cadastrar", async (req, res) => {
    try {
        const cadastrar = await selectCadastrar();
        res.json(cadastrar);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

    console.log("Rota GET/cadastrar solicitada");
});

app.get("/servico", async (req, res) => {
    try {
        const servico = await selectServico();
        res.json(servico);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

    console.log("Rota GET/servico solicitada");
});

//index.js
app.get("/servico/:id", async (req, res) => {
    console.log("Rota GET /servico solicitada");
    try {
      const servico = await selectServico(req.params.id);
      if (servico.length > 0) res.json(servico);
      else res.status(404).json({ message: "servico não cadastrado!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

//index.js
app.post("/servico", async (req, res) => {
    console.log("Rota POST /servico solicitada");
    try {
      await insertServico(req.body);
      res.status(201).json({ message: "Serviço inserido com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  //index.js
app.delete("/servico/:id", async (req, res) => {
    console.log("Rota DELETE /servico solicitada");
    try {
      const servico = await selectServico(req.params.id);
      if (servico.length > 0) {
        await deleteServico(req.params.id);
        res.status(200).json({ message: "Serviço excluido com sucesso!!" });
      } else res.status(404).json({ message: "Serviço não cadastrado!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  //index.js
app.put("/servico", async (req, res) => {
    console.log("Rota PUT /servico solicitada");
    try {
      const servico = await selectServico(req.body.id);
      if (servico.length > 0) {
        await updateServico(req.body);
        res.status(200).json({ message: "Serviço atualizado com sucesso!" });
      } else res.status(404).json({ message: "Serviço não cadastrado!" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });

  app.listen(port, () => {
    // Um socket para "escutar" as requisições
    console.log(`Serviço escutando na porta:  ${port}`);
});
