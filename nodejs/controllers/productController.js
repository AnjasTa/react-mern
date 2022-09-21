
const productHelpers = require('../helpers/product-helpers');




module.exports.product_post = (req, res) => {
    productHelpers.addProduct(req.body).then((data)=>{
        res.send({results:data,message:'successfull'})
    })
  }

module.exports.product_fetch = (req,res)=>{
    productHelpers.getProduct().then((data)=>{
        res.send({results:data,message:'successfull'})
    })
}

module.exports.product_delete = (req,res)=>{
    productHelpers.deleteProduct(req.params).then((data)=>{
        if(data==true){
            res.send({results:req.body,message:"deleted successfully"})
        }
        else{
            res.send({message:"unsuccessfull"})
        }
    })
}