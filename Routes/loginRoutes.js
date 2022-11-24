//importing modules
const express = require('express')
const AuthController = require('../Controllers/authController')
// const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
// router.post('/signup', userAuth.saveUser, signup)

//login route
router.post("/login", AuthController.login )

module.exports = router