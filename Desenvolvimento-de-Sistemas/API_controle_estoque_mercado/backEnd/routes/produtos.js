const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController');

// Rotas para produtos
router.get('/:id_mercado/produtos', produtoController.getProdutosByMercadoId);  // listar produtos de um mercado específico
router.get('/:id_mercado/produtos/:id', produtoController.getProdutosByMercadoIdAndById);  // Obter produto por ID
router.post('/:id_mercado/produtos', produtoController.createProdutoByMercadoId);  // Criar um novo produto
router.put('/:id_mercado/produtos/:id', produtoController.updateProdutoByMercadoId);  // Atualizar um produto
router.delete('/:id_mercado/produtos/:id', produtoController.deleteProdutoByMercadoId);  // Deletar um produto

module.exports = router;
