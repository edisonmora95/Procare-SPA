process.on('uncaughtException', (err) => {
  console.error('Caught exception: ' + err)
  console.error(err.stack)
})

const { serverApp } = require('./app')
let { server, app } = serverApp()
let models          = require('./app_api/models')
models.sequelize.sync()
  .then(() => {
    server.on('error', onError)
    server.on('listening', onListening)
    server.listen(app.get('port'))
  })

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const port = process.env.PORT
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.info(`${bind} correr en otro puerto, este puerto requiere permisos de root`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.info(`${bind} el puerto ya esta en uso client`)
      process.exit(1)
      break
    default:
      throw errorn
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `Pipe ${addr}`
    : `Port ${addr.port}`
  if (process.env.NODE_ENV !== 'testing') {
    console.info(`Server general corriendo en  ${bind}`)
  }
}