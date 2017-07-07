/**
 * Created by jw on 2016/11/2 0002.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var fs = require('fs');
var del = require('del');
var dateFormat = require('dateformat');
// var lazypipe = require('lazypipe');
var delEmptyDir = require('../plugins/delEmptyDir/index');
// var gzip = require('../plugins/myGzip');
var i18n = require("../utils/i18n");
var dataConfig = require('../config/data');

var unInDirs = dataConfig.dirs.unInDirs;
var distDir = dataConfig.dirs.dist;
var devDir = dataConfig.dirs.dev;

var copyDirs = [devDir + '/**/*', '!' + devDir + '/**/*.(png|gif|jpg|css|js|less|sass|scss|html)'].concat(unInDirs);
var scriptDirs = [
  devDir + '/plugins/**/*.js',
  devDir + '/uGeo/**/*.js',
  devDir + '/projects/**/*.js', '!' + devDir + '/projects/config.js', '!' + devDir + '/projects/userConfig.js',
  devDir + '/**/ui/**/*.js',
  devDir + '/**/stateMachine/**/*.js'
].concat(unInDirs);

var cssDirs = [devDir + '/**/*.css'].concat(unInDirs);
var imageDirs = [devDir + '/**/*.png', devDir + '/**/*.gif', devDir + '/**/*.jpg'].concat(unInDirs);
var htmlMinDirs = [devDir + "/**/*.html", "!" + devDir + "/*.html", "!" + devDir + "/views/admin/*.html", devDir + "/play.html"].concat(unInDirs);

$._i18nFun = function (language) {
  var path = 'src/entry/dcv-all.json';
  var dest = "src/dcv/javascripts/language";
  var type = "json";
  return i18n(path, language, dest, type);
};

$.scriptFun = function (scriptDirs, condition) {
  if (!condition) {
    condition = function () {
      return true;
    };
  }
  return gulp.src(scriptDirs, {base: devDir})
    .pipe($.if(condition, $.cache($.uglify(), {
      fileCache: dataConfig.fileCache,
      name: 'js'
    })))
    .pipe(gulp.dest(distDir));
};

$.cssFun = function (cssDirs, condition) {
  if (!condition) {
    condition = function () {
      return true;
    };
  }
  return gulp.src(cssDirs, {
    base: devDir
  })
    // .pipe($.if(condition, $.cache($.cleanCss(), {
    //   fileCache: dataConfig.fileCache,
    //   name: 'css'
    // })))
    .pipe($.cleanCss())
    .pipe(gulp.dest(distDir));
};

$.imageFun = function (imageDirs) {
  return gulp.src(imageDirs, {
    base: devDir
  })
    .pipe($.cache($.imagemin(dataConfig.imageMinOptions), {
      fileCache: dataConfig.fileCache,
      name: 'image'
    }))
    .pipe(gulp.dest(distDir));
};

$.htmlMinFun = function (htmlDirs, condition) {
  if (!condition) {
    condition = function () {
      return true;
    };
  }
  return gulp.src(htmlDirs, {base: devDir})
    .pipe($.if(condition, $.htmlmin(dataConfig.htmlMinOptions)))
    .pipe(gulp.dest(distDir));
};

$.copyFun = function (copyDirs) {
  return gulp.src(copyDirs, {
    base: devDir
  })
    .pipe(gulp.dest(distDir));
};

$.eslintFun = function (dirs) {
  return gulp.src(dirs) //指定的校验路径
    .pipe($.eslint({configFle: "./.eslintrc"}))
    // .pipe($.cache($.eslint({configFle: "./.eslintrc"}), {
    //   fileCache: dataConfig.fileCache,
    //   name: '$.eslint',
    //   success: function (result) {
    //     return result.$.eslint.messages.length == 0;
    //   }
    // })) //使用你的eslint校验文件
    .pipe($.eslint.format());
  // .pipe($.eslint.failAfterError());
};

gulp.task('eslint', function () {
  return $.eslintFun('src/dcv/javascripts/3d/t3djs3/base.js');
});

gulp.task("i18n_zh", function () {
  return $._i18nFun('zh');
});

gulp.task("i18n_en", function () {
  return $._i18nFun('en');
});

/**
 * 国际化文件
 * @author jw
 * @date 2017-05-19
 */
gulp.task("i18n", gulp.parallel('i18n_zh', 'i18n_en'));

/**
 * 删除空文件夹
 * @author jw
 * @date 2017-03-14
 */
gulp.task('delEmptyDir', function () {
  return delEmptyDir(distDir);
});

// 复制工程
gulp.task('copy', function () {
  return $.copyFun(copyDirs);
});

// 压缩js
gulp.task('script', function () {
  var condition = function (f) {
    if (f.path.endsWith('.min.js')
      || f.path.indexOf('stateMachine') != -1) { //状态机此目录下几个js文件压缩报错
      return false;
    }
    return true;
  };
  return $.scriptFun(scriptDirs, condition);
});

//压缩css
gulp.task('css', function () {
  var condition = function (f) {
    if (f.path.endsWith('.min.css')) {
      return false;
    }
    return true;
  };
  return $.cssFun(cssDirs, condition);
});

//压缩image
gulp.task('image', function () {
  return $.imageFun(imageDirs);
});

