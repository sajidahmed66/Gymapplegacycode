const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const Message = require('../../models/Message')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

router.get('/messages', [auth, admin], async (req, res) => {
  const messages = await Message.find().sort({ _id: -1 })

  res.send(messages)
})

router.get('/messages/:id', [auth, admin], async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    return res.status(400).send('Message not found')
  }

  res.send(message)
})

router.post('/messages', [auth, admin], async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).send(error.details)
  }

  const { title, description, date, status } = req.body

  let message = new Message({
    title: title,
    description: description,
    date: date,
    status: status,
  })

  try {
    message = await message.save()
    const messages = await Message.find().sort({ _id: -1 })

    res.send(messages)
  } catch (ex) {
    for (const key in ex.errors) {
      res.status(404).send(ex.errors[key].message)
    }
  }
})

router.put('/messages/:id', [auth, admin], async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).send(error.details)
  }

  const { title, description, date, status } = req.body

  const message = await Message.findByIdAndUpdate(
    req.params.id,
    {
      title: title,
      description: description,
      date: date,
      status: status,
    },
    { new: true }
  )

  const messages = await Message.find().sort({ _id: -1 })
  res.send(messages)

  if (!message) {
    return res.status(400).send('Message does not exist')
  }
})

router.delete('/messages/:id', [auth, admin], async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id)

  if (!message) {
    return res.status(404).send('Message not found')
  }
  const messages = await Message.find().sort({ _id: -1 })
  res.send(messages)
})

//export

module.exports = router
