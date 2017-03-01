var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('yell', {
    title  : 'Exclaim',
    message: 'hello world',

    // This overrides _only_ the default `yell()` helper.
    helpers: {
      yell: function (msg) {
        return (msg + '!!!');
      }
    }
  });
});

module.exports = router;
