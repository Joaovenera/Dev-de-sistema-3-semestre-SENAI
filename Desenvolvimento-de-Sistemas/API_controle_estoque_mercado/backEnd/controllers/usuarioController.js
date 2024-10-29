const db = require('../config/db');
const logger = require('../config/logger');

// Criar um novo mercado
exports.createUsuario = async (req, res) => {
    const { email, senha, endereco, nome } = req.body;
    try {
        const [result] = await db.query('INSERT INTO usuarios (email, senha, endereco, nome) VALUES (?, ?, ?, ?)', [email, senha, endereco, nome]);
        //const [rows] = await db.query('SELECT * FROM usurio WHERE id = ?', [result.insertId]);
        //res.status(201).json(rows[0]);
        logger.info(`usuario criado com ID ${result.insertId}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao criar usuario: ${err.message}`);
    }
};

// Listar todos os mercados
exports.getAllUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id,email FROM usuarios');
        res.json(rows);
        logger.info('Listagem de todos os usuarios realizada');
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao listar usuarios: ${err.message}`);
    }
};

// Atualizar um mercado
exports.updateUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [result] = await db.query('UPDATE usuarios SET email = ?, senha = ? WHERE id = ?', [email, senha, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        res.status(201).json({ message: 'Usuario atualizado com sucesso' });
        logger.info(`Usuario com ID ${req.params.id} atualizado`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao atualizar usuario: ${err.message}`);
    }
};

// Deletar um Mercado
exports.deleteUsuario = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        res.json({ message: 'Usuario removido com sucesso' });
        logger.info(`Usuario com ID ${req.params.id} removido`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao remover Usuario: ${err.message}`);
    }
};

// Obter um único mercado
exports.getUsuarioById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT usuarios FROM mercado WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuario não encontrado' });
        res.json(rows[0]);
        logger.info(`Consulta do Usuario com ID ${req.params.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao buscar usuario: ${err.message}`);
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);
        if (rows.length === 0) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        res.json(rows[0]);
        logger.info(`Login do usuário ${email} realizado com sucesso`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao realizar login: ${err.message}`);
    }
};

