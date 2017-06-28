/**
 * Created by Administrator on 2017/1/6 0006.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var bodyParser = require('body-parser');
var logger = require('morgan');
var LanguageModel = require('../models/languages');
var fs = require('fs');
var util = require('../lib/util');
var multiparty = require('multiparty');
var R = require("ramda");

var errorFun = function (err) {
  errorCallback(res, err);
};

var errorCallback = function (res, err) {
  console.error(err);
  res.json({"success": false, "message": err.message || err});
};

router.use(logger('dev'));
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use(checkLogin);//jw 2017.06.28 这样，这个路由的所有方法，都要求登陆才能调用

//一个简单的路由访问日志记录器
//所有请求都会首先触及这个中间件
router.use(function (req, res, next) {
  console.log('访问table路由\n %s %s %s', req.method, req.url, req.path);
  next();
});

/**
 * 检测是否登陆，如果有，才跳转到table页面
 * @author jw
 * @date 2017-06-27
 */
router.get('/', function (req, res, next) {
  res.render('table');
});

/**
 * 增加一条数据
 * @author jw
 * @date 2017-06-19
 */
router.post('/add', function (req, res, next) {
  var obj = req.body;
  obj.author = req.session.user.name;
  LanguageModel.create(obj, function (result) {
    res.json({
      "data": [result],
      "success": true
    });
    next();
  }, errorFun);
});

/**
 * 更新一条数据
 * @author jw
 * @date 2017-06-19
 */
router.post('/update/:id', function (req, res, next) {
  LanguageModel.updateLanguageById(req.params.id, req.body, function (result) {
    res.json({
      "data": [result],
      "success": true
    });
    next();
  }, errorFun);
});

/**
 * 删除一行或多行
 * @author jw
 * @date 2017-06-19
 */
router.post('/delete', function (req, res, next) {
  console.log(req.body);
  LanguageModel.delLanguageByIds(req.body.ids, function () {
    res.json({
      success: true,
      data: []
    });
    next();
  }, errorFun);
});

/**
 * 导出查询条件的所有数据
 * @author jw
 * @date 2017-06-19
 */
router.get('/exportAll', function (req, res, next) {
  var config = {};
  if (req.query.search) {
    config.search = decodeURI(req.query.search);
  }
  LanguageModel.getAllDatas(config, function (datas) {
    //设置响应内容类型为文件流,浏览器端表现为下载文件
    res.contentType("application/octet-stream");
    //设置文件名，注意名称需要进行url编码
    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI("test.json"));
    datas = R.project(['code', 'zh', 'en'])(datas);
    //结束本次请求，输出文件流
    res.end(util.stringify(datas, null, 2));

    next();
  }, errorFun);
});

/**
 * 导出选中的数据
 * @author jw
 * @date 2017-06-19
 */
router.post('/export', function (req, res, next) {
  var path = "public/data/temp.json";
  var datas = req.body;
  datas = R.project(['code', 'zh', 'en'])(datas);
  fs.writeFile(path, util.stringify(datas, null, 2), function (err, data) {
    if (err) {
      errorCallback(res, err);
    } else {
      res.json({
        'path': path.substring(path.indexOf('/')),
        'success': true
      });
    }
  });
});

/**
 * 导入json数据
 * @author jw
 * @date 2017-06-26
 */
router.post('/import', function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log(files);
    fs.readFile(files.file[0].path, function (err, data) {
      if (!data || err) {
        errorCallback(res, err);
        return;
      }
      // var fileName = files.file[0].originalFilename;
      try {
        console.log(data.toString().replace(/\\t/g, ''));
        data = JSON.parse(data.toString().replace(/\\t/g, ''));
      } catch (e) {
        errorCallback(res, "格式有误！");
        return;
      }
      // console.log(data);
      // console.log(data);
      if (!Array.isArray(data)) {
        errorCallback(res, "内容有误！不是数组格式！");
        return;
      }
      var b = data.every(function (obj) {
        return obj.code && (obj.zh || obj.en);
      });
      // console.log(b);
      if (!b) {
        errorCallback(res, "内容有误！");
      } else {
        LanguageModel.create(data, function (result) {
          res.json({
            "data": [result],
            "success": true
          });
        }, function (result) {
          res.json(result);
        });
      }
    });
  });
});

/**
 * 分布显示数据
 * @author jw
 * @date 2017-06-27
 */
router.get('/getData', function (req, res, next) {
  // console.error(req.query);
  LanguageModel.getDatas({
    start: req.query.start,
    pageSize: req.query.length,
    search: req.query.search.value
  }, function (result) {
    result.draw = req.query.draw;
    res.json(result);
    next();
  }, errorFun);
});

module.exports = router;
