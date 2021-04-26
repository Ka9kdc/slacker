const sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  name: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Channel
