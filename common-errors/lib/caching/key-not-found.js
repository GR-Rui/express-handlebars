"use strict";

var Util = require('util')
  , BasicError = require('../common/basic');

function KeyNotFoundError() {
  KeyNotFoundError.super_.call(this, 'Key not found in cache');
  this.name = 'KeyNotFoundError';
}
Util.inherits(KeyNotFoundError, BasicError);

module.exports = KeyNotFoundError;
