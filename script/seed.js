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
    user.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    user.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all([
    category.create({type: 'Basic'}),
    category.create({type: 'Animal'}),
    category.create({type: 'Cute'}),
    category.create({type: 'Horror'}),
    category.create({type: 'Festival'})
  ])

  const Products = await Promise.all([
    products.create({
      name: 'Bear Mask',
      imageUrl: 'bearmask.jpg',
      description: 'this is a strong mask as like a tiger',
      quantity: 50,
      price: 202
    }),
    products.create({
      name: 'Christmas Mask',
      imageUrl: 'christmasmask.jpg',
      description: 'lets wear this mask on our Christmas party',
      quantity: 20,
      price: 404
    }),
    products.create({
      name: 'Flower mask',
      imageUrl: 'bearmask.jpg',
      description: 'Perfect for a spring day',
      quantity: 15,
      price: 375
    }),
    products.create({
      name: 'Black Mask',
      imageUrl: 'blackmask.jpg',
      description: 'very slimming',
      quantity: 33,
      price: 504
    }),
    products.create({
      name: 'Hello Kitty Mask',
      imageUrl: 'hellokittymask.jpg',
      description:
        'Hello Kitty (full name: Kitty White (キティ・ホワイト Kiti Howaito)) is a fictional cartoon character produced by the Japanese company Sanrio',
      quantity: 22,
      price: 10004
    }),
    products.create({
      name: 'Abstract Art Mask',
      imageUrl: 'abstractmask.jpg',
      description: 'very post modern',
      quantity: 2,
      price: 204
    }),
    products.create({
      name: 'Celeb Mask',
      imageUrl: 'http://gdimg.gmarket.co.kr/1474908105/still/600?ver=1533540687',
      description: 'It made by new material, protect from air dust, pollution.  It can be re-use more than 3',
      quantity: 80,
      price: 440
    }),
    products.create({
      name: 'Cleanacts Sand Dust Mask',
      imageUrl: 'http://gdimg.gmarket.co.kr/914130759/still/600?ver=1531472805',
      description: `Don't be afraid to go outside.  Just prepare this mask to protect from the sand dust to keep breath clean air anywhere`,
      quantity: 58,
      price: 2290,
    }),
    products.create({
      name: 'Line Sand Dust Mask',
      imageUrl: 'http://www.epanchok.co.kr/shop_images/ga/a/16/1416651536574550_l.jpg',
      description: 'You will enjoy the famouse Line charactors.  It will perfectly protect from air dust as well',
      quantity: 116,
      price: 1170
    }),
    products.create({
      name: 'Cool Fashion Mask',
      imageUrl: 'http://www.epanchok.co.kr/shop_images/ga/a/16/1374291526536576_l.jpg',
      description: 'First created by Fullseed, it is solid model to keep comfortable and fit on to your face',
      quantity: 10,
      price: 1750
    }),
    products.create({
      name: 'Dust disinfection Art Mask',
      imageUrl: 'http://www.epanchok.co.kr/shop_images/ga/a/16/1330981517533359_l.jpg',
      description: 'This is certified and follow regulations by FDA',
      quantity: 1430,
      price: 204
    }),
    products.create({
      name: 'Kids Dust Mask',
      imageUrl: 'http://www.epanchok.co.kr/shop_images/ga/a/16/1330991517533378_l.jpg',
      description: `Don't just let you children play outside without this mask.  Keep your childred anytime safe in anywhere`,
      quantity: 341,
      price: 1360
    }),
    products.create({
      name: '3M NEckscare 3 filter Mask for kids',
      imageUrl: 'http://www.epanchok.co.kr/shop_images/ga/a/16/1326441517018639_l.jpg',
      description: 'Winter kingdom pattron color.  3 filters make keep out dust perfectly',
      quantity: 2,
      price: 1040
    }),
    products.create({
      name: 'Ato Golf Multi Mask',
      imageUrl: 'http://image.gsshop.com/image/30/44/30448741_L1.jpg',
      description: 'This is golf mask for hide from the sun light',
      quantity: 90,
      price: 1430
    }),
    products.create({
      name: 'Dongkuk Sand Dust Mask',
      imageUrl: 'http://image.gsshop.com/image/29/21/29210902_L1.jpg',
      description: 'This is certified by KPDA',
      quantity: 473,
      price: 4090
    }),
    products.create({
      name: 'Disposable triple filtering Mask',
      imageUrl: 'http://image.gsshop.com/image/25/73/25737722_L1.jpg',
      description: 'It is surgical disposable mask',
      quantity: 1542,
      price: 390
    }),
    products.create({
      name: 'J-Reve Fresh Mask',
      imageUrl: 'http://image.gsshop.com/image/32/75/32752836_L1.jpg',
      description: 'A Fashon Mask',
      quantity: 203,
      price: 2045
    }),
    products.create({
      name: 'J Big UV protection Mask for women',
      imageUrl: 'http://image.gsshop.com/image/31/49/31499587_L1.jpg',
      description: 'It is UV protect mask for women',
      quantity: 2342,
      price: 1605
    }),
    products.create({
      name: 'KF94 Sand Dust Mask for Kid',
      imageUrl: 'http://image.gsshop.com/image/25/60/25601085_L1.jpg',
      description: `Don't just let you children play outside without this mask.  Keep your childred anytime safe in anywhere`,
      quantity: 293,
      price: 2690
    }),
    products.create({
      name: 'Chess Golf UV prorection Mask',
      imageUrl: 'http://image.gsshop.com/mi09/deal/dealno/314/201879183541013.jpg',
      description: 'This is golf mask for hide from the UV',
      quantity: 154,
      price: 374
    }),
    products.create({
      name: 'LG PraL Duma LED Mask(steel pink)',
      imageUrl: 'http://image.gsshop.com/image/31/90/31907356_L1.jpg',
      description: 'Red LED and IR RED will give your skin more tension and young',
      quantity: 34,
      price: 20034
    }),
    products.create({
      name: 'AATO UV prorection Mask',
      imageUrl: 'http://image.gsshop.com/image/29/59/29594816_L1.jpg',
      description: 'This is golf mask for hide from the sun light',
      quantity: 263,
      price: 2040
    }),
    products.create({
      name: 'Four Nine easy breath Mask',
      imageUrl: 'http://image.gsshop.com/image/10/73/10731596_L1.jpg',
      description: 'It is designed easily breath as like not wearing the mask',
      quantity: 532,
      price: 905
    }),
    products.create({
      name: 'Body Luv Zero Dust Mask KF94',
      imageUrl: 'http://image.gsshop.com/image/31/30/31308231_L1.jpg',
      description: `Don't just let you children play outside without this mask.  Keep your childred anytime safe in anywhere`,
      quantity: 183,
      price: 1490
    }),
    products.create({
      name: '3D Mask for kids',
      imageUrl: 'http://image.gsshop.com/image/29/03/29037709_L1.jpg',
      description: `Don't just let you children play outside without this mask.  Keep your childred anytime safe in anywhere`,
      quantity: 92,
      price: 1690
    }),
  ])

  const orders = await Promise.all([
    order.create({
      status: 'placed',
      email: 'silver@myfirst.com',
      userId: 2
    }),
    order.create({
      status: 'in process',
      email: 'bronze@mysecond.com',
      userId: 2
    }),
    order.create({
      status: 'cancelled',
      email: 'gold@mythird.com',
      userId: 2
    }),
    order.create({
      status: 'completed',
      email: 'platinum@myfinal.com',
      userId: 2
    }),
    order.create({
      status: 'placed',
      email: 'silver@myfirst.com',
      userId: 2
    })
  ])

  const OrderedProducts = await Promise.all([
    orderedProducts.create({
      quantity: 5,
      price: 101,
      productId: 1,
      orderId: 1
    }),
    orderedProducts.create({
      quantity: 3,
      price: 606,
      productId: 1,
      orderId: 2
    }),
    orderedProducts.create({
      quantity: 2,
      price: 808,
      productId: 2,
      orderId: 3
    }),
    orderedProducts.create({
      quantity: 1,
      price: 404,
      productId: 2,
      orderId: 4
    }),
    orderedProducts.create({
      quantity: 10,
      price: 4040,
      productId: 2,
      orderId: 5
    })
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
      await product.addCategories(Math.floor(Math.random() * 5) + 1)
    })
  )
  await Promise.all(
    Products.map(async product => {
      await product.addCategories(Math.floor(Math.random() * 5) + 1)
    })
  )

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
