const express = require('express')
const path =require("path")
const cron=require('cors')
const connectDb = require("./config/db")
const dotenv = require('dotenv').config({ path: path.join(__dirname, "config/.env") })
const route = require('./routes/route')
// const multer = require('multer');

connectDb().then(() => {
  console.log("DataBase  Connected")
  app.listen(process.env.PORT, () => {

      console.log("server started " + process.env.PORT)
  })
}).catch(() => {
  console.log("DataBase Not Connected")
})



const app = express()
app.use(express.json())
app.use(cron())


app.use("/api", route)
