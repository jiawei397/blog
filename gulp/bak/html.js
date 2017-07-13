/**
 * Created by jw on 2016/11/2.
 */
var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var util = require("../utils/util");
var dataConfig = require('../config/data');
var EventEmitter = require("events").EventEmitter;
EventEmitter.defaultMaxListeners = dataConfig.defaultMaxListeners;

var distDir = dataConfig.dirs.dist;

var dev = {};//开发版本
var dist = {};//发布版本

/**
 * 获取js引用的字符串
 * @author jw
 * @date 2016-11-08
 * @param filePath 文件路径
 * @param index 要截取路径字符串的起始值
 */
var getJsStr = function (filePath, index, addStr) {
  console.log(filePath);
  addStr = addStr || '';
  return '<script src="' + addStr + filePath.substr(index) + '">' + '<' + '/script>';
};

/**
 * 获取CSS引用的字符串
 * @author jw
 * @date 2016-11-08
 * @param filePath 文件路径
 * @param index 要截取路径字符串的起始值
 */
var getCssStr = function (filePath, index, addStr) {
  console.log(filePath);
  addStr = addStr || '';
  return '<link rel="stylesheet" type="text/css" href="' + addStr + filePath.substr(index) + '"/>';
};

/**
 * 替换引用的js/css到html
 * @param {String} html 要注入的Html名称
 * @param {Array} arr [合并的插件Js,合并的appJs]  公用的Js已经在这里了
 * @author jw
 * @date 2016-11-14
 */
var injectFun = function (html, config) {
  var temp = gulp.src([html], {cwd: "./src/entry/"})
    .pipe($.inject(gulp.src(config.plugins, {read: false, cwd: config.pluginsJsDir}), {
      relative: true,
      starttag: "<!-- start:pluginsJs -->",
      endtag: "<!-- end:pluginsJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.tool, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:toolJs -->",
      endtag: "<!-- end:toolJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.t3d, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:t3dJs -->",
      endtag: "<!-- end:t3dJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.init, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:initJs -->",
      endtag: "<!-- end:initJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.server, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:serverJs -->",
      endtag: "<!-- end:serverJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.frontendConfigManager, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:frontendConfigManagerJs -->",
      endtag: "<!-- end:frontendConfigManagerJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.threeD, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:3dJs -->",
      endtag: "<!-- end:3dJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.u3d, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:u3dJs -->",
      endtag: "<!-- end:u3dJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.stateMachineCoreMinJs, {read: false, cwd: config.stateMachineJsDir}), {
      relative: true,
      starttag: "<!-- start:stateMachineCoreMinJs -->",
      endtag: "<!-- end:stateMachineCoreMinJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.stateMachineExtend, {read: false, cwd: config.stateMachineJsDir}), {
      relative: true,
      starttag: "<!-- start:stateMachineExtend -->",
      endtag: "<!-- end:stateMachineExtend -->",
      transform: config.transformJsFun
    }))
    // .pipe($.inject(gulp.src(config.stateMachineIdeJs, {read: false, cwd: config.stateMachineJsDir}), {
    //   relative: true,
    //   starttag: "<!-- start:stateMachineIdeJs -->",
    //   endtag: "<!-- end:stateMachineIdeJs -->",
    //   transform: config.transformJsFun
    // }))
    .pipe($.inject(gulp.src(config.gis, {read: false, cwd: config.gisCommonJsDir}), {
      relative: true,
      starttag: "<!-- start:gis-commonJs -->",
      endtag: "<!-- end:gis-commonJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.config, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:configJs -->",
      endtag: "<!-- end:configJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.uwebUtil, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:uwebUtilJs -->",
      endtag: "<!-- end:uwebUtilJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.uwebHome, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:uwebHomeJs -->",
      endtag: "<!-- end:uwebHomeJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.headJs, {read: false, cwd: config.jsDir}), {
      relative: true,
      starttag: "<!-- start:headJs -->",
      endtag: "<!-- end:headJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.app, {read: false, cwd: config.appDir}), {
      relative: true,
      starttag: "<!-- start:appJs -->",
      endtag: "<!-- end:appJs -->",
      transform: config.transformJsFun
    }))
    .pipe($.inject(gulp.src(config.headCss, {read: false, cwd: config.cssDir}), {
      relative: true,
      starttag: "<!-- start:headCss -->",
      endtag: "<!-- end:headCss -->",
      transform: config.transformCssFun
    }))
    .pipe($.inject(gulp.src(config.css, {read: false, cwd: config.cssDir}), {
      relative: true,
      starttag: "<!-- start:pluginsCss -->",
      endtag: "<!-- end:pluginsCss -->",
      transform: config.transformCssFun
    }));
  if (config.isMinHtml) {
    temp = temp.pipe($.htmlmin(dataConfig.htmlMinOptions));
  }
  if (config.rename) {
    temp = temp.pipe($.rename(config.rename));
  }
  return temp.pipe(gulp.dest(config.destDir));
};

