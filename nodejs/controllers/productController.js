
const productHelpers = require('../helpers/product-helpers');
module.exports.product_post = (req, res) => {
    productHelpers.addProduct(req.body).then((data)=>{
        res.send({results:data,message:'successfull'})
    })
  }