var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), {multiArgs: true});
var _ = require('lodash');
var Configuration = require('../configurations');


var internals = {

    /**
     * Processes a json object, and for each property it determines if it should assign an empty string or a null value
     *
     * @param {boolean} removeEmptyObject
     * @param {boolean} emptyObjectToNull
     * @param {object} json
     *
     * @return {object}
     *
     */
    sanitize: function (json, removeEmptyObject, emptyObjectToNull) {
        removeEmptyObject = removeEmptyObject || false;
        emptyObjectToNull = emptyObjectToNull || false;

        _.forEach(_.keys(json), function (key) {
            if (_.isObject(json[key])) {
                if (_.isEmpty(json[key]) || _.isNull(json[key])) {
                    if (removeEmptyObject)
                        delete json[key];
                    else if (emptyObjectToNull)
                        json[key] = null;
                    else
                        json[key] = '';
                } else
                    internals.sanitize(json[key], removeEmptyObject, emptyObjectToNull);
            }
        });

        return json;
    }
};

function AbstractRequest(options) {
    options = options || {};
    var self = this;
    this.config = new Configuration();
    this.headers = {'User-Agent': 'Super Agent/0.0.1'};
}

/**
 * Handle json data
 *
 * @param body - json string
 * @param [options]
 * @returns {object}
 */
AbstractRequest.prototype.parse = function (body, options) {
    options = options || {};
    var json = JSON.parse(body);
    if (options.removeEmptyObject || options.emptyObjectIsNull) {
        json = internals.sanitize(json, options.removeEmptyObject, options.emptyObjectIsNull);
    }
    return json;
};

AbstractRequest.prototype.getUrl = function (urlName, endpointName) {
    urlName = urlName.toLowerCase();
    // var url = 'http://api.snsports.cn/api/content/pc/';
    var url = this.config.get('urls', urlName);
    if (endpointName && endpointName.length > 0)
        return url + endpointName;
    else
        return url;
};

/**
 * Posts http request to api
 *
 * @param {object} headers - { 'token': 'xxxxxx' }
 * @param {object} post data params
 * @param {object} option to parse body
 * @returns {Promise}
 */
AbstractRequest.prototype.post = function (headers, data, option) {
    var self = this;
    headers = headers || self.headers;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return request.postAsync(this.url, {
        headers: headers,
        form: data
    }).spread(function (response, body) {
        return Promise.resolve(self.parse(body, option));
    });
};

module.exports = AbstractRequest;
