const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const usersRoutes = require('./routes/usuarios');
const ganadoRoutes = require('./routes/ganados');
const vacunaRoutes = require('./routes/vacunas');
const produccionlecheRoutes = require('./routes/produccion_leche');
const razasRoutes = require('./routes/razas');
const ventasRoutes = require('./routes/ventas');
const registro_vacunasRoutes = require('./routes/registro_vacunas');

app.use(cors());
app.use(express.json());
//api usuarios
app.use('/api/users', usersRoutes);

//api ganado
app.use('/api/ganados', ganadoRoutes);

//api vacuna
app.use('/api/vacunas', vacunaRoutes);

//api produccion_leche
app.use('/api/produccion_leche', produccionlecheRoutes);

//api razas
app.use('/api/razas', razasRoutes);

//api ventas
app.use('/api/ventas', ventasRoutes);

//api registro vacunas
app.use('/api/registro_vacunas', registro_vacunasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});