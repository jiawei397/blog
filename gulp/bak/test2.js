/**
 * Created by jw on 2016/11/2 0002.
 */
var gulp = require('gulp');
var lazypipe = require('lazypipe');//用来整合stream流
var $ = require('gulp-load-plugins')();
var rev = require('gulp-rev-append');
var browserSync = require('browser-sync');
const reload = browserSync.reload;
var wiredep = require('wiredep').stream; //把bower 下载的文件引入到html文件中
// var htmlmin = require("gulp-htmlmin");
// var babel = require("gulp-babel");
// var jsImport = require('gulp-js-import');
var spider = require('../../hello/pachong/spider-github2');

var options = {
    removeComments: false,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
    minifyJS: false,//压缩页面里的JS
    minifyCSS: false//压缩页面里的CSS
};

var eslintUglify = lazypipe()
    .pipe($.eslint, {configFle: "./.eslintrc"})
    .pipe($.eslint.format)
    .pipe($.uglify);

gulp.task('import', function () {
    return gulp.src('hello/es6/*.js')
        .pipe($.jsImport())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('es2js', function () {
    return gulp.src(['hello/es6/*.js']) //指定的校验路径
        .pipe($.babel({
            // presets: ['es2015']
            plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('useref', function () {
    return gulp.src('src/test.html')
        .pipe($.useref())
        // .pipe($.useref({},lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cleanCss()))
        .pipe(rev())       //为引用添加版本号
        // .pipe($.sourcemaps.write('maps'))
        .pipe($.if('*.html', $.htmlmin(options)))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
    browserSync({
        notify: false,
        port: 9000,  //端口号
        server: {
            baseDir: ['src'], //确定根目录
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([      //监测文件变化 实行重新加载
        'src/*.html',
        'src/images/**/*'
    ]).on('change', function (path) {
        console.log(path);
        if (path.endsWith('.html')) {
            gulp.src(path)
                .pipe($.useref({}, lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
                .pipe($.if('*.js', $.uglify()))
                .pipe($.if('*.css', $.cleanCss()))
                .pipe($.sourcemaps.write('maps'))
                .pipe($.if('*.html', $.htmlmin(options)))
                .pipe(gulp.dest('dist'))
                .pipe(reload({stream: true}));
        }
    });

    // gulp.watch('app/styles/**/*.scss' , ['styles']); //监测变化 执行styles任务
    // gulp.watch('app/scripts/**/*.js' , ['scripts']);
    // gulp.watch('app/fonts/**/*' , ['fonts']);
    // gulp.watch('bower.json' , ['wiredep','fonts']);
});

gulp.task('wiredep_test', function () {
    return gulp.src('./src/entry/wirdep.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
            ,ignorePath:/^(\.\.\/)+/      //生成的路径忽略../
        }))
        .pipe(gulp.dest('./dist'));    //输出到原路径
});

gulp.task('eslint', function () {
    return gulp.src('src/js2/app.js') //指定的校验路径
        .pipe(eslintUglify())
        .pipe(gulp.dest('dist'));
    // .pipe($.eslint.format());
    // .pipe(eslint.failAfterError());
});

gulp.task('compile-sass', function () {
    return gulp.src('bower_components/bootstrap-sass/assets/stylesheets/*.scss')
        .pipe($.sass())
        .pipe(gulp.dest('dist/css2'));
});

// 静态服务器
gulp.task('browser-sync-server', function () {
    browserSync.create().init({
        server: {
            baseDir: "./src"
        }
    });
});

// 代理
// gulp.task('browser-sync-proxy', function() {
//     browserSync.create().init({
//         proxy: "你的域名或IP"
//     });
// });

/**
 * 为js和css增加编号
 * @author jw
 * @date 2017-05-27
 */
gulp.task('md5', function (done) {
    return gulp.src(['dist/scripts/*.js', 'dist/css/*.css'])
        .pipe($.md5Plus(10, 'dist/test.html'))
        .pipe($.if('*.js', gulp.dest('dist/scripts')))
        .pipe($.if('*.css', gulp.dest('dist/css')))
        .on('end', done);
});

gulp.task('userf-md5', gulp.series('useref', 'md5'));

gulp.task('base64', function () {
    return gulp.src("src/css/style.css")
        .pipe($.cssBase64({
            // baseDir:"src/css",
            extensions: ['png'],
            maxImageSize: 20 * 1024
        }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('spider', function () {
    return spider('./test.txt');
});