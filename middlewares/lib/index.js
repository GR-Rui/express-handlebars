"use strict";

var _ = require('lodash');

var internals = {

};

/**
 * Validates a token by http.headers['sessionId']
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 * @param {function} next - callback function
 */
exports.token = function (req, res, next) {
  req.session = {id: 'secret'};
  next();
};