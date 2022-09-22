const {Router} = require('express');
const prod = require("../middlewares/productMiddleware")
const productController = require('../controllers/productController');
const path = require('../Global/constants')
const router = Router();
router.post(path.routerPath.product.post,prod, productController.product_post);
router.get(path.routerPath.product.get,prod,productController.product_fetch);
router.delete(path.routerPath.product.delete,prod,productController.product_delete);
router.put(path.routerPath.product.put,prod,productController.product_update);
module.exports = router;
