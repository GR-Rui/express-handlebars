var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), { multiArgs: true });
module.exports = AbstractRequest;
function AbstractRequest(options) {
    options = options || {};
    var self = this;
    self.urls = 'http://api.snsports.cn/api/content/pc/GetForumRecommendList.json';
}

/**
 * Posts http request to api
 *
 * @param {object} headers - { 'token': 'xxxxxx' }
 * @param {object} data to parse body
 * @param {object} option to parse body
 * @returns {Promise}
 */
AbstractRequest.prototype.post = function (headers, data, option) {
    var self = this;
    headers = headers || {};//'Content-Type': 'application/x-www-form-urlencoded'
    return request.postAsync(this.url, {
        headers: headers,
        body: soap
    }).spread(function (response, body) {
        return Promise.resolve(response);
    });
};