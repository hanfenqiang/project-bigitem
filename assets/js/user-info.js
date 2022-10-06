$(function () {
  let layer = layui.layer
  let form = layui.form 
  form.verify ({
    nickname: function (value) {
      if (value.length >=6) {
        return "请输入最多6个字符"
      }
    }
  }
  )
  inituserinfo()

  // 获取用户信息、
  function inituserinfo() {
    $.ajax( {
      method:'GET',
      url:'/my/userinfo',
      success(res) {
        if (res.code!==0 ) {
          return layer.msg('获取用户信息失败') //弹窗
        }
        // layer.msg('获取用户信息成功')
        // console.log(res)
        // 回显数据
        form.val('user-Form',res.data)
        console.log(form.val('user-Form'))

        // 给重置按钮添加点击事件,阻止表单的默认填充行为，
        $('#btnReset').on('click',function (e) {
          e.preventDefault()
          inituserinfo()
        })



      }
    })
  }


  // 给表单注册体检事件
  $('.layui-form').on('submit',function (e) {
    e.preventDefault()

    $.ajax( {
      method:'PUT',
      url:'/my/userinfo',
      data: form.val('user-Form'),
      success(res) {

        if(res.code !==0 ) {
          return '修改用户信息失败'
        }
        console.log(res)


        

      }
    })




  })








})