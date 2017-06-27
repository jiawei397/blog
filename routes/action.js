/**
 * Created by Administrator on 2017/1/6 0006.
 */
var bodyParser = require('body-parser');
var logger = require('morgan');
var LanguageModel = require('../models/languages');
var utils = require('../lib/util');
var fs = require('fs');
var multiparty = require('multiparty');

module.exports = function (app) {

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());


  // 允许所有的请求形式
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

  // app.post('/',function (req,res) {
  //   console.log('--------------' + req.body);
  //   console.log(req.params.id);
  //   console.log(req.query);
  //   console.log(req.body);
  // });

  /**
   * 更新一条数据
   * @author jw
   * @date 2017-06-19
   */
  app.post('/editor/update/:id', function (req, res, next) {
    LanguageModel.updateLanguageById(req.params.id, req.body, function (result) {
      res.json({
        "data": [result],
        "success": true
      });
      next();
    },function (result) {
      res.json(result);
      next();
    });
  });

  /**
   * 增加一条数据
   * @author jw
   * @date 2017-06-19
   */
  app.post('/editor/add', function (req, res, next) {
    LanguageModel.create(req.body, function (result) {
      res.json({
        "data": [result],
        "success": true
      });
      next();
    }, function (result) {
      res.json(result);
      next();
    });
  });

  /**
   * 删除一行或多行
   * @author jw
   * @date 2017-06-19
   */
  app.post('/editor/delete', function (req, res, next) {
    console.log(req.body);
    LanguageModel.delLanguageByIds(req.body.ids, function (result) {
      res.json({
        data: []
      });
      next();
    }, function (result) {
      res.json(result);
      next();
    });
  });

  /**
   * 导出查询条件的所有数据
   * @author jw
   * @date 2017-06-19
   */
  app.get('/editor/exportAll', function (req, res, next) {
    var config = {};
    if (req.query.search) {
      config.search = decodeURI(req.query.search);
    }
    LanguageModel.getAllDatas(config, function (result) {
      //设置响应内容类型为文件流,浏览器端表现为下载文件
      res.contentType("application/octet-stream");
      //设置文件名，注意名称需要进行url编码
      res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI("test.json"));
      result.map(function (data) {
        delete data.DT_RowId;
        delete data._id;
        delete data.__v;
      });
      //结束本次请求，输出文件流
      res.end(JSON.stringify(result, null, 2));

      next();
    }, function (result) {
      res.json(result);
      next();
    });
  });

  /**
   * 导出选中的数据
   * @author jw
   * @date 2017-06-19
   */
  app.post('/editor/export', function (req, res, next) {
    var path = "public/data/temp.json";
    var datas = req.body;
    datas.map(function (data) {
      delete data.DT_RowId;
      delete data._id;
      delete data.__v;
    });
    fs.writeFile(path, JSON.stringify(datas, null, 2), function (err, data) {
      if (err) {
        console.error(err);
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
  app.post('/editor/import',function (req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files);
      fs.readFile(files.file[0].path,function(err,data){
        var result = {
          "success":false
        };
        if(!data || err){
          console.error(err);
          result.message = err;
          res.json(result);
          return;
        }
        // var fileName = files.file[0].originalFilename;
        data = JSON.parse(data);
        // console.log(data);
        // console.log(data);
        if(!Array.isArray(data)){
          result.message = "内容有误！不是数组格式！";
          res.json(result);
          return;
        }
        var b = data.every(function (obj) {
          return obj.code && (obj.zh || obj.en);
        });
        // console.log(b);
        if(!b){
          result.message = "内容有误！";
          res.json(result);
        }else{
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
};
