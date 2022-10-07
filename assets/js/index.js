$(function (){
  let layer = layui.layer

  renderdata()
  


// 添加退出的点击事件
  $('#logout').on('click',function (){
    // console.log(11)


    layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
      //do something   确定退出后需要执行的 清除token  跳转路径
      location.href = './login.html'
      localStorage.removeItem('token')

      layer.close(index);
    })





    // if (confirm('是否确定退出')) {
    //   // 确定退出后，清空token值，跳转到登录页面
    //   localStorage.removeItem('token')
    //   location.href='./login.html'

    // }
  })








  // debugger
})





function renderdata() {

  // ajax 请求数据
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers :{
    //   Authorization :localStorage.getItem('token')
    // },
    success(res) {
      // console.log(res)
      // 数据请求成功
      let name = res.data.nickname || res.data.username
      if (res.data.user_pic) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
        $('.text').html('欢迎 ' + name)
      } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.text').html('欢迎 ' + name)


      }

    }

  })

}

