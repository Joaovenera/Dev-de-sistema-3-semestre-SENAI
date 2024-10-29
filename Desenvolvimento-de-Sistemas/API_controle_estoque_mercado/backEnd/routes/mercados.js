const express = require('express');
const router = express.Router();
const mercadoController = require('../controllers/mercadosController');
//const produtos = require('./produtos');

// Rotas para Mercados
router.get('/', mercadoController.getAllMercados);  // Listar todos os Mercados
router.get('/:id', mercadoController.getMercadoById);  // Obter Mercado por ID
router.post('/', mercadoController.createMercado);  // Criar um novo Mercado
router.put('/:id', mercadoController.updateMercado);  // Atualizar um Mercado
router.delete('/:id', mercadoController.deleteMercado);  // Deletar um Mercado

module.exports = router;
