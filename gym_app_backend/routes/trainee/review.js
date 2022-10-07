const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const trainee = require('../../middleware/trainee')
const Review = require('../../models/Review')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

//Routes

router.get('/review/me', [auth, trainee], async (req, res) => {
  const review = await Review.findOne({ traineeId: req.user.id }).populate(
    'traineeId',
    ['firstname', 'lastname']
  )
  res.send(review)
})

router.post('/review', [auth, trainee], async (req, res) => {
  const schema = Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).send(error.details)
  }

  const { rating, comment } = req.body

  let alreadyReviewed = await Review.findOne({traineeId:req.user.id})

  if (alreadyReviewed) {
    return res.status(400).send('You Already Reviewed')
  }

  let review = new Review({
    traineeId: req.user.id,
    rating: rating,
    comment: comment,
  })

  try {
    review = await review.save()
    res.send(review)
  } catch (ex) {
    for (const key in ex.errors) {
      res.status(404).send(ex.errors[key].message)
    }
  }
})

//export

module.exports = router
