
const mongoose  = require('mongoose');
const validation = require('../Global/constants')
const schema = mongoose.Schema;
const Products = new schema({
    productName:{type:String,required:[true,validation.dataBase.validationErrors.productname]},
    productDescription:{type:String},
    productType:{type:String},
    price:{type:Number,required:[true,validation.dataBase.validationErrors.price]},
    image:{type:String},
    userId:{type:String}
})

module.exports = mongoose.model('Products',Products)