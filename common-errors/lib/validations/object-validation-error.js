"use strict";

var Util = require('util');
var BasicError = require('../common/basic');


function ObjectValidationError(errors) {
  ObjectValidationError.super_.call(this, 'Validation error occurred', errors);
  this.name = 'ObjectValidationError';
  // this.errors = errors || [];
}
Util.inherits(ObjectValidationError, BasicError);

module.exports = ObjectValidationError;