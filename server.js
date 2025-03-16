const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config(); // Carregar variáveis de ambiente

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados JSON
app.use(express.json());

// Configuração da conexão ao banco de dados
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,  // Para Azure
        trustServerCertificate: false, // Configuração necessária para segurança
        enableArithAbort: true,
    },
};

// Endpoint para buscar médicos
app.get('/api/medicos', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM MEDICO');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

// Endpoint para buscar pacientes
app.get('/api/pacientes', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM PACIENTE');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

// Endpoint para criar um médico
app.post('/api/medicos', async (req, res) => {
    const { nome, email, crm, telefone } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('crm', sql.VarChar, crm)
            .input('telefone', sql.VarChar, telefone)
            .query('INSERT INTO MEDICO (NOME, EMAIL, CRM, TELEFONE) VALUES (@nome, @email, @crm, @telefone)');
        res.status(201).send('Médico criado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar médico');
    }
});

// Endpoint para criar um paciente
app.post('/api/pacientes', async (req, res) => {
    const { nome, email, data_nascimento, telefone, id_medico } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('data_nascimento', sql.Date, data_nascimento)
            .input('telefone', sql.VarChar, telefone)
            .input('id_medico', sql.Int, id_medico)
            .query('INSERT INTO PACIENTE (NOME, EMAIL, DATA_NASCIMENTO, TELEFONE, ID_MEDICO) VALUES (@nome, @email, @data_nascimento, @telefone, @id_medico)');
        res.status(201).send('Paciente criado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar paciente');
    }
});

// Endpoint para atualizar um médico
app.put('/api/medicos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, crm, telefone } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('crm', sql.VarChar, crm)
            .input('telefone', sql.VarChar, telefone)
            .query('UPDATE MEDICO SET NOME = @nome, EMAIL = @email, CRM = @crm, TELEFONE = @telefone WHERE ID_MEDICO = @id');
        res.status(200).send('Médico atualizado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar médico');
    }
});

// Endpoint para atualizar um paciente
app.put('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, data_nascimento, telefone, id_medico } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('data_nascimento', sql.Date, data_nascimento)
            .input('telefone', sql.VarChar, telefone)
            .input('id_medico', sql.Int, id_medico)
            .query('UPDATE PACIENTE SET NOME = @nome, EMAIL = @email, DATA_NASCIMENTO = @data_nascimento, TELEFONE = @telefone, ID_MEDICO = @id_medico WHERE ID_PACIENTE = @id');
        res.status(200).send('Paciente atualizado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar paciente');
    }
});

// Endpoint para deletar um médico
app.delete('/api/medicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM MEDICO WHERE ID_MEDICO = @id');
        res.status(200).send('Médico deletado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar médico');
    }
});

// Endpoint para deletar um paciente
app.delete('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM PACIENTE WHERE ID_PACIENTE = @id');
        res.status(200).send('Paciente deletado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar paciente');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});