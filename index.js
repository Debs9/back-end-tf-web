import dotenv from "dotenv";
import express from "express";
import { selectUsuarios } from "./bd.js";
import { selectCadastrar } from "./bd.js";
import { selectAlterar } from "./bd.js";

dotenv.config();

const app = express(); // Instancia o Express
const port = 3000; // Define a porta

app.get("/", (req, res) => {
    console.log("Rota / solicitada");
    // Cria a rota da raiz do projeto
    res.json({
        nome: "Agendamento&Salão", // Substitua pelo seu nome
    });
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await selectUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

    console.log("Rota GET/usuarios solicitada");
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

app.listen(port, () => {
    // Um socket para "escutar" as requisições
    console.log(`Serviço escutando na porta:  ${port}`);
});