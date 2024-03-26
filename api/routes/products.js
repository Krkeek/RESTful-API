const express = require('express');
const router = express.Router();
const checkAuth = require('./middleware/check-auth')

const Product = require('./models/product');
const mongoose = require('mongoose');
const ProductController = require('./controllers/products.controller')


router.get('/', ProductController.products_get_all)
router.post('/',checkAuth, ProductController.add_product)
router.get('/:productId',checkAuth, ProductController.get_product_ById)
router.patch('/:productId', checkAuth, ProductController.update_product)
router.delete('/:productId',checkAuth, ProductController.delete_product)


module.exports = router;