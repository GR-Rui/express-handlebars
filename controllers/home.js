var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    debugger;
    res.render('home');
});

module.exports = router;
