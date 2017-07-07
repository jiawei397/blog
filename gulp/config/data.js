var Cache = require('cache-swap');

var defaultOptions = {
  "name": "gulp",
  "author": "jw",
  "private": true,
  "fileCache": new Cache({
    "cacheDirName": "dcv-tarsier",
    "tmpDir": "D:\\Documents\\gulp-cache"
  }),
  "defaultMaxListeners": 20,
  "isMap": false, //是否压缩源码的map
  "dirs": {
    "dev": "src/dcv", //必须是相对路径
    "entryHtml": "src/entry/*.html", //必须是相对路径
    "i18n": "src/entry/dcv-all.json", //必须是相对路径
    "dist": "../dcv-web/dcv", //必须是相对路径，一般为dist
    "zip": "zip",
    "framePath": "frame\\面板\\",
    "frameName": "面板_基础信息",
    // "dist":"dist",
    "unInDirs": [
      "!src/dcv/**/stateMachine/extend/**/*",
      "!src/dcv/**/stateMachine_Source/**/*",
      "!src/dcv/**/stateMachine/docs/**/*",
      "!src/dcv/tx/**/*",
      "!src/dcv/**/stateMachine/updateJs/**/*",
      "!src/dcv/**/stateMachine/_init_.js", //不包含状态机
      "!src/dcv/**/*_dev/**/*",
      // "!src/dcv/**/*uGeo/**/*",//gis相关这次先不要了
      // "!src/dcv/**/projects/**/*",
      "!src/dcv/**/digger2/**/*",
      "!src/dcv/**/Earth_V1/**/*",
      "!src/dcv/**/moon_V1/**/*",
      "!src/dcv/javascripts/**/bk/*.js",
      "!src/dcv/javascripts/**/*- 副本.js",
      "!src/dcv/javascripts/**/Copy of*.js"
    ],
    "homePluginJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery-ajax-cache.js",
      "plugins/jquery/jquery.ba-resize.js",
      "plugins/jquery/chosen.jquery.js",
      "plugins/jquery/simplePage.js",
      "plugins/jstree/jstree.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.core-3.5.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.excheck-3.5.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.exedit-3.5.js",
      "plugins/Colorpicke/spectrum.js",
      "plugins/handlebars/handlebars.js",
      "plugins/Timeline/Timeline.js",
      "plugins/layer/layer.js",
      "plugins/encrypt/uuid.js",
      "plugins/datepicker/WdatePicker.js",
      "plugins/soundmanager/script/soundmanager2-jsmin.js"
    ],
    "homePluginCssArr": [
      "plugins/font-awesome-4.2.0/css/font-awesome.css",
      "plugins/Colorpicke/spectrum.css",
      "plugins/Timeline/timeline.css"
      // "resource/css/base.css",
      // "resource/css/home.css",
      // "resource/css/chosen.css",
      // "resource/css/jsTree_style.css"
    ],
    "toolJsArr": [
      "javascripts/uinv.js",
      "javascripts/uinv_util.js"
    ],
    "initJsArr": [
      "javascripts/ver.js",
      "javascripts/3d/_init_.js",
      //layerpool
      "javascripts/language/layerpool.js"
    ],
    "threeDJsArr": [
      //3d
      "javascripts/3d/userMakerDataVersion.js",
      "javascripts/3d/videoCardInfo.js",
      //base
      "javascripts/3d/base/interface_dependent_t3djs.js",
      "javascripts/3d/base/timer.js",
      "javascripts/3d/base/tools/common_tools.js",
      "javascripts/3d/base/product_lib.js",
      "javascripts/3d/base/pause.js",
      "javascripts/3d/base/input.js",
      "javascripts/3d/base/mat_text.js",
      "javascripts/3d/base/obj_factory.js",
      "javascripts/3d/base/obj_base.js",
      "javascripts/3d/base/obj_base_noNode.js",
      "javascripts/3d/base/obj_placement.js",
      "javascripts/3d/base/obj_manual.js",
      "javascripts/3d/base/obj_billboard.js",
      "javascripts/3d/base/obj_moniterPanel.js",
      "javascripts/3d/base/obj_building.js",
      "javascripts/3d/base/widget_base.js",
      "javascripts/3d/base/widget_lib.js",
      "javascripts/3d/base/widget_menu.js",
      "javascripts/3d/base/widget_menu_rainbow.js",
      "javascripts/3d/base/widget_menu_rainbow_2.js",
      "javascripts/3d/base/modifier_base.js",
      "javascripts/3d/base/modifier_lib.js",
      "javascripts/3d/base/tools/JSRuner.js",
      "javascripts/3d/base/tools/config_tools.js",
      "javascripts/3d/base/tools/effect_tools.js",
      "javascripts/3d/base/tools/scene_builder.js",
      "javascripts/3d/base/tools/selection_tools.js",
      "javascripts/3d/base/tools/camera_tools.js",
      "javascripts/3d/base/tools/contextMenu_tools.js",
      "javascripts/3d/base/tools/layer_tools.js",
      "javascripts/3d/base/tools/search_tools.js",
      "javascripts/3d/base/tools/monitor_tools.js",
      "javascripts/3d/base/tools/alarm_tools.js",
      "javascripts/3d/base/tools/note_tools.js",
      "javascripts/3d/base/tools/volume_tools.js",
      "javascripts/3d/base/tools/historyTools.js",
      "javascripts/3d/base/widget_miniMap.js",
      "javascripts/3d/base/state_manager.js",
      "javascripts/3d/base/state_base.js",
      "javascripts/3d/base/app.js",
      "javascripts/3d/base/tools/contextMenu_lib.js",
      "javascripts/3d/base/tools/contextMenu_setup.js",
      "javascripts/3d/base/tools/layer_lib.js",
      "javascripts/3d/base/tools/layerGroup_lib.js",
      "javascripts/3d/base/tools/layer_setup.js",
      "javascripts/3d/base/tools/sceneControlTools_lib.js",
      "javascripts/3d/base/tools/sceneControlTools_setup.js",
      "javascripts/3d/base/tools/snapshot_tools.js",
      "javascripts/3d/base/tools/objInfoDebug_tools.js",
      "javascripts/3d/base/tools/snapshot_anim_tools.js",
      //comp
      "javascripts/3d/comp/obj/obj_device.js",
      "javascripts/3d/comp/obj/obj_vm.js",
      "javascripts/3d/comp/obj/obj_cabinet.js",
      "javascripts/3d/comp/obj/obj_rack.js",
      "javascripts/3d/comp/obj/obj_leakWaterLine.js",
      "javascripts/3d/comp/obj/obj_door.js",
      "javascripts/3d/comp/obj/obj_portLinkLine.js",
      "javascripts/3d/comp/tools/alarm_tools_ex.js",
      "javascripts/3d/comp/tools/effect_tools_ex.js",
      "javascripts/3d/comp/tools/selection_tools_ex.js",
      "javascripts/3d/comp/tools/search_tools_ex.js",
      "javascripts/3d/comp/tools/volume_tools_ex.js",
      "javascripts/3d/comp/tools/microVolume_tools.js",
      "javascripts/3d/comp/tools/portLinkLines_tools.js",
      "javascripts/3d/comp/tools/door_tools.js",
      //"javascripts/3d/comp/tools/locate_tools.js",

      "javascripts/3d/comp/app.js",
      "javascripts/3d/comp/contextMenu_lib.js",
      "javascripts/3d/comp/contextMenu_setup.js",
      "javascripts/3d/comp/layer_lib.js",
      "javascripts/3d/comp/layer_setup.js",
      "javascripts/3d/comp/state/state_comp.js",
      //cosmos
      "javascripts/3d/cosmos/tools/data_layer.js",
      "javascripts/3d/cosmos/obj/obj_mosNode.js",
      "javascripts/3d/cosmos/obj/obj_mosLayer.js",
      "javascripts/3d/cosmos/obj/obj_mosAppModel.js",
      "javascripts/3d/cosmos/obj/obj_mosTradeFlow.js",
      "javascripts/3d/cosmos/obj/obj_mosBaseEnvObj.js",
      "javascripts/3d/cosmos/tools/common_cosmos_tools.js",
      "javascripts/3d/cosmos/tools/cosmos_layout_tools.js",
      "javascripts/3d/cosmos/tools/cosmos_tools_3.js",
      "javascripts/3d/cosmos/tools/vm_cosmos_tools.js",
      "javascripts/3d/cosmos/app.js",
      "javascripts/3d/cosmos/contextMenu_lib.js",
      "javascripts/3d/cosmos/contextMenu_setup.js",
      "javascripts/3d/cosmos/layer_lib.js",
      "javascripts/3d/cosmos/layerGroup_lib.js",
      "javascripts/3d/cosmos/layer_setup.js",
      "javascripts/3d/cosmos/state/state_mos.js",
      "javascripts/3d/cosmos/tools/cosmosSearch_tools.js"
    ],
    "serverJsArr": [
      "javascripts/server/_init_.js",
      //server
      "javascripts/server/**/*.js"
    ],
    "u3dJsArr": [
      "javascripts/3d/u3d/u3d.js",
      "javascripts/3d/u3d/u3d_Assist.js",
      "javascripts/3d/u3d/ui-index.js",
      "javascripts/3d/u3d/uinv-cosmos-tree.js",
      "javascripts/3d/u3d/ui-tree.js"
    ],
    "frontendConfigManagerJsArr": [
      "javascripts/frontendConfigManager/plug/ztree.js",
      "javascripts/frontendConfigManager/namespace.js",
      "javascripts/frontendConfigManager/core.js",
      "javascripts/frontendConfigManager/initData.js",
      "javascripts/frontendConfigManager/init.js"
    ],
    // "stateMachineLibJsArr": [
    //   "javascripts/stateMachine/eventDriverLib/EDClassLib.js",
    //   "javascripts/stateMachine/eventDriverLib/EDGetValueLib.js",
    //   "javascripts/stateMachine/eventDriverLib/EDParamTransitActionLib.js",
    //   "javascripts/stateMachine/eventDriverLib/EDActionLibParser.js",
    //   "javascripts/stateMachine/eventDriverLib/EDConditionLibParser.js",
    //   "javascripts/stateMachine/eventDriverLib/EDReactor.js",
    //   "javascripts/stateMachine/eventDriverLib/EDFSMLib.js",
    //   "javascripts/stateMachine/eventDriverLib/EDStepManager.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_common.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_object.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_widget.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_camera.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_tools.js",
    //   "javascripts/stateMachine/eventDriverLib/action/EDActionLib_gis.js",
    //   "javascripts/stateMachine/eventDriverLib/condition/EDConditionLib.js",
    //   "javascripts/stateMachine/eventDriverLib/app.js"
    // ],
    "t3dJsArr": [
      "javascripts/3d/t3djs3/base.js",
      "javascripts/3d/t3djs2/base_ex.js"
    ],
    "configJsArr": [
      "projects/config.js",
      "projects/userConfig.js"
    ],
    "uwebUtilJsArr": [
      "javascripts/uweb/_init_.js",
      "javascripts/uweb/uweb_util.js",
      "javascripts/uweb/userver_api.js",
      "javascripts/uweb/uweb_layout.js",
      "javascripts/uweb/uinv-ui-util.js",
      "javascripts/uweb/uinv-ui-user.js",
      "javascripts/uweb/uinv-ui-bus.js"
    ],
    "uwebHomeJsArr": [
      "javascripts/uweb/home/_init_.js",
      "javascripts/uweb/home/uweb_controller_init.js",
      "javascripts/uweb/home/uweb_controller_mutex.js",
      "javascripts/uweb/home/uweb_controller_mutexLib.js",
      "javascripts/uweb/home/uweb_controller_registerEvent.js",
      "javascripts/uweb/home/uweb_controller_advsearch.js",
      "javascripts/uweb/home/uweb_controller_deviceIndex.js",
      "javascripts/uweb/home/uweb_controller_exhibitionManage.js", //2014-01-03 演示管理
      "javascripts/uweb/home/uweb_controller_exhibitionAnim.js",
      "javascripts/uweb/home/uweb_controller_exhibitionDoc.js",
      "javascripts/uweb/home/uweb_controller_exhibitionView.js",
      "javascripts/uweb/home/uweb_controller_spaceSearch.js",
      "javascripts/uweb/home/uweb_controller_vm.js",
      "javascripts/uweb/home/uweb_controller_cosmos.js",
      "javascripts/uweb/home/uweb_controller_cosmosTrade.js",
      "javascripts/uweb/home/uweb_controller_top_spaceSearch.js",
      "javascripts/uweb/home/uweb_controller_top_powerConsumption.js",
      "javascripts/uweb/home/uweb_controller_top_alarm.js",
      "javascripts/uweb/home/uweb_controller_top_addTask.js",
      "javascripts/uweb/home/uweb_controller_top_ppt.js",
      "javascripts/uweb/home/uweb_controller_top_anim.js",
      "javascripts/uweb/home/uweb_controller_top_playSound.js",
      "javascripts/uweb/home/uweb_controller_top_cosmos.js",
      "javascripts/uweb/home/uweb_controller_top_physical.js",
      "javascripts/uweb/home/uweb_controller_shelves_manage.js", //jw 2017.06.26 上下架管理
      "javascripts/uweb/home/uweb_controller_shelves_on.js",
      "javascripts/uweb/home/uweb_controller_shelves_exc.js",
      "javascripts/uweb/home/uweb_controller_cView.js", //2014-06-27 组合试图
      "javascripts/uweb/home/uweb_controller_cFSM.js",
      //2016-08-10 告警管理 jw
      "javascripts/uweb/home/uweb_controller_cAlarm.js"
    ],
    "gisCommonJsArr": [
      //地球
      "uGeo/core/Replace/ArrayBuffer.js",
      "uGeo/version/tarsier.js",
      "uGeo/core/Cesium.js",
      "uGeo/core/earthSphere.js",
      "uGeo/gisRes/config.js",
      "uGeo/core/earthObject.js",
      "uGeo/core/gis_conversion.js",
      "uGeo/core/tile_earthSphere.js",
      "uGeo/core/vector_earthSphere.js",
      "uGeo/js/gis_event.js",
      "uGeo/js/editPoint.js",
      "uGeo/js/PopPanel.js",
      "uGeo/js/earthRotateCamera.js",
      "uGeo/js/earthOrbitCamera.js",
      "uGeo/core/Replace/jdataview.js",
      "uGeo/core/Replace/jbinary.js",
      "uGeo/core/Replace/createVerticesFromQuantizedTerrainMesh.js",
      "uGeo/core/Replace/upsampleQuantizedTerrainMesh.js",
      "uGeo/core/Replace/createVerticesFromHeightmap.js",
      "uGeo/core/Replace/all.js",
      "uGeo/core/Replace/loadWithXhr.js",
      "uGeo/js/gis.js",
      "uGeo/projects/DemoV2.js",
      "uGeo/projects/NodeEffectConverter.js"
    ],
    "homeAppJsArr": [
      "javascripts/uweb/home/app.js"
    ],
    "gisAppJsArr": [
      "uGeo/app.js"
    ],
    "threeDConfigPluginJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery-ajax-cache.js",
      "plugins/jstree/jstree.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.core-3.5.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.excheck-3.5.js",
      "plugins/jquery/jquery-ztree/jquery.ztree.exedit-3.5.js",
      "plugins/Colorpicke/spectrum.js",
      "plugins/handlebars/handlebars.js"
    ],
    "threeDConfigAppJsArr": [
      "javascripts/frontendConfigManager/app.js"
    ],
    "threeDConfigCssArr": [
      "resource/css/style.css",
      "resource/bootstrapNew/css/bootstrap.css",
      // "javascripts/frontendConfigManager/config.css",//jw 2017.04.06 修改为根据语言环境动态加载
      "plugins/jquery/jquery-ztree/demo.css",
      "plugins/jquery/jquery-ztree/metroStyle/metroStyle.css",
      "plugins/Colorpicke/spectrum.css"
    ],
    "portshowPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/handlebars/handlebars.js"
    ],
    "portshowAppJsArr": [
      "javascripts/portinfo/modelview.js",
      "javascripts/portinfo/editmodelinfo.js",
      "javascripts/portinfo/app.js"
    ],
    "portshowCssArr": [
      "resource/css/portshow.css"
    ],
    "stateMachinePluginsJsArr": [
      "plug/mxGraph/mxClient.js",
      "plug/jquery-1.11.2.min.js",
      "plug/Colorpicker/spectrum.js",
      "plug/bootstrap/js/bootstrap.min.js",
      "plug/bootstrap/js/bootstrap-treeview.js",
      // "plug/bootstrap_table/bootstrap-table.min.js",
      "plug/sweetalert-master/lib/promise-0.1.1.min.js",
      "plug/sweetalert-master/dist/sweetalert2.min.js",
      "plug/handlebars/handlebars.js",
      "plug/jquery.nestable.js",
      "plug/pinyin/pinyin.js"
    ],
    //状态机公用资源
    "stateMachineCoreMinJsArr": [
      "minjs/stateMachineCore.min.js"
    ],
    "stateMachineCoreJsArr": [
      "corejs/EDClassLib.js",
      "corejs/EDGetValueLib.js",
      "corejs/EDParamTransitActionLib.js",
      "corejs/EDActionLibParser.js",
      "corejs/EDConditionLibParser.js",
      "corejs/EDReactor.js",
      "corejs/EDFSMLib.js",
      "corejs/EDStepManager.js",
      "corejs/app.js"
    ],
    "stateMachineExtendJsArr": [
      "extend/EDParamTransitActionLib.js",
      "extend/action/EDActionLib_common.js",
      "extend/action/EDActionLib_cosmos.js",
      "extend/action/EDActionLib_object.js",
      "extend/action/EDActionLib_widget.js",
      "extend/action/EDActionLib_camera.js",
      "extend/action/EDActionLib_tools.js",
      "extend/action/EDActionLib_gis.js",
      "extend/action/EDActionLib_compute.js",
      "extend/action/EDActionLib_line.js",
      "extend/action/EDActionLib_array.js",
      "extend/action/EDActionLib_dictionary.js",
      "extend/condition/EDConditionLib.js",
      "extend/EDActionLib_extend.js"
    ],
    "stateMachineIdeJsArr": [
      "extend/atomRegister.js",
      "js/ui-tree.js",
      "js/eventEditer_uiLib.js",
      "js/eventEditer.js",
      "js/eventEditer2.js",
      "js/graphManager.js",
      "js/attrPopMenuManager.js",
      "js/fsmRecoveryManager.js",
      "js/variateManager.js",
      "js/debugManager.js",
      "js/atomManager.js",
      "js/atomCompatibleList.js",
      "js/superRectangle.js",
      "js/graphLibOverwrite.js",
      "js/searchForFsm.js",
      "js/app.js"
    ],
    // "stateMachineAppJsArr": [
    //   "app.js"
    // ],
    "stateMachineCssArr": [
      "plug/Colorpicker/spectrum.css",
      "plug/bootstrap/css/bootstrap.min.css",
      // "plug/bootstrap-table/bootstrap-table.min.css",
      "plug/sweetalert-master/dist/sweetalert2.min.css",
      "plug/bootstrap/css/font-awesome.min.css",
      "css/assist.css",
      "css/modal.css",
      "css/style.css"
    ],
    //list
    "listPluginsCssArr": [
      "resource/admin/css/list.css"
    ],
    "listPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js"
    ],
    "listAppJsArr": [
      "javascripts/uweb/admin/list.js"
    ],
    //manager
    "managerPluginsCssArr": [
      "resource/admin/css/list.css"
    ],
    "managerPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js"
    ],
    "managerAppJsArr": [
      "javascripts/uweb/admin/manager.js"
    ],
    //resources
    "resourcesPluginsCssArr": [
      "resource/admin/css/resources.css",
      "resource/admin/css/rotateCircle.css"
    ],
    "resourcesPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery.pagination.js"
    ],
    "resourcesAppJsArr": [
      "javascripts/uweb/admin/resources.js"
    ],
    //data-center-control
    "controlPluginsCssArr": [
      "resource/admin/css/dcControl.css",
      "resource/admin/css/imggrid.css",
      "resource/admin/css/combo.select.css",
      "resource/admin/css/rotateCircle.css"
    ],
    "controlPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery.pagination.js",
      "plugins/jquery/jquery.cookie.js",
      "plugins/jquery/jquery.combo.select.js",
      "plugins/jquery/imggrid.js"
    ],
    "controlAppJsArr": [
      "javascripts/uweb/admin/dcControl.js"
    ],
    //head
    "headCssArr": [
      "resource/admin/css/common.css"
    ],
    "headJsArr": [
      "javascripts/uweb/admin/head.js"
    ],
    //givTMapping
    "givmappingPluginsCssArr": [
      "resource/admin/css/dcControl.css",
      "resource/admin/css/combo.select.css",
      "resource/admin/css/rotateCircle.css"
    ],
    "givmappingPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery.pagination.js",
      "plugins/jquery/jquery.combo.select.js"
    ],
    "givmappingAppJsArr": [
      "javascripts/uweb/admin/givTMapping.js"
    ],
    //givList
    "givListPluginsCssArr": [
      "resource/admin/css/givList.css",
      "resource/admin/css/combo.select.css"
    ],
    "givListPluginsJsArr": [
      "plugins/jquery/jquery-1.8.1.min.js",
      "plugins/jquery/jquery.combo.select.js"
    ],
    "givListAppJsArr": [
      "javascripts/uweb/admin/givList.js"
    ]
  },
  "htmlMinOptions": {
    "removeComments": true, //清除HTML注释
    "collapseWhitespace": false, //压缩HTML
    "collapseBooleanAttributes": true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    "removeEmptyAttributes": true, //删除所有空格作属性值 <input id="" /> ==> <input />
    "removeScriptTypeAttributes": true, //删除<script>的type="text/javascript"
    "removeStyleLinkTypeAttributes": true, //删除<style>和<link>的type="text/css"
    "minifyJS": false, //压缩页面JS
    "minifyCSS": true //压缩页面CSS
  },
  "imageMinOptions": {
    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    multipass: false //类型：Boolean 默认：false 多次优化svg直到完全优化
  }
};
module.exports = defaultOptions;
