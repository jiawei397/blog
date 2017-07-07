/**
 * Created by Administrator on 2017/5/19 0019.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var i18n = require("../utils/i18n");
var fs = require('fs');
var replaceAssets = require('gulp-replace-assets');
var Q = require("q");
var dataConfig = require('../config/data');
var stripDebug = require('gulp-strip-debug'); // 仅用于本例做演示
var del = require('del');
var vinylPaths = require('vinyl-paths');
var minimist = require('minimist');
var merge = require('merge-stream');
// var fs = require('vinyl-fs');

var FileVer = require('gulp-git-svn-version-filename');
var cacheObj = {};
var fileVer = new FileVer({
  type: 'svn', // 仓库类型 支持svn、git
  cache: cacheObj, // 指定缓存对象
  cwd: process.cwd(), // 项目根目录
  user: '', // 仓库账号名
  pwd: '' // 仓库账号密码
});

gulp.task('addSvnVersion', function () {
  return gulp.src(['./src/*.js'])
    .pipe(fileVer.setForTransform(function (oldPath, versionPath) {
      console.log(versionPath, fileVer.getCache());
    }))
    .pipe(fileVer.getForTransform(function (version) {
      console.log(version);
    }))
    // .pipe(fileVer.get("D:\\Workspaces\\vue\\dcv-tarsier",function (version) {
    //   console.log(version);
    // }))
      .pipe(gulp.dest('./dist'));
});

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

var writeJson = function (path, json) {
  var deferred = Q.defer();
  fs.writeFile(path, JSON.stringify(json, null, 2), function (err, data) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(data);
    }
  });
  return deferred.promise; // 这里返回一个承诺
};

// gulp.task("default",function () {
//   var path = 'src/entry/dcv-all.json';
//   var dest = "src/dcv/javascripts/language";
//   var type = "js";
//   i18n(path, 'zh', dest, type);
//   i18n(path, 'en', dest, type);
//
//   var i18Wather = gulp.watch([path]);
//   i18Wather.on('change', function(file) {
//     i18n(path, 'zh', dest, type);
//     i18n(path, 'en', dest, type);
//   });
// });

//清除dist中存在的图片
// gulp.task('image-clean', function () {
//   return gulp.src(['dist/**/*.png', 'dist/**/*.gif', 'dist/**/*.jpg'])
//     .pipe(clean());
// });

