const express = require('express');
const router = express.Router();
const razasController = require('../controllers/razasController');

//creamos ruta
router.post('/regRazas', razasController.regRazas);
router.get('/obtenerRazas', razasController.obtenerRazas);
router.put('/updateRazas/:id', razasController.updateRazas);
router.delete('/deleteRaza/:id_razas', razasController.deleteRaza);

module.exports = router;