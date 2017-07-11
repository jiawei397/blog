/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var sendMail = require('../lib/mail');
var checkLogin = require('../middlewares/check').checkLogin;
var util = require('../lib/util');
util.bodyParser(router);

// GET /spider 登录页
router.get('/', checkLogin, function (req, res, next) {
  res.render('email');
});

/**
 * 添加到host文件中
 * @author jw
 * @date 2017-07-05
 */
router.post('/send', checkLogin, function (req, res, next) {
  var datas = req.body;
  console.log(datas);
  sendMail(datas.email, datas.theme, datas.content).then(function () {
    res.json({
      'success': true
    });
  }, function (err) {
    console.error(err);
    res.json({
      'success': false,
      'message': err.message
    });
  });
});

module.exports = router;
