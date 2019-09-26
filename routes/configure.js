/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var ConfigureModel = require('../models/configure');
var util = require('../lib/util');
util.bodyParser(router);

/**
 * 添加到数据
 */
router.get('/add', checkLogin, function (req, res, next) {
  // var datas = req.body;
  let data = {
    key: 'test',
    value: 'haha'
  };
  // console.log(datas.ips);
  ConfigureModel.create(data).then(function (err, data) {
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

module.exports = router;
