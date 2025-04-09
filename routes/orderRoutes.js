const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/place', orderController.placeOrder);
router.get('/', orderController.getOrders);
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;
