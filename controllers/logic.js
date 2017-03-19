var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var data = {
    upIsUp: true,
    downIsUp: false,
    skyIsBlue: "yes"
  };

  res.render('logic', data);
});
module.exports = router;
