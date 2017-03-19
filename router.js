"use strict";
var Controllers = require('./controllers');
var demoCtrl = Controllers.demo;
var Middleware = require('./middlewares');

var internals = {
  demo: function (app) {
    app.use('/demo', demoCtrl.home);
    app.use('/demo/simple', demoCtrl.simple);
    app.use('/demo/logic', demoCtrl.logic);
    app.use('/demo/loop', demoCtrl.loop);
    app.use('/demo/complex', demoCtrl.complex);
    app.get('/demo/list/:id?', Middleware.token, demoCtrl.article.listPage);
    app.get('/', demoCtrl.article.welcome);

  }
};

module.exports.setup = function (app, options) {
  options = options || {};
  internals.demo(app);
};