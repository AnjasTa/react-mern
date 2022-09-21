const products = require("../models/productModel");
module.exports = {
  addProduct: (productData) => {
    return new Promise(async (resolve, reject) => {
      products.create(productData, (error, data) => {
        if (error) {
        } else {
          resolve(data);
        }
      });
    });
  },
  getProduct: () => {
    return new Promise(async (resolve, reject) => {
      products.find((error, data) => {
        if (error) {
        } else {
          resolve(data);
        }
      });
    });
  },
  deleteProduct : (deleteId) =>{
    return new Promise(async (resolve,reject)=>{
      products.findByIdAndDelete(deleteId.id,(error,data)=>{
        if(error){
          resolve(false)
        }
        else{
          resolve(true)
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
