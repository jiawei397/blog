/**
 * Created by Administrator on 2017/1/6 0006.
 */
var config = require('config-lite');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts');
  });

  app.use('/table', require('./table'));//table必须放前面，因为bodyParser功能会与formidable冲突
  app.use('/spider', require('./spider'));
  app.use('/email', require('./email'));
  app.use('/map', require('./map'));

  // 处理表单及文件上传的中间件
  app.use(require('express-formidable')({
    uploadDir: config.uploadDir, // 上传文件目录
    keepExtensions: true// 保留后缀
  }));
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('404');
    }
  });
  // error page
  app.use(function (err, req, res, next) {
    res.render('error', {
      error: err
    });
  });
};