dist.transformJsFun = function (filePath, file, i, length) {
  console.log(i, length);
  return getJsStr(filePath, ("../../" + distDir + "/").length);
};

dist.transformCssFun = function (filePath, file, i, length) {
  return getCssStr(filePath, ("../../" + distDir + "/").length);
};

dev.transformJsFun = function (filePath, file, i, length) {
  return getJsStr(filePath, "../dcv/".length);
};

dev.transformCssFun = function (filePath, file, i, length) {
  return getCssStr(filePath, "../dcv/".length);
};

dev.transformJsFun_stateMachine = function (filePath, file, i, length) {
  return getJsStr(filePath, "../dcv/javascripts/stateMachine/".length);
};

dev.transformCssFun_stateMachine = function (filePath, file, i, length) {
  return getCssStr(filePath, "../dcv/javascripts/stateMachine/".length);
};

dev.transformJsFun_control = function (filePath, file, i, length) {
  return getJsStr(filePath, '../dcv/'.length, "../../");
};

dev.transformCssFun_control = function (filePath, file, i, length) {
  return getCssStr(filePath, '../dcv/'.length, '../../');
};

dist.transformJsFun_control = function (filePath, file, i, length) {
  return getJsStr(filePath, ("../../" + distDir + "/").length, '../../');
};

dist.transformCssFun_control = function (filePath, file, i, length) {
  return getCssStr(filePath, ("../../" + distDir + "/").length, '../../');
};

// dist.transformJsFun_stateMachine = function (filePath, file, i, length) {
//   return getJsStr(filePath, "../../dist/javascripts/stateMachine/".length);
// };
//
// dist.transformCssFun_stateMachine = function (filePath, file, i, length) {
//   return getCssStr(filePath, "../../dist/javascripts/stateMachine/".length);
// };

/**
 * 压缩合并js
 * @author jw
 * @date 2016-11-08
 */
dist.concatJsFun = function (arr, name, cwd, dest) {
  cwd = cwd || dataConfig.dirs.dev;
  dest = dest || (distDir + "/js");
  return gulp.src(arr, {read: true, cwd: cwd})
  .pipe($.if(dataConfig.isMap, $.sourcemaps.init()))
    .pipe($.cache(
      $.uglify({
        compress: {
          drop_debugger: false//忽略debugger
        }
      }), {
        fileCache: dataConfig.fileCache,
        name: "concat"
      })
    )
    .pipe($.concat(name))
    .pipe($.if(dataConfig.isMap, $.sourcemaps.write(".")))
    .pipe(gulp.dest(dest));
};

/**
 * 压缩合并css
 * @author jw
 * @date 2016-11-08
 */
dist.concatCssFun = function (arr, name, cwd, dest) {
  cwd = cwd || dataConfig.dirs.dev;
  dest = dest || (distDir + "/css");
  return gulp.src(arr, {read: true, cwd: cwd})
    .pipe($.cache($.cleanCss(), {
      fileCache: dataConfig.fileCache,
      name: "concat"
    }))
    .pipe($.concat(name))
    .pipe(gulp.dest(dest));
};

/**
 * 发布版本，替换引用的js/css到html
 * @param {String} html 要注入的Html名称
 * @param {Array} arr [合并的插件Js,合并的appJs]
 * @author jw
 * @date 2016-11-08
 */
