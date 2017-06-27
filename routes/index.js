/**
 * Created by Administrator on 2017/1/6 0006.
 */
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/table', require('./table'));

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
