const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const trainee = require('../../middleware/trainee')
const Message = require('../../models/Message')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

router.get('/messages', [auth, trainee], async (req, res) => {
  const messages = await Message.find({status:1}).sort({ _id: -1 })

  res.send(messages)
})



//export

module.exports = router
