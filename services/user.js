'use strict';

var util = require('util');
var AbstractRequest = require('./abstract');

function UsersRequest(options) {
    options = options || {};
    UsersRequest.super_.call(this, options);
    this.url = this.getUrl('api', 'GetForumRecommendList.json');
}

util.inherits(UsersRequest, AbstractRequest);

UsersRequest.prototype.getUserList = function (data) {
    var self = this;
    return self.post(self.headers, data);
};
module.exports = UsersRequest;