"use strict";

var Util = require('util');
var CommonError = require('../basic');
var GenericError = CommonError.Generic;
var _ = require('lodash');

var internals = {
  array2Str: function (errors) {
    errors = errors || [];
    var maps = _.map(errors, 'message');
    return maps.join('-');
  }
};

function BasicError(message, errors) {
  var str = '';
  if(errors.length > 0) {
    str = internals.array2Str(errors);
    message = message + '>>' + str;
  }
  BasicError.super_.call(this, message);
  CommonError.log(message);
  this.name = 'BasicError';
}
Util.inherits(BasicError, GenericError);

module.exports = BasicError;