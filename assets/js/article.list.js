$(function () {
  let form = layui.form
  let laypage = layui.laypage;
  let q = {
    pagenum :1,//页码值，默认请求第一页的数据
    pagesize :2,//每页显示几条数据，默认显示2条
    cate_id: '',//文章分类id
    state: '' //文章发布状态
  }

  datarender()
  renderData()
  // 定义美化时间的过滤器
  template.defaults.imports.getTime= (time) => {
    let han = new Date(time)
   let y = han.getFullYear() 
   let m = (han.getMonth() +1+'').padStart(2,0)
    let d = (han.getDate() + '').padStart(2, 0)
    let hh = (han.getHours() + '').padStart(2, 0)
    let mm = (han.getMinutes() + '').padStart(2, 0)
    let ss = (han.getSeconds() + '').padStart(2, 0)

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

  }


 function datarender() {

   $.ajax({
     method: 'GET',
     url: `/my/article/list?pagenum=${q.pagenum}&pagesize=${q.pagesize}&cate_id=${q.cate_id}&state=${q.state}`,
     // data:q,
     success(res) {
       // debugger
      //  console.log(res)
       // 调用template渲染数据
       let htmlStr = template('templateId', res)
       $('tbody').html(htmlStr)

       renderpage(res.total)

     }
   })


 }


//  定义渲染数据的函数

  // 获取文章分类列表    给列表动态渲染名称
  function renderData() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        // console.log(res)
        if (res.code !== 0) {
          return '获取文章分类失败'
        }
        let htmlStr = template("template-data", res)
        $('[name="cate_id"]').html(htmlStr)
        form.render()
      }
    })
  }



  $('#addformdata').on('submit',(e)=> {
    e.preventDefault()

    // 分类的查询
    // let cate_id = $('[name="cate_id"]').val()
    // let state = $('[name="state"]').val()

    // q.cate_id = cate_id
    // q.state=state

    // 或者 直接赋值
    q.cate_id = $('[name="cate_id"]').val()
    q.state = $('[name="state"]').val()

    // let cate_id = $('[name="cate_id"]').val()
    // let state = $('[name="state"]').val()

    // if (cate_id) {
    //   q.cate_id = cate_id
    //   // q.cate_id=''
    // }
    // if (state) {
    //   q.state = state
    //   // q.state=''
    // }


    datarender()

    // q.cate_id = ''
    // q.state = ''
  })



  // 渲染页面的函数
  function renderpage(total) {

    laypage.render({
      elem: document.getElementById('page'), //分页容器的id
      count: total , //总数据条数
      limit: q.pagesize,// 每页显示几条数据
      curr:q.pagenum , //默认被选中的分页
      layout:['count','limit','prev','page','next','skip'],
      limits:[2,3,5,10],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagesize = obj.limit
        q.pagenum = obj.curr
        //出现无线循环
        // console.log(first)

        // if (!first) {
        //   datarender()
        // }
// 判断first的类型来进行操作
        if (typeof first =='undefined') {
          datarender()
        }

        // datarender()
// 通过分辨点击还是自动加载进行判断，这里直接渲染会出现
// 无线循环，需要判断方式进行操作
        // //首次不执行
        // if (!first) {
        //   //do something
        // }
      }
    })



  }

  // 给删除按钮添加点击事件，动态获取的元素需要通过委托的形式添加
  $('tbody').on('click','.btnDelete',function () {
    // 获取到页面中的删除按钮个数，通过判断按钮个数来判断是否需要pagenum -1
 let len =   $('.btnDelete').length
//  console.log(len)
let id = $(this).attr('data-index')
// console.log(id)

if(confirm('确认删除吗？')) {
  $.ajax({
    method: 'DELETE',
    url: '/my/article/info?id=' + id,
    success(res) {
      console.log(res)
      if (res.code !== 0) {
        return '删除信息失败'
      }
      // 删除信息成功，重新渲染页面  
      // 当把删除最后的数据时自动跳转到前一页，但是数据却没有渲染

      // 如果当前都已经是第一页，就不要减了，默认是第一页就好了
      if (len==1) {
        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum-1
      }
      datarender()
    }

  })
}

  })













})