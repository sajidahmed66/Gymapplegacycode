const traineeMessage = require('./routes/trainee/message')
const adminMessage = require('./routes/admin/message')

const adminReview = require('./routes/admin/review')
const traineeReview = require('./routes/trainee/review')

const productSell = require('./routes/admin/productSell')
const product = require('./routes/admin/product')

const trainerTraineeProfile = require('./routes/trainer/traineeProfile')

const exerciseRequestLimitTrainee = require('./routes/trainee/exerciseRequestLimit')
const dietRequestLimitTrainee = require('./routes/trainee/dietRequestLimit')

const traineeImage = require('./routes/trainee/traineeImage')
const trainerTraineeImages = require('./routes/trainer/traineeImages')

const exerciseRequestLimit = require('./routes/admin/exerciseRequestLimit')
const dietRequestLimit = require('./routes/admin/dietRequestLimit')

const traineeInstallment = require('./routes/admin/installment')

const trainerPayment = require('./routes/trainer/payment')
const admintrainerPayment = require('./routes/admin/trainerPayment')

const traineePayment = require('./routes/trainee/payment')
const adminPayment = require('./routes/admin/payment')
const package = require('./routes/admin/package')

const traineeDietHistory = require('./routes/trainee/traineeDietHistory')
const traineeExerciseHistory = require('./routes/trainee/traineeExerciseHistory')

const expense = require('./routes/admin/expense')

const trainerTraineeDiet = require('./routes/trainer/traineeDiet')
const adminTraineeDiet = require('./routes/admin/traineeDiet')
const traineeDiet = require('./routes/trainee/traineeDiet')

const trainerTraineeExercise = require('./routes/trainer/traineeExercise')
const adminTraineeExercise = require('./routes/admin/traineeExercise')
const traineeExercise = require('./routes/trainee/traineeExercise')

const adminDiet = require('./routes/admin/diet')
const trainerDiet = require('./routes/trainer/diet')

const adminExercise = require('./routes/admin/exercise')
const trainerExercise = require('./routes/trainer/exercise')

const adminProfile = require('./routes/admin/profile')
const trainerProfile = require('./routes/trainer/profile')
const traineeProfile = require('./routes/trainee/profile')

const adminAuth = require('./routes/admin/auth')
const trainerAuth = require('./routes/trainer/auth')
const traineeAuth = require('./routes/trainee/auth')

const admin = require('./routes/admin/admins')
const trainer = require('./routes/admin/trainers')
const trainee = require('./routes/admin/trainees')

const path = require('path')
const cors = require('cors')
const connectDB = require('./config/db')
const express = require('express')
const app = express()

require('./startup/prod')(app)

//Connect DB

connectDB()

//Middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/uploads/', express.static('uploads/'))

//Route

app.use('/api/admin', trainee)
app.use('/api/admin', trainer)
app.use('/api/admin', admin)

app.use('/api/trainee', traineeAuth)
app.use('/api/trainer', trainerAuth)
app.use('/api/admin', adminAuth)

app.use('/api/trainee', traineeProfile)
app.use('/api/trainer', trainerProfile)
app.use('/api/admin', adminProfile)

app.use('/api/admin', adminExercise)
app.use('/api/trainer', trainerExercise)

app.use('/api/admin', adminDiet)
app.use('/api/trainer', trainerDiet)

app.use('/api/trainee', traineeExercise)
app.use('/api/admin', adminTraineeExercise)
app.use('/api/trainer', trainerTraineeExercise)

app.use('/api/trainee', traineeDiet)
app.use('/api/admin', adminTraineeDiet)
app.use('/api/trainer', trainerTraineeDiet)
app.use('/api/trainer', trainerTraineeImages)

app.use('/api/admin', expense)

app.use('/api/trainee', traineeExerciseHistory)
app.use('/api/trainee', traineeDietHistory)

app.use('/api/admin', package)
app.use('/api/admin', adminPayment)
app.use('/api/trainee', traineePayment)

app.use('/api/admin', admintrainerPayment)
app.use('/api/trainer', trainerPayment)

app.use('/api/admin', traineeInstallment)

app.use('/api/admin', dietRequestLimit)
app.use('/api/admin', exerciseRequestLimit)

app.use('/api/trainee', traineeImage)

app.use('/api/trainee', dietRequestLimitTrainee)
app.use('/api/trainee', exerciseRequestLimitTrainee)

app.use('/api/trainer', trainerTraineeProfile)

app.use('/api/admin', product)
app.use('/api/admin', productSell)

app.use('/api/trainee', traineeReview)
app.use('/api/admin', adminReview)

app.use('/api/admin', adminMessage)
app.use('/api/trainee', traineeMessage)

//Serve static assets in production

// if (process.env.NODE_ENV==='production') {
//     app.use(express.static('gym_app_admin/build'))

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'gym_app_admin','build','index.html'))
//     })
// }

//Port Connection

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
