
const mongoose  = require('mongoose');
const schema = mongoose.Schema;
const Products = new schema({
    productName:{type:String,required:[true,'product name is required']},
    productDescription:{type:String},
    productType:{type:String},
    price:{type:Number,required:[true,'price is required']}
})

module.exports = mongoose.model('Products',Products)