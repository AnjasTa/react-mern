
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

module.exports.product_update = (req,res)=>{
    productHelpers.updateProduct(req.body,req.params).then((data)=>{
        if(data==true){
            res.send({results:req.body,message:"update successfull"})
        }
        else{
            res.send({message:'update error'})
        }
    })
}