const sequelize = require('sequelize')
const db = require('../db')

const Messages = db.define('messages', {
  text: {
    type: sequelize.STRING,
    allowNull: false
  },
  date: {
    type: sequelize.DATE
  },
  edited: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Messages
