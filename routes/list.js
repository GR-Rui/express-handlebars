var express = require('express');
var router = express.Router();
var Service = require("../services").service;

router.get('/', function (req, res, next) {
    var user = new Service.User();

    var vlist;
    var formData = {category: -1, appVersion: "99"};
    formData.type = 'subject';
    formData.pageSize = 4;
    formData.pageNum = 1;

    user.getUserList(formData).then(function (result) {
        vlist = result.messages.data;
        res.render('list', vlist);
    }).catch(function (err) {
        next(err);
    });

});
module.exports = router;
