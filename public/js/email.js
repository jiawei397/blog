$(function () {
  $.fn.form.settings.defaults = {
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'email',
          prompt: 'Please enter a valid e-mail'
        }
      ]
    },
    // this form doesn't have a cc email but it will not produce an error
    ccEmail: {
      identifier: 'cc-email',
      optional: true,
      rules: [
        {
          type: 'email',
          prompt: 'Please enter a valid second e-mail'
        }
      ]
    }
  };

  $('.ui.form').form({
    on: 'blur',
    fields: {
      // receiver: {
      //   identifier: 'receiver',
      //   rules: [
      //     {
      //       type: 'email',
      //       prompt: 'Please enter a valid e-mail'
      //     }
      //   ]
      // },
      theme: {
        identifier: 'theme',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your theme'
          }
        ]
      },
      content: {
        identifier: 'content',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your content'
          }
        ]
      }
    },
    onSuccess: function (event, fields){
      $.ajax({
        type: "POST",
        url: "/email/send",
        data: JSON.stringify(fields),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
          if (json.success) {
            $.alert('发送邮件成功！');
          } else {
            $.alert(json.message);
          }
        },
        error: function (err) {
          $.alert(err);
        }
      });
    }
  });
});