dist.injectReleaseFun = function (html, arr, config) {
  var defaultConfig = {
    //js
    tool: "tool.js",
    t3d: "t3d.js",
    init: "init.js",
    server: "server.js",
    frontendConfigManager: "frontendConfigManager.js",
    threeD: "3d.js",
    u3d: "u3d.js",
//    stateMachine: "stateMachine-eventLib.js",
    //状态机公用模块
    stateMachineCoreMinJs: "stateMachineCore.min.js",
    stateMachineExtend: "stateMachineExtend.min.js",

    config: "config.js",
    uwebUtil: "uwebUtil.js",
    uwebHome: "uwebHome.js",
    gis: gisCommonJsArr,
    plugins: arr[0],
    app: arr[1],
    headJs: "head.js",

    //css
    css: arr[2],
    headCss: headCssArr,

    //目录
    pluginsJsDir: distDir,
    jsDir: (distDir + "/js"),
    stateMachineJsDir: (distDir + "/javascripts/stateMachine/minjs"),
    gisCommonJsDir: distDir,
    appDir: (distDir + "/js"),
    cssDir: distDir,
    destDir: distDir,

    //转换函数
    transformJsFun: dist.transformJsFun,
    transformCssFun: dist.transformCssFun,

    //是否压缩html
    isMinHtml: true
  };
  return injectFun(html, util.combine(defaultConfig, config));
};

//公共模块
var toolJsArr = dataConfig.dirs.toolJsArr;
var initJsArr = dataConfig.dirs.initJsArr;
var t3dJsArr = dataConfig.dirs.t3dJsArr;
var serverJsArr = dataConfig.dirs.serverJsArr;
var threeDJsArr = dataConfig.dirs.threeDJsArr;
var u3dJsArr = dataConfig.dirs.u3dJsArr;
var configJsArr = dataConfig.dirs.configJsArr;
var uwebUtilJsArr = dataConfig.dirs.uwebUtilJsArr;
var uwebHomeJsArr = dataConfig.dirs.uwebHomeJsArr;

var frontendConfigManagerJsArr = dataConfig.dirs.frontendConfigManagerJsArr;

var homePluginJsArr = dataConfig.dirs.homePluginJsArr;
var homePluginCssArr = dataConfig.dirs.homePluginCssArr;

var gisCommonJsArr = dataConfig.dirs.gisCommonJsArr;

var homeAppJsArr = dataConfig.dirs.homeAppJsArr;

var gisPluginJsArr = homePluginJsArr;

var gisPluginCssArr = homePluginCssArr;

var gisAppJsArr = dataConfig.dirs.gisAppJsArr;

var threeDConfigPluginJsArr = dataConfig.dirs.threeDConfigPluginJsArr;

var threeDConfigAppJsArr = dataConfig.dirs.threeDConfigAppJsArr;

var threeDConfigCssArr = dataConfig.dirs.threeDConfigCssArr;

var portshowPluginsJsArr = dataConfig.dirs.portshowPluginsJsArr;
var portshowAppJsArr = dataConfig.dirs.portshowAppJsArr;
var portshowCssArr = dataConfig.dirs.portshowCssArr;

var listPluginsJsArr = dataConfig.dirs.listPluginsJsArr;
var listPluginsCssArr = dataConfig.dirs.listPluginsCssArr;
var listAppJsArr = dataConfig.dirs.listAppJsArr;

var managerPluginsJsArr = dataConfig.dirs.managerPluginsJsArr;
var managerPluginsCssArr = dataConfig.dirs.managerPluginsCssArr;
var managerAppJsArr = dataConfig.dirs.managerAppJsArr;

var resourcesPluginsJsArr = dataConfig.dirs.resourcesPluginsJsArr;
var resourcesPluginsCssArr = dataConfig.dirs.resourcesPluginsCssArr;
var resourcesAppJsArr = dataConfig.dirs.resourcesAppJsArr;

var controlPluginsJsArr = dataConfig.dirs.controlPluginsJsArr;
var controlPluginsCssArr = dataConfig.dirs.controlPluginsCssArr;
var controlAppJsArr = dataConfig.dirs.controlAppJsArr;

var headCssArr = dataConfig.dirs.headCssArr;
var headJsArr = dataConfig.dirs.headJsArr;

var givmappingPluginsCssArr = dataConfig.dirs.givmappingPluginsCssArr;
var givmappingPluginsJsArr = dataConfig.dirs.givmappingPluginsJsArr;
var givmappingAppJsArr = dataConfig.dirs.givmappingAppJsArr;

var givListPluginsCssArr = dataConfig.dirs.givListPluginsCssArr;
var givListPluginsJsArr = dataConfig.dirs.givListPluginsJsArr;
var givListAppJsArr = dataConfig.dirs.givListAppJsArr;

//状态机公用文件
var stateMachineCoreMinJsArr = dataConfig.dirs.stateMachineCoreMinJsArr;
var stateMachineExtendJsArr = dataConfig.dirs.stateMachineExtendJsArr;

