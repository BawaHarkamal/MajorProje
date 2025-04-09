const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request');

router.post('/create', requestController.createRequest);
router.get('/', requestController.getRequests);
router.put('/:id', requestController.updateRequestStatus);

module.exports = router;
