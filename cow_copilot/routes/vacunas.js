const express = require('express');
const router = express.Router();
const vacunaController = require('../controllers/vacunaController');

router.post('/regVacuna', vacunaController.regVacuna);
router.get('/obtenerVacuna', vacunaController.obtenerVacunas);
router.put('/editarVacuna/:id', vacunaController.updateVacunas);
router.delete('/deleteVacuna/:id_vacunas', vacunaController.deletevacuna);

module.exports = router;