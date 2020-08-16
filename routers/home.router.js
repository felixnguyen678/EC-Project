let express = require('express');
let router = express.Router();

let controller = require('../controllers/home.controller.js');

router.get('/', controller.index);

module.exports = router;
