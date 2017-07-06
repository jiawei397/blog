/**
 * Created by Administrator on 2017/6/29 0029.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var Q = require("q");
var path = require("path");
var from = path.resolve(__dirname, "./github-from.txt");
// var from = "C:\\Windows\\System32\\drivers\\etc\\hosts";
var to = path.resolve(__dirname, "./github-to.txt");
var beforeUrl = "http://ip.chinaz.com/";

function readFile () { //封装了一层函数
  var deferred = Q.defer();
  fs.readFile(from, function (err, data) {
    if (err) {
      deferred.reject(new Error(err));
      return;
    }
    deferred.resolve(data);
  });
  return deferred.promise; // 这里返回一个承诺
}

function writeFile (datas, dest) {
  var deferred = Q.defer();
  if (!dest) {
    dest = to;
  }
  fs.writeFile(dest, datas, function (err, data) { //直接写入，也可以appendFile
    if (err) {
      deferred.reject(new Error(err));
      return;
    }
    deferred.resolve(data);
  });
  return deferred.promise; // 这里返回一个承诺
}

function startRequest (x) {
  var deferred = Q.defer();
  //采用http模块向服务器发起一次get请求
  http.get(beforeUrl + x, function (res) {
    var html = ''; //用来存储请求网页的整个html内容
    res.setEncoding('utf-8'); //防止中文乱码
    //监听data事件，每次取一块数据
    res.on('data', function (chunk) {
      html += chunk;
    });
    //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
    res.on('end', function () {
      // console.log(html);
      var $ = cheerio.load(html); //采用cheerio模块解析html
      var node = $(".Whwtdhalf");
      if (node.length > 5) {
        var ip = node.eq(5).text();
        var txt = ip + " " + x;
        deferred.resolve(txt);
      } else {
        deferred.reject(new Error("没有找到数据"));
      }
    });
  }).on('error', function (err) {
    console.error(err);
    deferred.reject(new Error(err));
  });
  return deferred.promise;
}

var spider = function (dest) {
  return readFile().then(function (data) {
    // console.log(data.toString());
    data = data.toString().split('\r\n');
    var allPromise = data.map(function (url) {
      return startRequest(url);
    });
    return Q.all(allPromise);
    //   .then(function (datas) {
    //   console.log(datas);
    //   return writeFile(datas.join('\n'), dest);
    // });
  });
};

// spider().then(function (data) {
//   console.log(data);
// });

module.exports = spider;
