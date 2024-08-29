
const mongoose = require('mongoose');
require('../models/userModel')

async function connectDB(){
    try{
      await mongoose.connect(process.env.MONGODB_URI) 


       console.log('connected to db')
      

    }catch(err){

    }
}

module.exports = connectDB