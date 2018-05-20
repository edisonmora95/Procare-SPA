const serverApp = () => {
  const express       = require('express')
  const path          = require('path')
  const cookieParser  = require('cookie-parser')
  const bodyParser    = require('body-parser')
  const session       = require('express-session')
  const passport      = require('passport');
  const LocalStrategy = require('passport-local').Strategy
  const flash         = require('connect-flash')

  const app = express()
  const server = require('http').Server(app)
  const PORT   = process.env.PORT || '8000'

  app.use(cookieParser())
  // Body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
  // Express Session
  app.use(session({
    secret: process.env.SECRET,
    resave: true,
    expire: 1 * 24 * 60 * 60 ,
    saveUninitialized: true,
    name : 'SID',
    unset: 'destroy'
  }))

  // Passport init
  app.use(passport.initialize())
  app.use(passport.session())

  const api = express()
  require('./app_api/api.server')(api)
  app.use('/api', api)

  const client = express()
  require('./app_client/client.server')(client)
  app.use('/', client)

  app.set('port', PORT)
  return { app, server }
}

module.exports = {
  serverApp
}

