const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const {user} = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook app ID / secret not found. Skipping Facebook Oauth')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  }

  const strategy = new FacebookStrategy(
    facebookConfig,
    (accessToken, refreshToken, profile, done) => {
      const facebookId = profile.id
      const name = profile.displayName
      console.log('PROFILE', profile)
      const email = profile.emails[0].value

      user
        .findOrCreate({
          where: {facebookId},
          defaults: {name, email}
        })
        .spread(user => done(null, user))
        .catch(done)
    }
  )
  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
