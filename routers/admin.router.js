let express=require('express');
let router = express.Router();

let controller = require('../controllers/admin.controller.js');

router.get('/', controller.index);

module.exports = router;