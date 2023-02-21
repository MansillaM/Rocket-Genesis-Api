const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI

const openMongoConnection = async () => {
  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB!");
    });
    mongoose.connect(uri);
};

mongoose.set('strictQuery', true)
module.exports = {openMongoConnection};