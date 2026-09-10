const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Asegúrate de incluir el puerto aquí
    dialect: 'mysql',
    logging: false,
    // AGREGA ESTE BLOQUE DIALECTOPTIONS PARA AIVEN:
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Permite conectar de forma segura sin descargar el archivo .pem físicamen
      }
    }
  }
);

module.exports = sequelize;