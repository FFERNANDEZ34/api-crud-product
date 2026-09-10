const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Cliente = sequelize.define('Cliente',{
 id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  timestamps: true
}); 

module.exports = Cliente;