const router = require('express').Router()
const {user} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await user.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    const data = { email, password, isAdmin }

    const newUser = await user.create(data)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId

    await user.update({
      isAdmin: req.body.isAdmin
    }, {
      where: {
        id,
      }
    })

    const updatedUser = await user.findById(id)
    res.json(updatedUser)
  } catch(err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId

    await user.destroy({
      where: {
        id
      }
    })

    const removedUser = await user.findAll()

    res.json(removedUser)
  } catch (err) {
    next(err)
  }
})
