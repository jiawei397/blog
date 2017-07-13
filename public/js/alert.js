/**
 * Created by Administrator on 2017/6/27 0027.
 */
$(function () {
  $.modal = (function () {
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var alr = $("#blog-alert");
    var ahtml = alr.html();

    var _alert = function (options) {
      alr.html(ahtml);	// 复原
      alr.find('.cancel').hide();
      _dialog(options);

      alr.find('.close').click(function () {
        alr.modal("hide");
      });

      return {
        on: function (callback) {
          if (callback && callback instanceof Function) {
            alr.find('.ok').click(function () {
              callback(null, true);
            });
          }
        }
      };
    };

    var _confirm = function (options) {
      alr.html(ahtml); // 复原
      alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
      alr.find('.cancel').show();
      _dialog(options);

      return {
        on: function (callback) {
          if (callback && callback instanceof Function) {
            alr.find('.ok').click(function () {
              callback(null, true);
            });
            alr.find('.cancel').click(function () {
              callback(null, false);
            });
          }
        }
      };
    };

    var _dialog = function (options) {
      var ops = {
        msg: "提示内容",
        title: "提示信息",
        btnok: "确定",
        btncl: "取消"
      };

      $.extend(ops, options);
      // console.log(alr);

      var html = alr.html().replace(reg, function (node, key) {
        return {
          Title: ops.title,
          Message: ops.msg,
          BtnOk: ops.btnok,
          BtnCancel: ops.btncl
        }[key];
      });

      alr.html(html);
      alr.modal('show');
    };

    return {
      alert: _alert,
      confirm: _confirm
    };
  }());

  //回调使用方法：$.alert("XX").on(function(){err,bool});
  $.alert = function (msg) {
    return $.modal.alert({
      msg: msg
    });
  };

  //回调使用方法：$.confirm("XX").on(function(){err,bool});
  $.confirm = function (msg) {
    return $.modal.confirm({
      msg: msg
    });
  };
});
