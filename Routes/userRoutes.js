//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { getAllUser } = userController
// const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
// router.post('/signup', userAuth.saveUser, signup)

//login route
router.get('/login', getAllUser )

module.exports = router