var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), {multiArgs: true});
var httpBiz = {};

httpBiz.getForumRecommendList = function () {
    // Set the headers
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var options = [];

    var formData = {category: -1, appVersion:"99"};
    formData.type = 'subject';
    formData.pageSize = 2;
    formData.pageNum = 1;

// Configure the request
    options[0] = {
        url: 'http://api.snsports.cn/api/content/pc/GetForumRecommendList.json',
        method: 'POST',
        headers: headers,
        form: formData
    };

// Start the request
    request.postAsync(options[0]).spread(function (response, body) {
        if (response.statusCode == 200) {
            console.log(body);
        }
    }).then(function () {
        console.log(11111)
    });
};

module.exports = httpBiz;