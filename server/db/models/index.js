const user = require('./user')
const products = require('./products')
const order = require('./order')
const orderedProducts = require('./orderedProducts')
const category = require('./category')
// const review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// user.hasMany(review)
// review.belongsTo(user)
user.hasMany(order)
order.belongsTo(user)
// order.belongsTo(sessions)
products.belongsToMany(category, {through: 'product_category'})
category.belongsToMany(products, {through: 'product_category'})
products.belongsToMany(order, {through: 'orderedProducts'})
order.belongsToMany(products, {through: 'orderedProducts'})
// review.belongsTo(products)
// products.hasMany(review)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  user,
  products,
  order,
  orderedProducts,
  category
}
