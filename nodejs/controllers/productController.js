
const productHelpers = require('../helpers/product-helpers');




module.exports.product_post = (req, res) => {
    productHelpers.addProduct(req.body).then((data)=>{
        res.send({status:'success',results:data,message:'successfull'})
    }).catch(err=>{
        if(err.errors.productName){
            res.status(400).send({status:'failed',error:err.errors.productName.message});
            return;
        }
        if(err.errors.price){
            res.status(400).send({status:'failed',error:err.errors.price.message})
            return;
        }
    })
  }

module.exports.product_fetch = (req,res)=>{
    productHelpers.getProduct().then((data)=>{
        res.status(200).send({status:'success',results:data,message:'data founded'})
    })
}

module.exports.product_delete = (req,res)=>{
    productHelpers.deleteProduct(req.params).then((data)=>{
        if(data.status==true){
            res.status(204).send({status:'success',results:data.info,message:"deleted successfully"})
        }
        else{
            res.status(400).send({status:'failed',message:"unsuccessfull"})
        }
    })
}

module.exports.product_update = (req,res)=>{
    if(req.body.productName=="" || req.body.productDescription==""||req.body.productType==""||req.body.price==""){
        res.status(400).send({status:'failed',message:'some field is missing'});
        return;
      }
    productHelpers.updateProduct(req.body,req.params).then((data)=>{
        if(data==true){
            res.status(204).send({status:'success',results:req.body,message:"update successfull"})
        }
        else{
            res.status(400).send({status:'failed',message:'update error'})
        }
    })
}