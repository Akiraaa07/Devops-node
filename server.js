const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para permitir requisições de outros domínios
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
    },
};

// Função para conectar ao banco de dados
async function getDBConnection() {
    try {
        return await sql.connect(dbConfig);
    } catch (error) {
        console.error('Erro na conexão com o banco de dados:', error);
        throw new Error('Falha ao conectar ao banco de dados');
    }
}

// Middleware para manipulação de erros
function handleError(res, error, message) {
    console.error(error);
    res.status(500).json({ success: false, message });
}

// Rota GET - Listar médicos
app.get('/api/medicos', async (req, res) => {
    try {
        const pool = await getDBConnection();
        const result = await pool.request().query('SELECT * FROM MEDICO');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        handleError(res, err, 'Erro ao buscar médicos');
    }
});

// Rota GET - Listar pacientes
app.get('/api/pacientes', async (req, res) => {
    try {
        const pool = await getDBConnection();
        const result = await pool.request().query('SELECT * FROM PACIENTE');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        handleError(res, err, 'Erro ao buscar pacientes');
    }
});

// Rota POST - Criar médico
app.post('/api/medicos', async (req, res) => {
    const { nome, email, crm, telefone } = req.body;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('crm', sql.VarChar, crm)
            .input('telefone', sql.VarChar, telefone)
            .query('INSERT INTO MEDICO (NOME, EMAIL, CRM, TELEFONE) VALUES (@nome, @email, @crm, @telefone)');
        res.status(201).json({ success: true, message: 'Médico criado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao criar médico');
    }
});

// Rota POST - Criar paciente
app.post('/api/pacientes', async (req, res) => {
    const { nome, email, data_nascimento, telefone, id_medico } = req.body;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('data_nascimento', sql.Date, data_nascimento)
            .input('telefone', sql.VarChar, telefone)
            .input('id_medico', sql.Int, id_medico)
            .query('INSERT INTO PACIENTE (NOME, EMAIL, DATA_NASCIMENTO, TELEFONE, ID_MEDICO) VALUES (@nome, @email, @data_nascimento, @telefone, @id_medico)');
        res.status(201).json({ success: true, message: 'Paciente criado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao criar paciente');
    }
});

// Rota PUT - Atualizar médico
app.put('/api/medicos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, crm, telefone } = req.body;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('crm', sql.VarChar, crm)
            .input('telefone', sql.VarChar, telefone)
            .query('UPDATE MEDICO SET NOME = @nome, EMAIL = @email, CRM = @crm, TELEFONE = @telefone WHERE ID_MEDICO = @id');
        res.json({ success: true, message: 'Médico atualizado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao atualizar médico');
    }
});

// Rota PUT - Atualizar paciente
app.put('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, data_nascimento, telefone, id_medico } = req.body;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('data_nascimento', sql.Date, data_nascimento)
            .input('telefone', sql.VarChar, telefone)
            .input('id_medico', sql.Int, id_medico)
            .query('UPDATE PACIENTE SET NOME = @nome, EMAIL = @email, DATA_NASCIMENTO = @data_nascimento, TELEFONE = @telefone, ID_MEDICO = @id_medico WHERE ID_PACIENTE = @id');
        res.json({ success: true, message: 'Paciente atualizado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao atualizar paciente');
    }
});

// Rota DELETE - Deletar médico
app.delete('/api/medicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM MEDICO WHERE ID_MEDICO = @id');
        res.json({ success: true, message: 'Médico deletado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao deletar médico');
    }
});

// Rota DELETE - Deletar paciente
app.delete('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getDBConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM PACIENTE WHERE ID_PACIENTE = @id');
        res.json({ success: true, message: 'Paciente deletado com sucesso' });
    } catch (err) {
        handleError(res, err, 'Erro ao deletar paciente');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});