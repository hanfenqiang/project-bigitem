$(function (){
  $('#go2login').on('click',function (){
    $('.regbox').show()
    $('.loginbox').hide()
  })

  $('#go2reg').on('click',function (){
    $('.regbox').hide()
    $('.loginbox').show()
  })


  // 给表单添加验证规则
  // console.log(layui)  
  let form = layui.form 
  form.verify ({
    psd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ] ,
    repsd: function (value) {
      // console.log($('.regbox [name="password"]').val())
      // 推测上次的问题是因为上面有相同的属性名，导致出现空内容
      if ($('.regbox [name="password"]').val()!==value) {
        return '两次密码不一致'
      }
    }
  })






  // 给注册表单添加点击事件（会刷新浏览器）
  // 
  $('#formReg').on('submit',function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 表单负责收集数据，Ajax负责请求数据
    // 请求的发送数据类型为json， Content-Type : "json",
    // console.log($('.regbox [name="username"]').val())  能取到表单的内容
    $.ajax({
      method:'POST',
      url:'/api/reg',
      // 这个属性必须加而且必须是小写 

      // contentType:'application/json',

      // 'content-Type':'application/json',

      // data: JSON.stringify({
      //   // 收集不到表单里面的数据

      //   username: $('.regbox [name="username"]').val(),
      //   password: $('.regbox [name=password]').val(),
      //   repassword: $('.regbox [name=repassword]').val(),
      // }),
      data: $(this).serialize(),
      success(res) {
        if (res.code!==0) {
          console.log(res)
          return alert (res.message)
        }
        console.log(res)
        $('#go2reg').click()
        // console.log(res)
      },
      error(err) {
        console.log(err)
      }
    })
    




  })



  // 给表单添加登录事件
  $('#formLogin').submit(function (e) {

    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 这个属性必须加而且必须是小写 

      // contentType: 'application/json',

      // 'content-Type':'application/json',

      // data: JSON.stringify({
      //   // 收集不到表单里面的数据

      //   username: $('.regbox [name="username"]').val(),
      //   password: $('.regbox [name=password]').val(),
      //   repassword: $('.regbox [name=repassword]').val(),
      // }),
      data: $(this).serialize(),
      success(res) {
        if (res.code !== 0) {
          // console.log(Array.from($(this).serialize()))
          // console.log(res)
          return alert(res.message)
        }
        console.log(res)


        // token    并且跳转到指定的地点
        // token意思是令牌的意思，下一次去请求有权限接口时候，带着
        localStorage.setItem('token',res.token)
        location.href ='./index.html'





        // console.log(res)
      },
      error(err) {
        console.log(err)
      }
    })
  })

  // 获取用户信息失败，报错状态码 401 就是token的问题（要么没给，要么就是过期了）
  // css权重分析   深度选择器、/deep/  >>> :deep (类名) >!important >行内样式>id选择器>>类选择器
  // >标签选择器》通配符选择器 




// token 令牌的意思，（下一次去请求有权限的接口时，带着）
// 固定写法 Bearer空格字符串  Bearer  译为此票人














})