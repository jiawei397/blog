/**
 * 日历
 */
var express = require('express');
var router = express.Router();
// var sendMail = require('../lib/mail');
var checkLogin = require('../middlewares/check').checkLogin;
var util = require('../lib/util');
util.bodyParser(router);

// GET /calendar 登录页
router.get('/', checkLogin, function (req, res, next) {
  res.render('calendar');
});

module.exports = router;
