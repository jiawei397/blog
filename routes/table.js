/**
 * Created by Administrator on 2017/1/6 0006.
 */
var express = require('express');
var LanguageModel = require('../models/languages');
var router = express.Router();
var fs = require("fs");

var checkLogin = require('../middlewares/check').checkLogin;

//一个简单的路由访问日志记录器
//所有请求都会首先触及这个中间件
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', function (req, res, next) {
  // var author = req.query.author;
  // console.log("get****author:" + author);
  res.render('table');
  // LanguageModel.getPosts(author)
  //     .then(function (data) {
  //         res.render('table', {
  //             data: data
  //         });
  //     })
  //     .catch(next);
});

router.get('/insert.do', function (req, res, next) {
  // res.send(req.flash());
  // var author = req.session.user._id;
  // // var title = req.fields.title;
  // // var content = req.fields.content;
  // var {title,content} = req.fields;
  // console.error(author,title,content);
  //
  // // 校验参数
  // try {
  //   if (!title.length) {
  //     throw new Error('请填写标题');
  //   }
  //   if (!content.length) {
  //     throw new Error('请填写内容');
  //   }
  // } catch (e) {
  //   req.flash('error', e.message);
  //   return res.redirect('back');
  // }

  var language = {
    "en": "\"{0}\" cannot be found from _SCENENODES_ during running of uinv.factory.parse",
    "zh": "uinv.factory.parse时,_SCENENODES_ 里不能找到\"{0}\"",
    "code": "1aa3411"
  };
  // language.createTime = language.modifyTime = new Date();

  var language2 = {
    "en": "\"{0}\" cannot be found from _SCENENODES_ during running of uinv.factory.parse",
    "zh": "uinv.f4actory.parse时,_SCENENODES_ 里不能找到\"{0}\"",
    "code": "44a44"
  };

  var language3 = {
    "en": "\"{0}\" cannot be found from _SCENENODES_ during running of uinv.factory.parse",
    "zh": "uinv.factory.parse时,_SCENENODES_ 里不能找到\"{0}\"",
    "code": "445an4"
  };

  fs.readFile("public/data/dcv-all.json", 'utf8', function (err, data) {
    // console.log(data);
    data = JSON.parse(data).data;
    var arr = [];
    var map = {};
    data.map(function (obj) {
      var newObj = {};
      newObj.en = obj.lanEn || '';
      newObj.zh = obj.lanZhc || '';
      if(map[obj.code]){
        console.log(obj.code);
      }else{
        map[obj.code] = 1;
      }
      newObj.code = obj.code;
      arr.push(newObj);
    });
    console.log(arr.length);
    // LanguageModel.create(arr, function (result) {
    //   res.json({
    //     "data": [result],
    //     "success": true
    //   });
    //   // next();
    // }, function (result) {
    //   res.json(result);
    //   // next();
    // });

  });

// console.log("post:" + JSON.stringify(language));

  // var arr = [language, language2, language3];
  //
  // LanguageModel.create(arr, function (result) {
  //   res.json({
  //     "data": [result],
  //     "success": true
  //   });
  //   next();
  // }, function (result) {
  //   res.json(result);
  //   next();
  // });
});

router.get('/getData.do', function (req, res, next) {
  // res.send(req.flash());
  // var author = req.session.user._id;
  // // var title = req.fields.title;
  // // var content = req.fields.content;
  // var {title,content} = req.fields;
  // console.error(author,title,content);
  //
  // // 校验参数
  // try {
  //   if (!title.length) {
  //     throw new Error('请填写标题');
  //   }
  //   if (!content.length) {
  //     throw new Error('请填写内容');
  //   }
  // } catch (e) {
  //   req.flash('error', e.message);
  //   return res.redirect('back');
  // }
  console.error(req.query);

  LanguageModel.getDatas({
    start:req.query.start,
    pageSize:req.query.length,
    search:req.query.search.value
  },function (result) {
    result.draw = req.query.draw;
    res.json(result);
    next();
  });
});


module.exports = router;
