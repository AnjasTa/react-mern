
const products = require("../models/productModel");
module.exports = {
  addProduct: (productData) => {
    return new Promise(async (resolve, reject) => {
        products.create(productData,(error,data)=>{
            if(error){
                
            }
            else{
                resolve(data)
            }
        })
    });
  }
};
