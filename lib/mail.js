/**
 * @Description 邮件发送
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config-lite');
// var config = require('../config/dev');
var Q = require('q');
var Mock = require('mockjs');
var Random = Mock.Random;

smtpTransport = nodemailer.createTransport(smtpTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {
  var deferred = Q.defer();
  smtpTransport.sendMail({
    from: config.email.user,
    to: recipient,
    subject: subject,
    html: html
  }, function (err, data) {
    if (err){
      console.error(err);
      deferred.reject(new Error(err));
    } else {
      console.log('success');
      deferred.resolve();
    }
  });
  return deferred.promise;
};

// sendMail('635676703@qq.com', 'test', Random.cparagraph(1, 3));

module.exports = sendMail;
