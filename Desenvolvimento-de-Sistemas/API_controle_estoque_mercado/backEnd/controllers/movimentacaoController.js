// movimentacaoController.js
const db = require('../config/db');

// Registrar uma movimentação de estoque
exports.createMovimentacao = async (req, res) => {
  const { tipo, quantidade, data_movimentacao } = req.body;
  try {
    const [result] = await db.query('INSERT INTO movimentacao (id_produto, tipo, quantidade, data_movimentacao) VALUES (?, ?, ?, ?)', 
      [req.params.id_produto, tipo, quantidade, data_movimentacao]
    );
    const [rows] = await db.query('SELECT * FROM movimentacao WHERE id_produto = ?',[req.params.id_produto]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as movimentações de um produto
exports.getMovimentacoesByProduto = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movimentacao WHERE id_produto = ?',[req.params.id_produto]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
