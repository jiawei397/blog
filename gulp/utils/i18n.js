var fs = require("fs");
var Q = require("q");

var getJson = function (path) {
  var deferred = Q.defer();
  fs.readFile(path, function (err, data) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(data);
    }
  });
  return deferred.promise; // 这里返回一个承诺
};

var write2Json = function (language, path, json, type) {
  var deferred = Q.defer();
  console.log("准备写入文件");
  if (!path || path == "") {
    path = "./";
  } else if (!path.endsWith('/')) {
    path += "/";
  }
  json = JSON.stringify(json);
  if (type === undefined) {
    type = 'json';
  } else if (type == "js") {
    json = "[" + json + "]";//单独js文件会报错，需要放到数组里
  }
  console.log(path + language + "." + type);
  fs.writeFile(path + language + "." + type, json, function (err) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve();
      console.log("数据写入成功！");
    }
  });
  return deferred.promise; // 这里返回一个承诺
};

module.exports = function (path, language, dest, type) {
  return getJson(path).then(function (data) {
    data = JSON.parse(data);
    var json = {};
    data.map(function (obj) {
      // console.log(obj);
      if (language == 'zh') {
        json[obj['code']] = obj['lanZhc'];
      } else {
        json[obj['code']] = obj['lanEn'];
      }
    });
    // console.log(json);
    return json;
  }, function (err) {
    console.log(err);
  }).then(function (json) {
    return write2Json(language, dest, json, type);
  });
};
