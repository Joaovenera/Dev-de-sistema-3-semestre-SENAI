const db = require('../config/db');
const logger = require('../config/logger');

// Criar um novo mercado
exports.createMercado = async (req, res) => {
    const { nome, endereco } = req.body;
    try {
        const [result] = await db.query('INSERT INTO mercado (nome, endereco) VALUES (?, ?)', [nome, endereco]);
        const [rows] = await db.query('SELECT * FROM mercado WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
        logger.info(`Mercado criado com ID ${result.insertId}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao criar mercado: ${err.message}`);
    }
};

// Listar todos os mercados
exports.getAllMercados = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM mercado');
        res.json(rows);
        logger.info('Listagem de todos os mercados realizada');
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao listar mercados: ${err.message}`);
    }
};

// Atualizar um mercado
exports.updateMercado = async (req, res) => {
    const { nome, endereco } = req.body;
    try {
        const [result] = await db.query('UPDATE mercado SET nome = ?, endereco = ? WHERE id = ?', [nome, endereco, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Mercado não encontrado' });
        res.status(201).json({ message: 'Mercado atualizado com sucesso' });
        logger.info(`Mercado com ID ${req.params.id} atualizado`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao atualizar mercado: ${err.message}`);
    }
};

// Deletar um Mercado
exports.deleteMercado = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM mercado WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Mercado não encontrado' });
        res.json({ message: 'Mercado removido com sucesso' });
        logger.info(`Mercado com ID ${req.params.id} removido`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao remover mercado: ${err.message}`);
    }
};

// Obter um único mercado
exports.getMercadoById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM mercado WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Mercado não encontrado' });
        res.json(rows[0]);
        logger.info(`Consulta do mercado com ID ${req.params.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(`Erro ao buscar mercado: ${err.message}`);
    }
};
