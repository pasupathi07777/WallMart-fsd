const mongoose = require('mongoose')

mongoose.set('strictQuery', true); // Or false, depending on your needs
const connectDb = async () => {
    mongoose.connect(process.env.DB_URL)
}

module.exports = connectDb