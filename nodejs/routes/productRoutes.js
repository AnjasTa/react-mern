const {Router} = require('express');
const prod = require("../middlewares/productMiddleware")
const productController = require('../controllers/productController');
const router = Router();
router.post('/add-product',prod, productController.product_post);
module.exports = router