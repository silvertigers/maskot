const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('order', {
  status: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  sessionId: {
    type: Sequelize.INTEGER
  }
})
