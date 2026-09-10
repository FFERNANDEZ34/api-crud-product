const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const prodCtrl = require('./controllers/producto.controller');
const cliCtrl = require('./controllers/cliente.controller');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.get('/api/productos', prodCtrl.getTodos);
app.get('/api/productos/:id', prodCtrl.getOne);
app.post('/api/productos', prodCtrl.crear);
app.put('/api/productos/:id', prodCtrl.actualizar);
app.delete('/api/productos/:id', prodCtrl.eliminar);

app.get('/api/clientes', cliCtrl.getTodos);
app.get('/api/clientes/:id', cliCtrl.getOne);
app.post('/api/clientes', cliCtrl.crear);
app.put('/api/clientes/:id', cliCtrl.actualizar);
app.delete('/api/clientes/:id', cliCtrl.eliminar);

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
});