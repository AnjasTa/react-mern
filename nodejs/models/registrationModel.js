
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../configuration/config')

const schema = mongoose.Schema;
const Registration = new schema({
firstname:{type:String},
lastname : {type:String},
email : {type:String},
phonenumber : {type:Number},
password : {type:String}
})

Registration.methods.generateAuthToken = (async(id)=>{
    const token = await jwt.sign({_id:id.toString()}, jwtKey)
    return token;
})
  


module.exports = mongoose.model('Registration',Registration)