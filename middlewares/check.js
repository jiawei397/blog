/**
 * Created by Administrator on 2017/1/6 0006.
 */
module.exports = {
  /**
   * 检查是否登陆，未登陆的话，跳转到登陆页
   * @author jw
   * @date 2017-06-28
   */
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');
    }
    next();
  },

  /**
   * 检查是否登陆，登陆的话，跳转到上一个页面
   * @author jw
   * @date 2017-06-28
   */
  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back');//返回之前的页面
    }
    next();
  }
};
