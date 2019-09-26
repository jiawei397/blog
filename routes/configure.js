/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var ConfigureModel = require('../models/configure');
var util = require('../lib/util');
util.bodyParser(router);

// router.use(checkLogin);//jw 2017.06.28 这样，这个路由的所有方法，都要求登陆才能调用

/**
 * 添加到数据
 */
router.post('/add', async (req, res, next) => {
  let data = req.body;
  // let data = {
  //   key: 'test',
  //   value: 'haha'
  // };
  try {
    await ConfigureModel.createOrUpdate(data);
    res.json({
      'success': true,
      'data': data
    });
  } catch (err){
    console.error(err);
    res.json({
      'success': false,
      'message': err
    });
  }
});

/**
 * 查找数据
 */
router.post('/find', checkLogin, function (req, res, next) {
  // let key = 'test';
  var key = req.body;
  ConfigureModel.getDataByKey(key).then(function (data) {
    res.json({
      'success': true,
      'data': data
    });
  }).catch((err) => {
    console.error(err);
    res.json({
      'success': false,
      'message': err
    });
  });
});

module.exports = router;
