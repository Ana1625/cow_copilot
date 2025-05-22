const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');

router.get('/obtener', usuarioControllers.getUser);
router.post('/regUsuario', usuarioControllers.registrarUsuario);
router.put('/updateUsuario/:id', usuarioControllers.updateusuarios);
router.delete('/deleteUsuario/:id_usuarios', usuarioControllers.deleteusuario);


module.exports = router;