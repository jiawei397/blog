/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var spiderGithub = require('../lib/spider-github');

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signin 登录页
router.get('/', checkLogin, function (req, res, next) {
  spiderGithub()
    .then(function (datas) {
      console.log(datas);
      res.render('spider', {
        windowDest: "windows C:\\Windows\\System32\\drivers\\etc\\hosts",
        linuxDest: "linux /private/etc/hosts",
        datas: datas
      });
    })
    .catch(next);
});

module.exports = router;
