const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.loginUsuario);
router.post('/cadastrar', usuarioController.createUsuario);



// // Rotas para Mercados
// router.get('/', usuarioController.getAllUsuarios);  // Listar todos os Mercados
// router.get('/:id', usuarioController.getUsuarioById);  // Obter Mercado por ID
// router.post('/', usuarioController.createUsuario);  // Criar um novo Mercado
// router.put('/:id', usuarioController.updateUsuario);  // Atualizar um Mercado
// router.delete('/:id', usuarioController.deleteUsuario);  // Deletar um Mercado



module.exports = router;
