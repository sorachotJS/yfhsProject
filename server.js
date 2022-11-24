//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
 const db = require('./services/db')
//  const userRoutes = require ('./Routes/userRoutes')
const loginRoutes = require("./Routes/loginRoutes")
 const createError = require("http-errors");

//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const cors = require("cors");
app.use(cors());


app.get("/", async (req, res, next) => {
    res.send("Hello from express.");
  });
  
app.use('/api/auth', loginRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))