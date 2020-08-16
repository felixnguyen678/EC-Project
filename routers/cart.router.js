let express=require('express');
let router = express.Router();

let controller = require('../controllers/cart.controller.js');

router.get('/', controller.cart);

router.get('/:id',controller.postCart);

router.get('/remove/:id', controller.removeCourse);

module.exports = router;