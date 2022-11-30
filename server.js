//importing modules
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const cors = require("cors");

const loginRoutes = require("./Routes/loginRoutes");
const assessmentRoutes = require("./Routes/assessmentRoutes")
const fileRoutes = require("./Routes/fileRoutes")
// const uploadFile = require("./Middlewares/upload");
require("./Database/models");


//setting up your port
const PORT = process.env.PORT;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", async (req, res, next) => {
  res.send("Hello from express.");
});

app.use("/api/v1", loginRoutes);
app.use("/api/v1", assessmentRoutes);
app.use("/api/v1", fileRoutes);




//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
