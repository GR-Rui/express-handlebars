var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helpers = require('./lib/helpers');

var index = require('./routes/index');
var exclaim = require('./routes/exclaim');
var yell = require('./routes/yell');
var echo = require('./routes/echo');

var app = express();
var exphbs  = require('express-handlebars');

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers      : helpers,

  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
    'views/templates/',
    'views/partials/'
  ]
});

// view engine setup
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
  // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
  // templates which will be shared with the client-side of the app.
  hbs.getTemplates('views/templates/', {
    cache      : app.enabled('view cache'),
    precompiled: true
  }).then(function (templates) {
    // RegExp to remove the ".handlebars" extension from the template names.
    var extRegex = new RegExp(hbs.extname + '$');

    // Creates an array of templates which are exposed via
    // `res.locals.templates`.
    templates = Object.keys(templates).map(function (name) {
      return {
        name    : name.replace(extRegex, ''),
        template: templates[name]
      };
    });

    // Exposes the templates during view rendering.
    if (templates.length) {
      res.locals.templates = templates;
    }

    setImmediate(next);
  })
      .catch(next);
}


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/exclaim', exclaim);
app.use('/yell', yell);
app.use('/echo/:message?', echo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
