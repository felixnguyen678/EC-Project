let express = require('express');
let router = express.Router();

let controller = require('../controllers/course.controller.js');
function ucwords(str) {
    str = str.replace('-', ' ');
    str = (str + '').toLowerCase();
    return str.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}
router.get('/', (req, res, next) => {
    controller
        .index(req, res)
        .catch(error => next(error));
});
router.get('/courses', (req, res, next) => {
    controller
        .index(req, res)
        .catch(error => next(error));
});
router.get('/detail/:page', (req, res, next) => {
    let page = req.params.page;
    controller
        .detail(req, res)
        .catch(error => next(error));
});
router.get('/web-development/:page', (req, res, next) => {
    req.params.name = 'Web Development';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/data-science/:page', (req, res, next) => {
    req.params.name = 'Data Science';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/mobile-apps/:page', (req, res, next) => {
    req.params.name = 'Mobile Apps';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/game-development/:page', (req, res, next) => {
    req.params.name = 'Game Development';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/progamming-languages/:page', (req, res, next) => {
    req.params.name = 'Progamming-Languages';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/databases/:page', (req, res, next) => {
    req.params.name = 'Databases';  
    req.params.page = ucwords(req.params.page);
    controller
        .topic(req, res)
        .catch(error => next(error));
});
router.get('/:page', (req, res, next) => {
    req.params.page = ucwords(req.params.page);
    controller
        .category(req, res)
        .catch(error => next(error));
});
module.exports = router;
