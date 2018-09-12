const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('category', {
  type: Sequelize.STRING
})
