'use strict'

const db = require('../server/db')
const {
  user,
  products,
  order,
  orderedProducts,
  category,
  reviews
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    user.create({email: 'cody@email.com', password: '123', isAdmin: true,}),
    user.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all([
    category.create({id: 1, type: 'Basic'}),
    category.create({id: 2, type: 'Animal'}),
    category.create({id: 3, type: 'Cute'}),
    category.create({id: 4, type: 'Horror'}),
    category.create({id: 5, type: 'Festival'})
  ])

  const Products = await Promise.all([
    products.create({
      id: 1,
      name: 'Bear Mask',
      imageUrl: 'bearmask.jpg',
      description: 'this is a strong mask as like a tiger',
      quantity: 50,
      price: 2.02
    }),
    products.create({
      id: 2,
      name: 'Christmas Mask',
      imageUrl: 'christmasmask.jpg',
      description: 'lets wear this mask on our Christmas party',
      quantity: 20,
      price: 4.04
    }),
    products.create({
      id: 3,
      name: 'Black Mask',
      imageUrl: 'blackmask.jpg',
      description: 'very slimming',
      quantity: 33,
      price: 5.04
    }),
    products.create({
      id: 4,
      name: 'Hello Kitty Mask',
      imageUrl: 'hellokittymask.jpg',
      description: 'Hello Kitty (full name: Kitty White (キティ・ホワイト Kiti Howaito)) is a fictional cartoon character produced by the Japanese company Sanrio',
      quantity: 22,
      price: 100.04
    }),
    products.create({
      id: 5,
      name: 'Abstract Art Mask',
      imageUrl: 'abstractmask.jpg',
      description: 'very post modern',
      quantity: 2,
      price: 2.04
    })
  ])

  const orders = await Promise.all([
    order.create({
      id: 1,
      status: 'order placed',
      email: 'silver@myfirst.com',
      userId: 2
    }),
    order.create({
      id: 2,
      status: 'order in process',
      email: 'bronze@mysecond.com',
      userId: 2
    }),
    order.create({
      id: 3,
      status: 'order is out for delivery',
      email: 'gold@mythird.com',
      userId: 2
    }),
    order.create({
      id: 4,
      status: 'order completed',
      email: 'platinum@myfinal.com',
      userId: 2
    })
  ])

  const OrderedProducts = await Promise.all([
    orderedProducts.create({
      quantity: 5,
      price: 10.1,
      productId: 1,
      orderId: 1
    }),
    orderedProducts.create({
      quantity: 3,
      price: 6.06,
      productId: 1,
      orderId: 2
    }),
    orderedProducts.create({
      quantity: 2,
      price: 8.08,
      productId: 2,
      orderId: 3
    }),
    orderedProducts.create({quantity: 1, price: 4.04, productId: 2, orderId: 4})
  ])



  const Review = await Promise.all([
    reviews.create({
      title: 'I like this!!!!',
      comments:
        'It is so fantastic.  All of my classmates like this and they also would like to buy this :)  TRY THIS!!!',
      rating: 5,
      productId: 1,
      userId: 1
    }),
    reviews.create({
      title: 'I highly recommend',
      comments:
        'It is so fantastic.  All of my classmates like this and they also would like to buy this :)  TRY THIS!!!',
      rating: 5,
      productId: 1,
      userId: 2
    }),
    reviews.create({
      title: 'OMG.....',
      comments:
        'It is the worst mask I have ever been.  The delievery had been late without any notice, customer service are not kind and they do not want to take their responsiblity.',
      rating: 1,
      productId: 2,
      userId: 2
    }),
    reviews.create({
      title: 'I like this!!!!1',
      comments:
        'It is so fantastic.  All of my classmates like this and they also would like to buy this :)  TRY THIS!!!',
      rating: 5,
      productId: 3,
      userId: 1
    }),
    reviews.create({
      title: 'I highly recommend2',
      comments:
        'It is so fantastic.  All of my classmates like this and they also would like to buy this :)  TRY THIS!!!',
      rating: 5,
      productId: 4,
      userId: 2
    })
  ])

  await Promise.all(
    Products.map(async product => {
      await product.addCategories((Math.floor(Math.random() * 5) + 1  ));
    }))
  await Promise.all(
    Products.map(async product => {
      await product.addCategories((Math.floor(Math.random() * 5) + 1  ));
    }))


  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${Products.length} users`)
  console.log(`seeded ${orders.length} users`)
  console.log(`seeded ${OrderedProducts.length} users`)
  console.log(`seeded ${categories.length} users`)
  console.log(`seeded ${Review.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
