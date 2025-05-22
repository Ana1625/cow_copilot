const express = require('express');
const router = express.Router();
const registro_vacunasController = require('../controllers/registro_vacunasController');

//creamos ruta
router.post('/regRegistro_vacuna', registro_vacunasController.regRegistro_vacuna);
router.get('/obtenerRegistro_vacunas', registro_vacunasController.obtenerRegistro_vacunas);
router.put('/updateRegistro_vacunas/:id', registro_vacunasController.updateRegistro_vacuna);
router.delete('/deleteRegistro_vacuna/:id_razas', registro_vacunasController.deleteRegistro_vacuna);

module.exports = router;