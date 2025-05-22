const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

//creamos ruta
router.post('/regVentas', ventasController.regVentas);
router.get('/obtenerVentas', ventasController.obtenerVentas);
router.put('/updateVentas/:id', ventasController.updateVentas);
router.delete('/deleteVenta/:id', ventasController.deleteVenta);

module.exports = router;