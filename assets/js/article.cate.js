$(function () {

  let layer = layui.layer
  let  form = layui.form
  renderData() 


  // 获取文章分类列表  
  function renderData() {
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res) {
        // console.log(res)
        if (res.code !==0) {
          return '获取文章分类失败'
        }
       let htmlStr= template("templateId",res)
        $('tbody').empty().append(htmlStr)
      }
    })
  }



  // 给按钮添加点击事件
  let index = null

  $('#btnAdd').on('click',function () {
   index= layer.open({
      title: '添加类别',
      //js文件的text/html  也可以使用html获取内容
      content: $('#Addcate').html(),  
      type:1,
      area: ['500px', '300px'],
    })
  })

  let status = false

  // 给动态创建的form便当添加提交事件、
  $('body').on('submit','#addForm',function (e) {
    

    e.preventDefault()

  // 两个逻辑使用同一个对话框， 通过设置状态，根据不同的状态进行不同的操作，
    if (status) {
      // console.log('点击修改')//修改怎么操作
      $.ajax( {
        method:'PUT',
        url:'/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          console.log(res)
          if (res.code !==0) {
            return '修改数据失败'
          }
          // 修改成功
          // renderData() 
          renderData()
        }
      })

    } else {
      // console.log('点击添加')

      $.ajax({
      method:'POST',
      url:'/my/cate/add',
        data: $(this).serialize() ,
      success(res) {
        console.log(res)
        if (res.code !==0) {
          return '更新数据失败'

        }
        // 更新数据成功之后，关闭弹出框，重新加载数据
        // renderData()
        // layer.close(index) 
        renderData()
      }
    })

    }

    // renderData()   渲染放在这里会出现慢的问题，运行的方式为异步操作
    // Ajax请求为异步任务，渲染可能再请求之前执行
    layer.close(index) 
    status = false


    // $.ajax({
    //   method:'POST',
    //   url:'/my/cate/add',
    //   data :$(this).serialize() ,
    //   success(res) {
    //     console.log(res)
    //     if (res.code !==0) {
    //       return '更新数据失败'

    //     }
    //     // 更新数据成功之后，关闭弹出框，重新加载数据
    //     renderData()
    //     layer.close(index) 
        
    //   }
    // })

  })




  // 修改与添加的对话框一致使用相同的框进行不同的操作


  $('tbody').on('click','.btnbutton',function () {
    // console.log($(this).attr('data-id')) //
    // console.log(55)
    status = true
    index = layer.open({
      title: '添加类别',
      //js文件的text/html  也可以使用html获取内容
      content: $('#Addcate').html(),
      type: 1,
      area: ['500px', '300px'],
    })

    // 回显数据、、
    let id = $(this).attr('data-id')
    $.ajax( {
      method:'GET',
      url: '/my/cate/info/?id='+id,  //请求方式特殊，跟之前不一样
      success(res) {
        // console.log(res)
        if(res.code !==0) {
          return '请求数据失败'
        }

        // 快速将数据赋值
        form.val('addform',res.data)
      }

    })


  })


  // 删除按钮的事件
  $('tbody').on('click','.btndelete',function () {
    // 获得兄弟的id号
    let id = $(this).siblings('.btnbutton').attr('data-id')
    // console.log(id)
    if (confirm('确认删除吗？')) {
      $.ajax({
        method: 'DELETE',
        url: '/my/cate/del/?id=' + id,
        // 提示删除成功，数据没有丢失
        success(res) {
          // console.log(res)
          if (res.code !== 0) {
            return '删除数据失败'
          }
          renderData()
        }
      })
    }
   
  })



})