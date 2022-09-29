//调用Ajax请求之前，都会经过的一个路径
$.ajaxPrefilter(function(config) {
  console.log(config)
  // debugger
  // 不能   config.url += 'http://big-event-vue-api-t.itheima.net'  注意加等的前后顺序
  config.url = 'http://big-event-vue-api-t.itheima.net'+config.url

  // 把拼接字符串转换为对象格式的方式
  function render(str) {
    let obj = {}
    // 转换为{key1:value1 ,key2:value2}
    str.split('&').forEach(item => {
      // console.log(item)
      let kv = item.split('=')
      let [k, v] = kv
      obj[k] = v

    })
    return JSON.stringify(obj)
  }


  // 把固定的东西封装到这里
  config.data = render(config.data)
  config.contentType = 'application/json'
  // contentType: 'application/json',

})