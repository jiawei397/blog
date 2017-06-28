$(function () {
  var editor = new $.fn.dataTable.Editor({
    // ajax:"/table/update.do",
    ajax: function (method, url, data, success, error) {
      // console.log(method);
      // console.log(data);
      var type = data.action;
      var ids = [];
      var params = {};
      for (var key in data.data) {
        ids.push(key);
        params = data.data[key];
      }
      console.log(params);
      if (type == "create") {
        $.ajax({
          type: "POST",
          url: "/table/add",
          data: JSON.stringify(params),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (json) {
            if (json.success) {
              success(json);
            } else {
              error(json);
              $.alert(json.message);
            }
          },
          error: function (err) {
            console.error(err);
            error(err);
          }
        });
      } else if (type == "edit") {
        $.ajax({
          type: "POST",
          url: "/table/update/" + ids[0],
          data: JSON.stringify(params),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (json) {
            if (json.success) {
              success(json);
            } else {
              error(json);
              $.alert(json.message);
            }
          },
          error: function (err) {
            console.error(err);
          }
        });
      } else if (type == "remove") {//remove
        params = {
          "ids": ids
        };
        $.ajax({
          type: "POST",
          url: "/table/delete",
          data: JSON.stringify(params),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (json) {
            if (json.success) {
              success(json);
            } else {
              error(json);
              $.alert(json.message);
            }
          },
          error: function (err) {
            console.error(err);
          }
        });
      }
    },
    table: "#example",
    fields: [
      {
        label: "code:",
        name: "code"
      }, {
        label: "zh:",
        name: "zh"
      }, {
        label: "en:",
        name: "en"
      }
      // , {
      //   label: "createTime:",
      //   name: "createTime",
      //   type: "datetime",
      //   def: function () {
      //     return new Date();
      //   },
      //   format: 'YYYY-MM-DD',
      //   fieldInfo: 'Verbose date format'
      // }
    ]
  });

  $('#example').on('click', 'tbody td:not(:first-child)', function (e) {
    if ($(this).index() < 6) {
      editor.bubble(this);
    }
  });

  $('#example').on('click', 'a.remove', function (e) {
    editor
      .title('Delete row')
      .message('Are you sure you wish to delete this row?')
      .buttons({
        "label": "Delete", "fn": function () {
          editor.submit()
        }
      })
      .remove($(this).closest('tr'));
  });

  var table = $('#example').DataTable({
    dom: "Bfrtip",
    language: {
      url: '/data/Chinese.json'
    },
    ajax: "/table/getData",
    processing: true,//后台分页
    serverSide: true,
    // deferLoading: 57,
    // ajax: "/data/test.json",
    pageLength: 15,//默认是10
    pagingType: "numbers",//numbers,simple,simple_numbers,full,full_numbers,first_last_numbers
    columns: [
      {
        data: null,
        defaultContent: '',
        className: 'select-checkbox',
        orderable: false
      },
//        {
//          data: null,
//          render: function (data, type, row) {
//            // Combine the first and last names into a single table field
//            return data.first_name + ' ' + data.last_name;
//          },
//          editField: ['first_name', 'last_name']
//        },
      {data: "code"},
      {data: "zh"},
      {data: "en"},
      {data: "author",
        width:50,
        render: function (data, type, row) {
            if(!data || data == ""){
              return "admin";
            }
           return data;
         }
      },
      {data: "createTime",width:150},
      {data: "modifyTime",width:150}
      , {
        data: null,
        defaultContent: '<a href="#" class="remove">删除</a>',
        width:30,
        orderable: false
      }
//        {data: "salary", render: $.fn.dataTable.render.number(',', '.', 0, '$')}
    ],
    // columnDefs: [
    //   {
    //     "data": "test",
    //     "render": function (data, type, full) {
    //       console.log(data);
    //       return '<button type="button" class="btn btn-primary ok" data-dismiss="modal">增加</button>';
    //     },
    //     "targets": [5]
    //   }
    // ],
    order: [1, 'asc'],
    select: {
      style: 'os',
      selector: 'td:first-child'
    },
    buttons: [
      {extend: "create", text: "创建", editor: editor},
      {extend: "edit", text: "编辑", editor: editor},
      {extend: "remove", text: "删除", editor: editor},
      {
        text: "导入",
        // className:"btn btn-primary btn-lg",
        init: function (dt, node, config) {
          $("#uploadBtn").on("click", function () {
            var formFile = document.getElementById("formFile");
            if (!formFile.value.endsWith(".json")) {
              $.alert('请上传json文件');
              return;
            }
            var file = formFile.files[0];
            // console.log(file);
            var obj = {
              fileName: formFile.name,
              file: file
            };

            var formData = new FormData(); //构造空对象，下面用append 方法赋值。
            formData.append("fileName", formFile.name);
            formData.append("file", file);

            $.ajax({
              type: "POST",
              url: "/table/import",
              data: formData,
              contentType: false, // 告诉jQuery不要去设置Content-Type请求头
              processData: false, // 告诉jQuery不要去处理发送的数据
              cache: false,
              success: function (json) {
                if (json.success) {
                  $('#impModal').modal('hide');
                  table.ajax.reload();//刷新数据
                  $.alert('导入成功');
                } else {
                  $.alert(json.message);
                }
                $("#form")[0].reset();
              },
              error: function (err) {
                console.error(err);
                $.alert(err.message);
                $("#form")[0].reset();
              }
            });

          });

        },
        action: function (e, dt, node, config) {
          $('#impModal').modal({
            keyboard: true
          });
        }
      },
      {
        // extend: "selectedSingle",
        text: "导出",
        action: function (e, dt, node, config) {
          var datas = table.rows({selected: true}).data();
          if (datas.length > 0) {
            // window.open("/data/test.json");
            console.log(datas);
            var arr = [];
            datas.map(function (data) {
              arr.push(data);
            });
            console.log(arr);
            $.ajax({
              type: "POST",
              url: "/table/export",
              data: JSON.stringify(arr),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (json) {
                if (json.success) {
                  // window.open(json.path);
                  $('body').append('<a href="" id="goto" target="_blank"></a>');
                  $('#goto').attr('href', json.path);
                  $('#goto').get(0).click();
                } else {
                  error(json);
                  $.alert(json.message);
                }
              },
              error: function (err) {
                error(err);
              }
            });
          } else {
            var search = $("#example_filter").find('input[type=search]').val();
            window.open("/table/exportAll?search=" + encodeURI(search));
          }
        }
      }
    ]
  });

  // table.buttons().container()
  //   .appendTo( $('#bts', table.table().container()));
});
