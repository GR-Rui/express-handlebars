"use strict";

var Service = require("../services").service;

module.exports = {

  listPage: function (req, res, next) {
    var user = new Service.User();
    var vlist;
    var data = {category: -1, appVersion: "99"};
    var paramsData = req.params;
    var sessionData = req.session;
    var queryData = req.query;
    data.pageNum = queryData.index || 1;// param value need to check number
    data.pageSize = queryData.size || 10;
    data.type = queryData.type || 'subject';

    user.getUserList(data).then(function (result) {
      vlist = result.messages.data;
      res.render('list', vlist);
    }).catch(function (err) {
      next(err);
    });
  },

  welcome: function (req, res, next) {
    res.render('welcome', {name:'Welcome!!!!'});
  }

};
