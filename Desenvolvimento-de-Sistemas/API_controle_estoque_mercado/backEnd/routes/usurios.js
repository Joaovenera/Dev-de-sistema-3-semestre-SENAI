const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas para Mercados
router.get('/', usuarioController.getAllUsuarios);  // Listar todos os Mercados
router.get('/:id', usuarioController.getUsuarioById);  // Obter Mercado por ID
router.post('/', usuarioController.createUsuario);  // Criar um novo Mercado
router.put('/:id', usuarioController.updateUsuario);  // Atualizar um Mercado
router.delete('/:id', usuarioController.deleteUsuario);  // Deletar um Mercado

router.get('/login', usuarioController.loginUsuario);

module.exports = router;
