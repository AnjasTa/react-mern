const productHelpers = require("../helpers/product-helpers");
const productMessages = require("../Global/constants");

module.exports.product_post = (req, res) => {
  productHelpers
    .addProduct(req.body)
    .then((data) => {
      res.send({
        status: productMessages.productMessages.postProduct.status.yes,
        results: data,
        message: productMessages.productMessages.postProduct.success,
      });
    })
    .catch((err) => {
      if (err.errors.productName) {
        res
          .status(400)
          .send({
            status: productMessages.productMessages.postProduct.status.no,
            error: err.errors.productName.message,
          });
        return;
      }
      if (err.errors.price) {
        res
          .status(400)
          .send({
            status: productMessages.productMessages.postProduct.status.no,
            error: err.errors.price.message,
          });
        return;
      }
    });
};

module.exports.product_fetch = (req, res) => {
  productHelpers.getProduct().then((data) => {
    res
      .status(200)
      .send({
        status: productMessages.productMessages.getProduct.status.yes,
        results: data,
        message: productMessages.productMessages.getProduct.message,
      });
  });
};

module.exports.product_delete = (req, res) => {
  productHelpers.deleteProduct(req.params).then((data) => {
    if (data.status == true) {
      res
        .status(201)
        .send({
          status: productMessages.productMessages.deleteProduct.status.yes,
          results: data.info,
          message: productMessages.productMessages.deleteProduct.message.yes,
        });
    } else {
      res
        .status(400)
        .send({
          status: productMessages.productMessages.deleteProduct.status.no,
          message: productMessages.productMessages.deleteProduct.message.no,
        });
    }
  });
};

module.exports.product_update = (req, res) => {
  if (
    req.body.productName == "" ||
    req.body.productDescription == "" ||
    req.body.productType == "" ||
    req.body.price == ""
  ) {
    res
      .status(400)
      .send({
        status: productMessages.productMessages.editProduct.status.no,
        message: productMessages.productMessages.editProduct.message.fieldError,
      });
    return;
  }
  productHelpers.updateProduct(req.body, req.params).then((data) => {
    if (data == true) {
      res
        .status(201)
        .send({
          status: productMessages.productMessages.editProduct.status.yes,
          results: req.body,
          message: productMessages.productMessages.editProduct.message.success,
        });
    } else {
      res
        .status(400)
        .send({
          status: productMessages.productMessages.editProduct.status.no,
          message: productMessages.productMessages.editProduct.message.error,
        });
    }
  });
};
