const mongoose = require('mongoose')

mongoose.set('strictQuery', true); 
const connectDb = async () => {
    mongoose.connect(process.env.DB_URL)
}

module.exports = connectDb