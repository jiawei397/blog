/**
 * Created by Administrator on 2017/1/6 0006.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var LanguageModel = require('../models/languages');
var fs = require('fs');
var util = require('../lib/util');
var multiparty = require('multiparty');
var R = require("ramda");

var errorCallback = function (res, err) {
  console.error(err);
  res.json({"success": false, "message": err.message || err});
};

util.bodyParser(router);
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
router.post('/add', async function (req, res, next) {
  var obj = req.body;
  console.log(obj);
  obj.author = req.session.user.name;
  obj.createTime = obj.modifyTime = new Date();
  try {
    var result = await LanguageModel.create(obj);
    res.json({
      "data": [result],
      "success": true
    });
    next();
  } catch (err) {
    errorCallback(res, err);
  }
});

/**
 * 更新一条数据
 * @author jw
 * @date 2017-06-19
 */
router.post('/update/:id', async function (req, res, next) {
  try {
    var result = await LanguageModel.updateLanguageById(req.params.id, req.body);
    util.combine(result, req.body);
    res.json({
      "data": [result],
      "success": true
    });
    next();
  } catch (err) {
    errorCallback(res, err);
  }
});

/**
 * 删除一行或多行
 * @author jw
 * @date 2017-06-19
 */
router.post('/delete', async function (req, res, next) {
  // console.log(req.body);
  try {
    await LanguageModel.delLanguageByIds(req.body.ids);
    res.json({
      success: true,
      data: []
    });
    next();
  } catch (err) {
    errorCallback(res, err);
  }
});

/**
 * 导出查询条件的所有数据
 * @author jw
 * @date 2017-06-19
 */
router.get('/exportAll', async function (req, res, next) {
  var config = {};
  if (req.query.search) {
    config.search = decodeURI(req.query.search);
  }
  try {
    var datas = await LanguageModel.getAllDatas(config);
    //设置响应内容类型为文件流,浏览器端表现为下载文件
    res.contentType("application/octet-stream");
    //设置文件名，注意名称需要进行url编码
    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI("dcv-all.json"));
    datas = R.project(['code', 'zh', 'en'])(datas);
    //结束本次请求，输出文件流
    res.end(JSON.stringify(datas));
    next();
  } catch (err) {
    errorCallback(res, err);
  }
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
  fs.writeFile(path, JSON.stringify(datas), function (err, data) {
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
    if (err) {
      errorCallback(res, err);
      return;
    }
    // console.log(fields);
    // console.log(files);
    fs.readFile(files.file[0].path, async function (err, data) {
      if (!data || err) {
        errorCallback(res, err);
        return;
      }
      // var fileName = files.file[0].originalFilename;
      try {
        data = JSON.parse(data);
      } catch (e) {
        errorCallback(res, "json格式有误！");
        return;
      }
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
        return;
      }
      data = data.map(function (obj) {
        obj.author = req.session.user.name;
        obj.createTime = obj.modifyTime = new Date();
        return obj;
      });
      console.log(data);
      try {
        var result = await LanguageModel.create(data);
        res.json({
          "data": [result],
          "success": true
        });
      } catch (err) {
        errorCallback(res, err);
      }
    });
  });
});

/**
 * 分布显示数据
 * @author jw
 * @date 2017-06-27
 */
router.get('/getData', async function (req, res, next) {
  // console.error(req.query);
  try {
    var $page = await LanguageModel.getDatas({
      start: req.query.start,
      pageSize: req.query.length,
      search: req.query.search.value,
      sortParams: {"modifyTime": -1, "createTime": -1}//降序
    });
    var json = {
      'recordsTotal': $page.count,
      'recordsFiltered': $page.count,
      'data': $page.results,
      'draw': req.query.draw
    };
    var datas = json.data;
    datas.map(function (data) {
      data.DT_RowId = data._id;
      data.createTime && (data.createTime = data.createTime.format('yyyy-MM-dd HH:mm:ss'));
      data.modifyTime && (data.modifyTime = data.modifyTime.format('yyyy-MM-dd HH:mm:ss'));
    });
    res.json(json);
    next();
  } catch (err) {
    errorCallback(res, err);
  }
});

module.exports = router;