// var stateMachinePluginsJsArr = dataConfig.dirs.stateMachinePluginsJsArr;

//状态机单独需要的文件
// var stateMachineIdeJsArr = dataConfig.dirs.stateMachineIdeJsArr;
//
// var stateMachineAppJsArr = [];

// var stateMachineCssArr = dataConfig.dirs.stateMachineCssArr;

/**
 * 3D可视化引用js替换注入
 * @author jw
 * @date 2016-11-08
 */
dev.injectImportFun = function (html, arr, config) {
  var dir = dataConfig.dirs.dev;
  var defaultConfig = {
    //js
    tool: toolJsArr,
    t3d: t3dJsArr,
    init: initJsArr,
    server: serverJsArr,
    frontendConfigManager: frontendConfigManagerJsArr,
    threeD: threeDJsArr,
    u3d: u3dJsArr,
    config: configJsArr,
    uwebUtil: uwebUtilJsArr,
    uwebHome: uwebHomeJsArr,

    //状态机公用模块
    stateMachineCoreMinJs: stateMachineCoreMinJsArr,
    stateMachineExtend: stateMachineExtendJsArr,

    gis: gisCommonJsArr,
    plugins: arr[0],
    app: arr[1],
    headJs: headJsArr,

    //css
    css: arr[2],
    headCss: headCssArr,

    //目录
    pluginsJsDir: dir,
    jsDir: dir,
    appDir: dir,
    stateMachineJsDir: (dataConfig.dirs.dev + "/javascripts/stateMachine"),
    gisCommonJsDir: dir,
    cssDir: dir,
    destDir: dir,

    //转换函数
    transformJsFun: dev.transformJsFun,
    transformCssFun: dev.transformCssFun,

    //是否压缩html
    isMinHtml: false
  };
  return injectFun(html, util.combine(defaultConfig, config));
};

gulp.task("inject:home", function () {
  return dev.injectImportFun("home.html", [homePluginJsArr, homeAppJsArr, homePluginCssArr]);
});

gulp.task("inject:gis", function () {
  return dev.injectImportFun("gis.html", [gisPluginJsArr, gisAppJsArr, gisPluginCssArr]);
});

gulp.task("inject:3dConfig", function () {
  return dev.injectImportFun("configure.html", [threeDConfigPluginJsArr, threeDConfigAppJsArr, threeDConfigCssArr]);
});

gulp.task("inject:portshow", function () {
  return dev.injectImportFun("portshow.html", [portshowPluginsJsArr, portshowAppJsArr, portshowCssArr]);
});

gulp.task("inject:list", function () {
  return dev.injectImportFun("list.html", [listPluginsJsArr, listAppJsArr, listPluginsCssArr]);
});

gulp.task("inject:manager", function () {
  return dev.injectImportFun("manager.html", [managerPluginsJsArr, managerAppJsArr, managerPluginsCssArr]);
});

gulp.task("inject:resources", function () {
  return dev.injectImportFun("resources.html", [resourcesPluginsJsArr, resourcesAppJsArr, resourcesPluginsCssArr]);
});

gulp.task("inject:dcControl", function () {
  var dir = dataConfig.dirs.dev;
  return dev.injectImportFun("dcControl.html", [controlPluginsJsArr, controlAppJsArr, controlPluginsCssArr], {
    pluginsJsDir: dir,
    appDir: dir,
    cssDir: dir,
    destDir: (dataConfig.dirs.dev + "/views/admin"),

    //转换函数
    transformJsFun: dev.transformJsFun_control,
    transformCssFun: dev.transformCssFun_control
  });
});

gulp.task("inject:givTMapping", function () {
  return dev.injectImportFun("givTMapping.html", [givmappingPluginsJsArr, givmappingAppJsArr, givmappingPluginsCssArr]);
});

gulp.task("inject:givList", function () {
  return dev.injectImportFun("givList.html", [givListPluginsJsArr, givListAppJsArr, givListPluginsCssArr]);
});

gulp.task("concat:initJs", function () {
  var index = initJsArr.indexOf("javascripts/3d/_init_.js");
  initJsArr.splice(index + 1, 0, "../entry/_dist_init_.js");//插入重写t3djs.basePath等路径
  return dist.concatJsFun(initJsArr, "init.js");
});

