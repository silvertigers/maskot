const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('orderedProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})
