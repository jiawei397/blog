/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var spiderGithub = require('../lib/spider-github');
var checkLogin = require('../middlewares/check').checkLogin;
var windowDest = "C:\\Windows\\System32\\drivers\\etc\\hosts";
var SpiderModel = require('../models/spider');
var R = require("ramda");
var util = require('../lib/util');
util.bodyParser(router);

// GET /spider 登录页
router.get('/', checkLogin, function (req, res, next) {
  var render = function (res, data) {
    res.render('spider', {
      windowDest: "windows " + windowDest,
      linuxDest: "linux /private/etc/hosts",
      datas: data
    });
  };

  SpiderModel.getDatas().then(function (data) {
    console.error("spider", data);
    if (!data || data.length == 0) {
      var dataArr;
      spiderGithub()
        .then(function (datas) {
          console.log(datas);
          var date = new Date();
          var arr = datas.map(function (data) {
            return {
              ip: data,
              createTime: date
            };
          });
          dataArr = datas;
          return SpiderModel.create(arr);
        })
        .then(function (result) {
          console.log(result);
          render(res, dataArr);
        })
        .catch(next);
    } else {
      var ips = R.pluck('ip')(data);
      // console.log(ips);
      render(res, ips);
    }
  }).catch(next);
});

/**
 * 添加到host文件中
 * @author jw
 * @date 2017-07-05
 */
router.post('/add', checkLogin, function (req, res, next) {
  var datas = req.body;
  // console.log(datas.ips);
  fs.appendFile(windowDest, '\n' + datas.ips.join('\n'), function (err, data) {
    if (err) {
      console.error(err);
      res.json({
        'success': false,
        'message': err
      });
    } else {
      res.json({
        'success': true
      });
    }
  });
});

/**
 * 重新爬取
 * @author jw
 * @date 2017-07-05
 */
router.get('/reDo', checkLogin, function (req, res, next) {
  SpiderModel.clear().then(function (result) {
    // console.log(result);
    spiderGithub()
      .then(function (datas) {
        // console.log(datas);
        var date = new Date();
        var arr = [];
        datas.map(function (data) {
          arr.push({
            ip: data,
            createTime: date
          });
        });
        SpiderModel.create(arr).then(function (result) {
          console.log(result);
          res.json(datas);
        }).catch(next);
      })
      .catch(next);
  }).catch(next);
});

module.exports = router;
