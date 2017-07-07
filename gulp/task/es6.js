/**
 * Created by Administrator on 2017/7/7 0007.
 */
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var $ = require('gulp-load-plugins')();

// add custom browserify options here
var customOpts = {
  entries: ['./lib/spider-github.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle () {
  return b.bundle()
  // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

var entryArr = ['src/es6/*.js'];
function es6To5 (entryArr) {
  return gulp.src(entryArr)
    .pipe($.plumber())
    .pipe($.babel({
      // presets: ["es2015","stage-2"]
    }))
    .pipe(gulp.dest('dist/es5/'));
}

gulp.task('es6', function () {
  return es6To5(entryArr);
});

// gulp.task("default", function () {
//   var jsWathcer = gulp.watch(entryArr);
//   jsWathcer.on('change', function (path) {
//     console.log(path);
//     es6To5(path);
//   });
// });
