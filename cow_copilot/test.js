const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api/users/obtener', (req, res) => {
  console.log('Ruta /api/users/obtener accedida');
  res.json({ usuarios: ['Juan', 'Ana'] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});