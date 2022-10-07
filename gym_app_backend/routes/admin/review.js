const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const Review = require('../../models/Review')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

router.get('/reviews', [auth, admin], async (req, res) => {
  const reviews = await Review.find()
    .sort({ _id: -1 })
    .populate('traineeId', ['firstname', 'lastname','phone'])
  res.send(reviews)
})


//export

module.exports = router
