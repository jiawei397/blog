/**
 * Created by Administrator on 2017/7/6.
 */
var gulp = require('gulp');
var fs = require('fs');
var Q = require('q');
var request = require('request');

/**
 * 将异步方法当做参数传入
 * 传递一个function，返回一个promise，调用then得到方法的返回值
 */
gulp.task('nfcall', function () {
  var ver = 'uinv.language.version = ' + new Date().getTime() + ';';
  return Q.nfcall(fs.writeFile, './public/data/version.js', ver, 'utf8').then(function () {
    console.log('写入完成');
  });
});

/**
 * 直接取代原来的方法
 * 封装后返回一个方法，调用此方法得到promise
 */
gulp.task('denodeify', function () {
  var wf = Q.denodeify(fs.writeFile);
  var ver = 'uinv.language.version = ' + new Date().getTime() + ';';
  return wf('./public/data/version.js', ver, 'utf8').then(function () {
    console.log('写入完成');
  });
});

/**
 * 使用deferd对象的reject方法（失败回调）、resolve方法（成功回调）、promise属性来实现自定义promise。
 * （前面2个nfcal、denodeify底层应该也是用deferd实现的）
 */
gulp.task('defer', function () {
  var deferred = Q.defer();
  var ver = 'uinv.language.version = ' + new Date().getTime() + ';';
  fs.writeFile('./public/data/version.js', ver, 'utf8', function (err, result) {
    if (err) {
      deferred.reject(new Error(err));
      return;
    }
    deferred.resolve();
  });
  return deferred.promise;
});

/**
 * promise方法
 */
function requestUrl (url) {
  return Q.Promise(function (resolve, reject, notify) {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      } else if (response.statusCode == 200) {
        resolve(body);
      }
    });
  });
}

/**
 * request请求
 */
gulp.task('request', function () {
  return requestUrl('http://www.baidu.com').then(function (data) {
    console.log(data);
  }, function (err) {
    console.error(err);
  });
});

function myDelay (ms) { // 定义延时操作，返回promise
  var deferred = Q.defer();
  setTimeout(deferred.resolve, ms);
  // deferred.reject('hahaha');
  return deferred.promise;
}

/**
 * 延时
 */
gulp.task('delay', function () {
  return myDelay(1000).then(function (data) {
    console.log('延时一秒完成');
  }, function (err) {
    console.error(err);
  });
});

function myInterval (ms, fn) { // 定义延时操作，返回promise
  var deferred = Q.defer();
  var num = 0;
  var inter = setInterval(function () {
    if (fn()) {
      clearInterval(inter);
      deferred.resolve(num);
    } else {
      num++;
      console.log(num);
    }
  }, ms);
  return deferred.promise;
}

/**
 * 循环处理
 */
gulp.task('interval', function () {
  var a = null;
  myDelay(5000).then(function () {
    console.log('延时9秒设置a');
    a = 43;
  });

  return myInterval(500, function () {
    return a;
  }).then(function (num) {
    console.log('循环了' + num + '次后，myInterval完成');
  }, function (err) {
    console.error(err);
  });
});
