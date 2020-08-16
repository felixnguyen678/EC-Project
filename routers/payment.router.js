const express = require('express');
const router = express.Router();
const controller = require('../controllers/payment.controller.js');

router.post('/', controller.payment);

router.get('/success', controller.success);

router.get('/cancel', controller.cancel);

module.exports = router;
