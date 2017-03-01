var express = require('express');
var router = express.Router();
/*
router.get('/', exposeTemplates, function (req, res, next) {
  res.render('echo', {
    title  : 'Echo',
    message: req.params.message,

    // Overrides which layout to use, instead of the defaul "main" layout.
    layout: 'shared-templates',

    partials: Promise.resolve({
      echo: hbs.handlebars.compile('<p>ECHO: {{message}}</p>')
    })
  });
});
*/
router.get('/', function (req, res, next) {
  res.render('echo', {
    title  : 'Echo',
    message: req.params.message,

    // Overrides which layout to use, instead of the defaul "main" layout.
    layout: 'shared-templates',

    partials: Promise.resolve({
      echo: '3333'
    })
  });
});
module.exports = router;