gulp.task('templates', function () {
  // return getJson('src/entry/dcv-all.json').then(function (datas) {
  //   datas = JSON.parse(datas);
  //
  //   var obj = {};
  //   var arr = [];
  //   var _obj = {};
  //   datas.map(function (data) {
  //     var code = data.code;
  //     code = ("DCV_" + code.replace(/[\s\<\>\.\"\{\}\*\—\-\~\,\[\]\\\(\)\/?:!%]/g,'_')).replace(/_{1,9}/g,'_').replace(/_$/g,"").toUpperCase().replace(/(DCV_).*\1/g,"$1");
  //     console.log(code);
  //     // obj[data.code.replace(/\"/gi,"\\\"")] = code;
  //     var origin = data.code.replace(/\"/gi,"\\\"");
  //     obj['u.le.get("' + origin + '"'] = 'u.le.get("' + code + '"';
  //     obj['uinv.util.alert("' + origin + '"'] = 'uinv.util.alert("' + code + '"';
  //     obj['uinv.mainUIConfig.menu.push("' + origin + '"'] = 'uinv.mainUIConfig.menu.push("' + code + '"';
  //     obj['["' + origin + '",'] = '["' + code + '",';
  //     // task = task.pipe($.replace(data.code.replace(/\"/gi,"\\\""),  code));
  //
  //     if(!_obj[code]){
  //       _obj[code] = 1;
  //       arr.push({
  //         "code":code,
  //         "lanZhc":data.lanZhc,
  //         "lanEn":data.lanEn
  //       });
  //     }
  //   });
  //   // console.log(obj);
  //   // task = task.pipe($.replace(arr,code));
  //   var task = gulp.src(['./src/dcv/javascripts/**/*.js'],{
  //     'cwd':'./src/dcv/'
  //   });
  //   // task = task.pipe($.cache(replaceAssets(obj), {
  //   //   fileCache: dataConfig.fileCache,
  //   //   name: 'replaceAssets'
  //   // }));
  //   task = task.pipe(replaceAssets(obj));
  //   // writeJson('dist/test.json',arr);
  //   // .pipe($.replace(datas[0].code.replace(/\"/gi,"\\\""),  code))
  //   return task.pipe(gulp.dest('dist'));
  // });
  var task = gulp.src(['javascripts/**/*.js'], {
    'cwd': './src/dcv/',
    'base': './src/dcv/'
  });
  fs.readFile('src/entry/dcv-all.json', 'utf8', function (err, datas) {
    if (err) {
      console.error(err);
      return;
    }
    datas = JSON.parse(datas);

    var obj = {};
    var arr = [];
    var _obj = {};
    datas.map(function (data) {
      var code = data.code;
      code = ("DCV_" + code.replace(/[\s\<\>\.\"\{\}\*\—\-\~\,\[\]\\\(\)\/?:!%]/g, '_')).replace(/_{1,9}/g, '_').replace(/_$/g, "").toUpperCase().replace(/(DCV_).*\1/g, "$1");
      // console.log(code);
      // obj[data.code.replace(/\"/gi,"\\\"")] = code;
      var origin = data.code.replace(/\"/gi, "\\\"");
      // console.log(origin);
      obj['u.le.get("' + origin + '"'] = 'u.le.get("' + code + '"';
      obj['uinv.util.alert("' + origin + '"'] = 'uinv.util.alert("' + code + '"';
      obj['uinv.mainUIConfig.menu.push("' + origin + '"'] = 'uinv.mainUIConfig.menu.push("' + code + '"';
      obj['["' + origin + '",'] = '["' + code + '",';
      // task = task.pipe($.replace(data.code.replace(/\"/gi,"\\\""),  code));

      if (!_obj[code]) {
        _obj[code] = 1;
        arr.push({
          "code": code,
          "lanZhc": data.lanZhc,
          "lanEn": data.lanEn
        });
      }
    });
    // console.log(obj);
    // task = task.pipe($.replace(arr,code));

    task = task.pipe($.cache(replaceAssets(obj), {
      fileCache: dataConfig.fileCache,
      name: 'replaceAssets'
    }));
    // task = task.pipe(replaceAssets(obj));
    // writeJson('dist/test.json',arr);
    // .pipe($.replace(datas[0].code.replace(/\"/gi,"\\\""),  code))
    task.pipe(gulp.dest('./dist'));
  });

  // return gulp.src(['src/dcv/javascripts/3d/base/uweb_controller_exhibitionAnim.js'])
  //   .pipe($.replace("\"{0}\" has been registered. The default name will be used!".replace(/\"/gi,"\\\""), "test"))
  //   .pipe(gulp.dest('dist'));
});

gulp.task('clean:tmp', function () {
  return gulp.src('tmp/*')
    .pipe(stripDebug())
    .pipe(gulp.dest('dist'))
    .pipe(vinylPaths(del));
});

//只有改动的文件才会
gulp.task('changed', () =>
  gulp.src("tmp/*")
    .pipe($.changed("dist"))
    .pipe(gulp.dest("dist"))
);

//监听改动的文件
gulp.task('watch', () =>
  gulp.src("tmp/*")
    .pipe($.watch("tmp/*"))
    .pipe(gulp.dest("dist"))
);

//以下是试用minimist，获取从控制台传递的参数
var knownOptions = {
  string: 'env',
  default: {env: process.env.NODE_ENV || 'production'}
};

var options = minimist(process.argv.slice(2), knownOptions);

//可以在命令行中测试：gulp minimist --env development
gulp.task('minimist', function () {
  console.log(options);
  return gulp.src('tmp/*')
    .pipe($.if(options.env === 'production', $.uglify())) // 仅在生产环境时候进行压缩
    .pipe(gulp.dest('dist'));
});

//在一个任务中使用多个文件来源
gulp.task('merge', function () {
  var tmp = gulp.src('tmp/*.js')
    .pipe(gulp.dest('dist/tmp'));

  var test = gulp.src('test/*')
    .pipe(gulp.dest('dist/test'));

  return merge(tmp, test);
});