//合并3d
gulp.task("concat:3dJs", function () {
  return dist.concatJsFun(threeDJsArr, "3d.js");
});

gulp.task("concat:toolJs", function () {
  return dist.concatJsFun(toolJsArr, "tool.js");
});

gulp.task("concat:t3dJs", function () {
  return dist.concatJsFun(t3dJsArr, "t3d.js");
});

gulp.task("concat:u3dJs", function () {
  return dist.concatJsFun(u3dJsArr, "u3d.js");
});

gulp.task("concat:serverJs", function () {
  return dist.concatJsFun(serverJsArr, "server.js");
});

gulp.task("concat:frontendConfigManagerJs", function () {
  return dist.concatJsFun(frontendConfigManagerJsArr, "frontendConfigManager.js");
});

gulp.task("concat:configJs", function () {
  // return dist.concatJsFun(configJsArr,"config.js");
  //config.js暂时先不压缩
  configJsArr.splice(1, 1);
  return gulp.src(configJsArr, {read: true, cwd: dataConfig.dirs.dev})
    .pipe($.concat("config.js"))
    .pipe(gulp.dest(distDir + "/js"));
});

gulp.task("concat:uwebUtilJs", function () {
  return dist.concatJsFun(uwebUtilJsArr, "uwebUtil.js");
});

gulp.task("concat:uwebHomeJs", function () {
  return dist.concatJsFun(uwebHomeJsArr, "uwebHome.js");
});

gulp.task("concat:head", function () {
  return dist.concatJsFun(headJsArr, "head.js");
});

//公用的状态机js文件
// gulp.task("concat:home-pluginsJs", function () {
//   return dist.concatJsFun(homePluginJsArr,"home-plugins.js");
// });

gulp.task("concat:home-app", function () {
  return dist.concatJsFun(homeAppJsArr, "home-app.js");
});

// gulp.task("concat:home-css", function () {
//   return dist.concatCssFun(homePluginCssArr,"home.css");
// });

// gulp.task("concat:gis-pluginsJs", function () {
//   return dist.concatJsFun(gisPluginJsArr,"gis-plugins.js");
// });

gulp.task("concat:gis-app", function () {
  return dist.concatJsFun(gisAppJsArr, "gis-app.js");
});

// gulp.task("concat:gis-css", function () {
//   return dist.concatCssFun(gisPluginCssArr,"gis.css");
// });

// gulp.task("concat:3dConfig-pluginsJs", function () {
//   return dist.concatJsFun(threeDConfigPluginJsArr,"3dConfig-plugins.js");
// });

gulp.task("concat:3dConfig-app", function () {
  return dist.concatJsFun(threeDConfigAppJsArr, "3dConfig-app.js");
});

// gulp.task("concat:3dConfig-css", function () {
//   return dist.concatCssFun(threeDConfigCssArr,"3dConfig.css");
// });

// gulp.task("concat:list-pluginsJs", function () {
//   return dist.concatJsFun(listPluginsJsArr,"list-plugins.js");
// });

gulp.task("concat:list-app", function () {
  return dist.concatJsFun(listAppJsArr, "list-app.js");
});

gulp.task("concat:manager-app", function () {
  return dist.concatJsFun(managerAppJsArr, "manager-app.js");
});

gulp.task("concat:resources-app", function () {
  return dist.concatJsFun(resourcesAppJsArr, "resources-app.js");
});

gulp.task("concat:dcControl-app", function () {
  return dist.concatJsFun(controlAppJsArr, "dcControl-app.js");
});

gulp.task("concat:portshow-app", function () {
  return dist.concatJsFun(portshowAppJsArr, "portshow-app.js");
});
gulp.task("concat:givList-app", function () {
  return dist.concatJsFun(givListAppJsArr, "givList-app.js");
});

gulp.task("concat:givTMapping-app", function () {
  return dist.concatJsFun(givmappingAppJsArr, "givTMapping-app.js");
});

// gulp.task("concat:list-css", function () {
//   return dist.concatCssFun(listPluginsCssArr,"list.css");
// });

gulp.task("inject:release-home", function () {
  return dist.injectReleaseFun("home.html", [homePluginJsArr, "home-app.js", homePluginCssArr], {
    // stateMachine: stateMachineDistJsArr,
    // isMinHtml: false
  });
});

gulp.task("inject:release-gis", function () {
  return dist.injectReleaseFun("gis.html", [gisPluginJsArr, "gis-app.js", gisPluginCssArr]);
});

