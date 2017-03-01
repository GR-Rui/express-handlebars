var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('yell', {
    title: 'Yell',

    // This `message` will be transformed by our `yell()` helper.
    message: 'hello world'
  });
});

module.exports = router;
