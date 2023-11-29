npm init -y
npm install express mongoose body-parser ejs

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/agendamento_procedimentos_db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function () {
    console.log('Conectado ao MongoDB');
});

const agendamentoSchema = new mongoose.Schema({
    nomeCliente: String,
    data: Date,
    hora: String,
    procedimento: String,
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint para obter procedimentos disponíveis
app.get('/procedimentos', (req, res) => {
    const procedimentosDisponiveis = [
        'Botox Capilar',
        'Escova Progressiva',
        'Design de Sobrancelha',
        'Selagem dos Fios',
        'Microblading',
        'Lipo Frequência',
    ];

    res.json(procedimentosDisponiveis);
});

// Endpoint para obter horários disponíveis em uma data específica
app.get('/horarios-disponiveis/:data', (req, res) => {
    // Lógica para obter os horários disponíveis na data fornecida
    // (pode variar dependendo das regras do seu negócio)
    const dataFornecida = new Date(req.params.data);
    const horariosDisponiveis = ['10:00', '14:00', '16:00', '18:00'];

    res.json(horariosDisponiveis);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/agendar', (req, res) => {
    // Obter procedimentos disponíveis para exibição no formulário
    res.render('agendar');
});

app.post('/agendar', async (req, res) => {
    const { nomeCliente, data, hora, procedimento } = req.body;

    // Verificar se o horário está disponível
    const agendamentosNaDataHora = await Agendamento.find({ data, hora });

    if (agendamentosNaDataHora.length > 0) {
        res.status(400).send('O horário selecionado não está disponível. Por favor, escolha outro horário.');
        return;
    }

    const novoAgendamento = new Agendamento({
        nomeCliente,
        data,
        hora,
        procedimento,
    });

    novoAgendamento.save((err) => {
        if (err) {
            console.error('Erro ao salvar o agendamento:', err);
            res.status(500).send('Erro ao agendar o procedimento');
        } else {
            res.status(200).redirect('/');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
