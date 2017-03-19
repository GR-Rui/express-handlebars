"use strict";
var Router = require('./routes').router;

var internals = {
  articles: function (app) {
    app.use('/', Router.home);
    app.use('/simple', Router.simple);
    app.use('/logic', Router.logic);
    app.use('/loop', Router.loop);
    app.use('/complex', Router.complex);
    app.use('/list?', Router.list);

  }
};

module.exports.setup = function (app, options) {
  options = options || {};
  internals.articles(app);
};