gulp.task("inject:release-3dConfig", function () {
  return dist.injectReleaseFun("configure.html", [threeDConfigPluginJsArr, "3dConfig-app.js", threeDConfigCssArr]);
});

gulp.task("inject:release-list", function () {
  return dist.injectReleaseFun("list.html", [listPluginsJsArr, "list-app.js", listPluginsCssArr]);
});

gulp.task("inject:release-manager", function () {
  return dist.injectReleaseFun("manager.html", [managerPluginsJsArr, "manager-app.js", managerPluginsCssArr]);
});

gulp.task("inject:release-resources", function () {
  return dist.injectReleaseFun("resources.html", [resourcesPluginsJsArr, "resources-app.js", resourcesPluginsCssArr]);
});

gulp.task("inject:release-portshow", function () {
  return dist.injectReleaseFun("portshow.html", [portshowPluginsJsArr, "portshow-app.js", portshowCssArr]);
});

gulp.task("inject:release-dcControl", function () {
  var dir = distDir;
  return dist.injectReleaseFun("dcControl.html", [controlPluginsJsArr, "dcControl-app.js", controlPluginsCssArr], {
    pluginsJsDir: dir,
    appDir: dir + "/js",
    cssDir: dir,
    destDir: (distDir + "/views/admin"),

    //转换函数
    transformJsFun: dist.transformJsFun_control,
    transformCssFun: dist.transformCssFun_control
  });
});

gulp.task("inject:release-givTMapping", function () {
  return dist.injectReleaseFun("givTMapping.html", [givmappingPluginsJsArr, "givTMapping-app.js", givmappingPluginsCssArr]);
});

gulp.task("inject:release-givList", function () {
  return dist.injectReleaseFun("givList.html", [givListPluginsJsArr, "givList-app.js", givListPluginsCssArr]);
});

gulp.task("concat-all",
  gulp.parallel(
    "concat:toolJs", "concat:t3dJs", "concat:initJs", "concat:serverJs", "concat:frontendConfigManagerJs", "concat:3dJs", "concat:u3dJs", "concat:configJs", "concat:uwebUtilJs", "concat:uwebHomeJs",
    // "concat:home-pluginsJs",
    "concat:head",
    "concat:home-app",
    // "concat:list-pluginsJs",
    "concat:list-app",
    "concat:manager-app",
    "concat:resources-app",
    "concat:dcControl-app",
    // "concat:gis-pluginsJs",
    // "concat:gis-app",
    "concat:portshow-app",
    "concat:givList-app",
    "concat:givTMapping-app",
    // "concat:3dConfig-pluginsJs",
    "concat:3dConfig-app"));

/**
 * 注入引用
 */
gulp.task("inject-all",
  gulp.parallel("inject:home",
    "inject:list",
    "inject:manager",
    "inject:resources",
    "inject:dcControl",
    "inject:portshow",
    "inject:gis",
    "inject:3dConfig",
    "inject:givTMapping",
    "inject:givList"
  )
);
/**
 * 注入状态机引用
 */
// gulp.task("inject-release-stateMachineExtend", );
/**
 * 注入引用
 * @author jw
 * @date 2016-11-14
 */
gulp.task("inject-release-all",
  gulp.parallel(
    "inject:release-home",
    "inject:release-list",
    "inject:release-manager",
    "inject:release-resources",
    "inject:release-dcControl",
    "inject:release-givTMapping",
    "inject:release-givList",
    "inject:release-portshow",
    // "inject:release-gis",
//    "inject:release-stateMachine",
    "inject:release-3dConfig"
  )
);

/**
 * 发布版本，打包
 */
gulp.task("build",
  gulp.series(
    // "clear",
    "copy",
    gulp.parallel("css", "htmlmin", "script", "image", "concat-all"),
    gulp.parallel("inject-release-all", "delEmptyDir")
  )
);

/**
 * 发布版本，打包并压缩
 */
// gulp.task("build-zip",
//   gulp.series(
//     "build",
//     gulp.parallel("zip", "zipMap")
//   )
// );

//测试版本，包括map文件
gulp.task("build-zip-all",
  gulp.series(
    "build",
    "zip-all"
  )
);

/**
 * 发布版本，打包，压缩，并清除dist文件夹
 */
// gulp.task("build-zip-clear",
//   gulp.series(
//     // "clear",
//     "build-zip",
//     "clear"
//   )
// );
