const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller.js');

router.get('/login', controller.login);

router.get('/register', controller.register);

router.get('/mycourses', controller.mycourses);

router.post('/login', controller.postLogin);

router.post('/register', controller.postRegister);

module.exports = router;

