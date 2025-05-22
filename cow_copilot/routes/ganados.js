const express = require('express');
const router = express.Router();
const ganadoControllers = require('../controllers/ganadoController');

//creamos ruta
router.post('/regGanado', ganadoControllers.regGanado);
router.get('/obtenerGanado', ganadoControllers.obtenerGanados);
router.put('/updateganado/:id', ganadoControllers.updateganado);
router.delete('/deleteganado/:id_ganados', ganadoControllers.deleteganado);

module.exports = router;