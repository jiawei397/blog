/**
 * 此类专门用来压缩图层面板包
 * @author jw
 * @date 2017-04-01
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var rename = require("gulp-rename");
var dateFormat = require('dateformat');
var dataConfig = require('../config/data');

gulp.task('zipFrame', function () {
  var filePath = dataConfig.dirs.framePath;
  var fileName = dataConfig.dirs.frameName;
  return zipFrame(fileName, filePath, filePath);
});

/**
 * @param {String} fileName 要压缩的js文件名称
 * @param {String} filePath 要压缩的js文件路径
 * @param {String} destPath 压缩后的zip包路径
 * @author jw
 * @date 2017-04-01
 */
function zipFrame (fileName, filePath, destPath) {
  filePath = filePath || 'frame/';
  destPath = destPath || 'frame';
  var zipName = fileName + '_' + dateFormat(new Date(), "yyyymmdd") + '.zip';
  return gulp.src([filePath + fileName + '.js'])
    .pipe(uglify())
    .pipe(rename('frame.js'))
    .pipe(zip(zipName))
    .pipe(gulp.dest(destPath));
}
