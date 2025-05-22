const express = require('express');
const router = express.Router();
const produccion_lecheController = require('../controllers/produccion_lecheController');

router.get('/obtener', produccion_lecheController.obtenerproduccion_leche);
router.post('/regproduccion_leche', produccion_lecheController.regproduccion_leche);
router.put('/updateproduccion_leche/:id_produccion', produccion_lecheController.updateproduccion_leche);
router.delete('/deleteproduccion_leche/:id_produccion', produccion_lecheController.deleteproduccion_leche);

module.exports = router;