//压缩Html
gulp.task("htmlmin", function () {
  var condition = function (f) {
    if (f.path.indexOf("frontendConfigManager") != -1 || f.path.indexOf("\\ui\\") != -1 || f.path.indexOf("\\fonts\\") != -1) {
      return false;
    }
    return true;
  };
  return $.htmlMinFun(htmlMinDirs, condition);
});

//删除dist文件夹
gulp.task('clear', function () {
  return del(distDir);
});

gulp.task('deleteDir', function () {
  return del([
    devDir + '/javascripts/**/*- 副本.js',
    devDir + '/javascripts/**/Copy of*.js'
  ]);
});

// gulp.task('gzip', function () {
//   return gulp.src('dist/js/*.js')
//     .pipe(gzip({
//       skipGrowingFiles: true,
//       suffix: 'gzjs'
//     }))
//     .pipe(gulp.dest('static'));
// });

//压缩成zip包
gulp.task('zip', function () {
  var filename = dateFormat(new Date(), "yyyy_mm_dd_HH_MM");
  return gulp.src([distDir + '/**/*', '!' + distDir + '/**/*.js.map'])
    .pipe($.zip('dcv_' + filename + '.zip'))
    .pipe(gulp.dest(dataConfig.dirs.zip))
    .pipe($.notify({message: 'dcv压缩完成'}));
});

//保留对应的map文件，查错使用
gulp.task('zipMap', function () {
  var filename = dateFormat(new Date(), "yyyy_mm_dd_HH_MM");
  return gulp.src([distDir + '/**/*.js.map'])
    .pipe($.zip('map_' + filename + '.zip'))
    .pipe(gulp.dest(dataConfig.dirs.zip))
    .pipe($.notify({message: 'map压缩完成'}));
});

//压缩所有的包，包括map文件
gulp.task('zip-all', function () {
  var filename = dateFormat(new Date(), "yyyy_mm_dd_HH_MM");
  return gulp.src([distDir + '/**/*'])
    .pipe($.zip('dcv_' + filename + '.zip'))
    .pipe(gulp.dest(dataConfig.dirs.zip))
    .pipe($.notify({message: 'dcv压缩完成'}));
});

/**
 * 监听文件变化，对应修改到部署目录
 * @author jw
 * @date 2017-05-27
 */
gulp.task('default', function () {
  gulp.watch([devDir + "/**/*"].concat(unInDirs)).on('unlink', function (pathStr) {
    console.log('删除了文件：' + pathStr);
    var distFile = distDir + "/" + path.relative(devDir, pathStr); //计算相对路径
    fs.existsSync(distFile) && fs.unlink(distFile, function () {
      console.log('删除成功：' + distFile);
    });
  });

  gulp.watch(imageDirs).on('all', function (event, pathStr, stats) {
    console.log('File ' + pathStr + ' was ' + event + ', running tasks...');
    if (event != 'unlink') { //修改或新增
      $.imageFun(pathStr);
    }
  });

  gulp.watch(scriptDirs).on('all', function (event, pathStr, stats) {
    console.log('File ' + pathStr + ' was ' + event + ', running tasks...');
    if (event && event != 'unlink' && pathStr.endsWith('.js')) { //修改或新增
      $.scriptFun(pathStr);
    }
  });

  gulp.watch(cssDirs).on('all', function (event, pathStr, stats) {
    console.log('File ' + pathStr + ' was ' + event + ', running tasks...');
    if (event != 'unlink') { //修改或新增
      $.cssFun(pathStr);
    }
  });

  gulp.watch(htmlMinDirs).on('all', function (event, pathStr, stats) {
    console.log('File ' + pathStr + ' was ' + event + ', running tasks...');
    if (event != 'unlink') { //修改或新增
      $.htmlMinFun(pathStr);
    }
  });

  gulp.watch(copyDirs).on('all', function (event, pathStr, stats) {
    console.log('File ' + pathStr + ' was ' + event + ', running tasks...');
    if (event != 'unlink' && !pathStr.endsWith('_tmp___')) { //修改或新增
      $.copyFun(pathStr);
      console.error('复制文件成功：' + pathStr);
    }
  });

  gulp.watch(dataConfig.dirs.entryHtml).on('change', function (pathStr) {
    console.log('修改了html：' + pathStr);
    gulp.parallel('inject-release-all')();
  });

  gulp.watch(dataConfig.dirs.i18n).on('change', function (pathStr) {
    gulp.parallel('i18n')();
  });

  var jsArr = [];
  for (var key in dataConfig.dirs) {
    var tempArr = dataConfig.dirs[key];
    if (typeof tempArr == 'string' || key == "unInDirs" || key.toLowerCase().indexOf('plugin') != -1 || key.toLowerCase().indexOf('stateMachine') != -1 || !tempArr[0]) {
      continue;
    }
    if (tempArr[0].endsWith('.js')) {
      tempArr.map(function (str) {
        str = devDir + "/" + str;
        jsArr.push(str);
      });
    }
  }
  gulp.watch(jsArr).on('change', function (pathStr) {
    $.eslintFun(pathStr).pipe($.eslint.results(results => {
      console.log(`Total Results: ${results.length}`);
      console.log(`Total Warnings: ${results.warningCount}`);
      console.log(`Total Errors: ${results.errorCount}`);
      if (results.errorCount == 0) {
        gulp.parallel('concat-all')();
      } else {
        $.notify({message: '有错误：' + results.errorCount});
      }
    }));
  });
});
