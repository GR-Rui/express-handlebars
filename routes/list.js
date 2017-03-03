var express = require('express');
var router = express.Router();
var httpBiz = require("../services/user");

router.get('/', function (req, res, next) {
    var param = {pageSize: 5, pageNum: 1};
    var videoList;

    httpBiz.getForumRecommendList().then(function (result) {
        //res.status(200).send(result);
        videoList = result.messages.data;
        res.render('list', videoList);
    }).catch(function (err) {
        next(err);
    });

});

module.exports = router;
