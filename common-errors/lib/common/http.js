"use strict";

var Util = require('util')
  , BasicError = require('./basic');

function HttpError(statusCode, message) {
  HttpError.super_.call(this, message);
  this.name = 'HttpError';
  this.statusCode = statusCode || 500;
}
Util.inherits(HttpError, BasicError);

module.exports = HttpError;