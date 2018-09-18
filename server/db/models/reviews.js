const db = require('../db')
const Sequelize = require('sequelize')

module.exports = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [10],
        msg: 'Minimum of 10 characters'
      }
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
      max: 5
    }
  }
})
