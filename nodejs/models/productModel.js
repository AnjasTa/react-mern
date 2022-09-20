
const mongoose  = require('mongoose');
const schema = mongoose.Schema;
const Products = new schema({
    productName:{type:String},
    productDescription:{type:String},
    productType:{type:String},
    price:{type:Number}
})

module.exports = mongoose.model('Products',Products)