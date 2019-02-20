/**
 * Created by Administrator on 2017/1/6 0006.
 */
var path = require('path');
module.exports = {
  port: 8081,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  uploadDir: path.join(__dirname, '../public/img'),// 上传文件目录
  //邮件配置
  email: {
    service: '126',//服务地址详见：https://nodemailer.com/smtp/well-known/
    user: 'XX@126.com',
    pass: 'XXX'//密码，如果设置了stmp，则不是登陆密码
  },
  mongodb: 'mongodb://127.0.0.1:27018/myblog'
};
