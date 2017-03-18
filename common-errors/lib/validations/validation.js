"use strict";

/**
 * Validation Error
 *
 * @param message
 * @param [property]
 * @param [value]
 *
 * @constructor
 */
function ValidationError(message, property, value) {
  this.message = message;
  if (property)
    this.property = property;
  if (value)
    this.value = value;
}

module.exports = ValidationError;