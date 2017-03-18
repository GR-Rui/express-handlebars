"use strict";

var util = require('util');

module.exports = {
    Generic: require('./helpers/generic')
};

module.exports.log = function(err, message) {
    if (typeof err == 'string') {
        err = new module.exports.Generic(err);
    } else {
        if (message) {
            err.message = message;
        }
        err = module.exports._prependCurrentStack(err);
    }
    if (err) {
        console.error(err && err.stack || err);
        err.isLogged = true;
    }
    return err;
};

module.exports._prependCurrentStack = function(err) {
    // skip the first three lines, because they're just noise
    var stackToPrepend = (new Error()).stack.split("\n").slice(3);
    var mainStack = err.stack.split("\n");
    var errTitle = mainStack.shift();
    err.stack = [errTitle].concat(stackToPrepend, "====", mainStack).join("\n");
    return err;
};
