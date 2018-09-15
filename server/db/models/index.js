const user = require('./user')
const products = require('./products')
const order = require('./order')
const orderedProducts = require('./orderedProducts')
const category = require('./category')
const reviews = require('./reviews')

user.hasMany(reviews)
reviews.belongsTo(user)
user.hasMany(order)
order.belongsTo(user)
products.belongsToMany(category, {through: 'product_category'})
category.belongsToMany(products, {through: 'product_category'})
products.belongsToMany(order, {through: 'orderedProducts'})
order.belongsToMany(products, {through: 'orderedProducts'})
reviews.belongsTo(products)
products.hasMany(reviews)

module.exports = {
  user,
  products,
  order,
  orderedProducts,
  category,
  reviews
}
