//调用Ajax请求之前，都会经过的一个路径
$.ajaxPrefilter(function(config) {
  // console.log(config)
  // debugger
  // 不能   config.url += 'http://big-event-vue-api-t.itheima.net'  注意加等的前后顺序
  config.url = 'http://big-event-vue-api-t.itheima.net'+config.url

  // 把拼接字符串转换为对象格式的方式
  // 没有找到变量str  这里给变量的初始值
  function render(str='') {
    let obj = {}
    // 转换为{key1:value1 ,key2:value2}
    str.split('&').forEach(item => {
      // console.log(item)
      let kv = item.split('=')
      // 这里系统自动进行了编码，需要解码为@符号
      let [k, v] = kv
      obj[k] = decodeURIComponent(v)

    })
    return JSON.stringify(obj)
  }

    // 把固定的东西封装到这里
    config.data = config.headers || render(config.data)
  
  // debugger
    // debugger
  config.contentType = 'application/json'
  // contentType: 'application/json',

  // 将headers属性添加到公共里面
  // debugger
if (config.url.includes('/my/')) {
  config.headers = {
    Authorization: localStorage.getItem('token')  || '' //这里判断是否含有没有则给空字符
  }
}
  

config.error = function (err){
 
    // 失败后执行的函数，或者使用complete函数

    console.log(err)
    if (err.responseJSON.code == 1 && err.responseJSON.message == '身份认证失败！') {
      // 失败后跳转到登录页面,并且清空token
      location.href = './login.html'
      localStorage.removeItem('token')
    }

}

})