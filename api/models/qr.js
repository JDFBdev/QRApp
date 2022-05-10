const { DataTypes } = require('sequelize');
const db = require('../db');

const QR = db.define('qr', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

QR.sync({ force: false });

module.exports = QR;