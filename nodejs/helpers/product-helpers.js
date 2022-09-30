const products = require("../models/productModel");
module.exports = {
  addProduct: (productData) => {
    return new Promise(async (resolve, reject) => {
      products.create(productData, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data);
        }
      });
    });
  },
  getProduct: (data) => {
    let query = {};
    query = {userId:data.body.userId.toString()}
    let filter;
    if(data.query.name){
      filter = {productName:data.query.name.replaceAll('"', '')}
      query={...query,productName:data.query.name.replaceAll('"', '')}
    }
    return new Promise(async (resolve, reject) => {
      products.find(query,(error, data) => {
        if (error) {
        } else {
          resolve(data)
        }
      });
    });
  },
  deleteProduct : (deleteId) =>{
    return new Promise(async (resolve,reject)=>{
      products.findByIdAndDelete(deleteId.id,(error,data)=>{
        if(error){
          resolve({status:false})
        }
        else{
          resolve({status:true,info:data})
        }
      })
    })
  },
  updateProduct : (productData,updateId)=>{
    return new Promise (async (resolve,reject)=>{
      products.findByIdAndUpdate({_id:updateId.id},productData,{new:true},(error,data)=>{
        if(error){
          resolve(false)
        }
        else{
          resolve(true)
        }
      })
    })
  }
};



/*
 getProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      products.find({userId:id.userId.toString()}).populate({
        "path":'get-product',
        "match":{productName:"Nike"}
      }).exec((err,data)=>{
        if(err){
          console.log(err)
        }
        else{
          resolve(data)
        }
      })
    });
  },*/