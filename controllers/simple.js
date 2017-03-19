var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var data = {name: 'Gorilla'};
  res.render('simple', data);
});
module.exports = router;
