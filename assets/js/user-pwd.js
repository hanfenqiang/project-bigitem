$(function () {
  let form = layui.form 
  // 定义验证规则
  form.verify ( {
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ] ,samepwd:function (value) {
      if (value == $('[name="old_pwd"]').val()) {
        return '新旧密码不能一致'
      }
    },repwd:function (value) {
      if (value !== $('[name="new_pwd"]').val()) {
        return '两次密码不一致'
      }

    }
  })



  // 给表单添加提交事件
  $('.layui-form').on('submit',function (e) {
    e.preventDefault()
    // 通过Ajax请求数据
    $.ajax( {
      // 发起Ajax请求
      method:'PATCH',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success(res) {
        // console.log(res)
        // 修改密码成功后，重置表单
        if(res.code!==0) {
          return '修改密码失败'

        }
        
        $('.layui-form')[0].reset()
      }

    })
  })


})