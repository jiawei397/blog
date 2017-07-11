/**
 * 百度地图API功能
 */
var map = new BMap.Map("l-map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用

// var myDrag = new BMapLib.RectangleZoom(map, {
//   followText: "拖拽鼠标进行操作"
// });
// myDrag.open(); //开启拉框放大
// map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用

var start = "顶秀金瑞家园";
var end = "北京国际画材中心";
var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING, BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
var transit = new BMap.TransitRoute(map, {
  renderOptions: {map: map},
  policy: 0
});

$("#result").click(function () {
  map.clearOverlays();
  var i = $("#driving_way .item.active.selected").data('value');
  search(start, end, routePolicy[i]);
  function search (start, end, route) {
    transit.setPolicy(route);
    transit.search(start, end);
  }
});
