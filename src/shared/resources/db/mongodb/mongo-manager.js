const mongoose = require('mongoose')
require('dotenv').config()

const openMongoConnection = () => {
  return mongoose.connect('mongodb+srv://Matias:p6kkCOLCAsXOFDwK@matiasm.vrug6cd.mongodb.net/Rocket-Genesis-Api?retryWrites=true&w=majority')
  .then(()=>console.log('connected to MongoDB'))
  .catch((err) => console.log(err))
};

mongoose.set('strictQuery', true)
module.exports = {openMongoConnection};