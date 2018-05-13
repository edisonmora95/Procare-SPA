const express = require('express')
const router  = express.Router()

router.get('/test', (req, res, next) => {
  console.log('Esto funciona')
  res.send({status: true})
})

module.exports = router