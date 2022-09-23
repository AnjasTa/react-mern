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
  getProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      products.find({userId:id.userId.toString()},(error, data) => {
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
