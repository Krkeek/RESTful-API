const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('./models/order');
const Product = require('./models/product');
const checkAuth = require('./middleware/check-auth')
const OrdersController = require('./controllers/orders.controller')


router.get('/',checkAuth,OrdersController.order_get_all)
router.post('/',checkAuth, OrdersController.add_order)
router.get('/:orderId',checkAuth, OrdersController.get_order_ById)
router.delete('/:orderId',checkAuth,OrdersController.delete_order)

module.exports = router;