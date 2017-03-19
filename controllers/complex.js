var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var data = {
    name: 'Gorilla',
    address: {
      streetName: 'Broadway',
      streetNumber: '721',
      floor: 4,
      addressType: {
        typeName: 'residential'
      }
    }
  };
  res.render('complex', data);
});

module.exports = router;
