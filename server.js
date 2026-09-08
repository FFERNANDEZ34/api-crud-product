const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const prodCtrl = require('./controllers/producto.controller');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.get('/api/productos', prodCtrl.getTodos);
app.get('/api/productos/:id', prodCtrl.getOne);
app.post('/api/productos', prodCtrl.crear);
app.put('/api/productos/:id', prodCtrl.actualizar);
app.delete('/api/productos/:id', prodCtrl.eliminar);

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
});