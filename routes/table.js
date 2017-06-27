/**
 * Created by Administrator on 2017/1/6 0006.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

//一个简单的路由访问日志记录器
//所有请求都会首先触及这个中间件
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

/**
 * 检测是否登陆，如果有，才跳转到table页面
 * @author jw
 * @date 2017-06-27
 */
router.get('/', checkLogin, function (req, res, next) {
  res.render('table');
});

module.exports = router;
