const {Router} = require('express');
const prod = require("../middlewares/productMiddleware")
const productController = require('../controllers/productController');
const router = Router();
router.post('/add-product',prod, productController.product_post);
router.get('/get-product',prod,productController.product_fetch);
router.delete('/delete-product/:id',prod,productController.product_delete)
module.exports = router;
