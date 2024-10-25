// movimentacao.js
const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');

// Registrar uma movimentação de estoque
router.post('/:id_mercado/produtos/:id_produto/movimentacoes', movimentacaoController.createMovimentacao);

// Listar todas as movimentações de um produto
router.get('/:id_mercado/produtos/:id_produto/movimentacoes', movimentacaoController.getMovimentacoesByProduto);

module.exports = router;
