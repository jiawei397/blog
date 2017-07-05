$(function () {
  $("#addBtn").click(function () {
    var data = $("#spiderData").text().trim().split('\n');
    data = data.map(function (ip) {
      return ip.trim();
    });
    data = data.filter(function (ip) {
      return ip.trim()!="";
    });
    $.ajax({
      type: "POST",
      url: "/spider/add",
      data: JSON.stringify({ips:data}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (json) {
        if (json.success) {
          $.alert('添加成功！');
        } else {
          $.alert(json.message);
        }
      },
      error: function (err) {
        $.alert(err);
      }
    });
  });

  $("#reSpiderBtn").click(function () {
    $.ajax({
      type: "GET",
      url: "/spider/reDo",
      dataType: "json",
      success: function (ips) {
        $("#spiderData").text(ips.join('\n'));
      },
      error: function (err) {
        $.alert(err);
      }
    });
  });
});
