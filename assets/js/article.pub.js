$(function () {
  let form = layui.form
  getDate()

  // 初始化富文本编辑器
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

 function getDate() {
   $.ajax({
     method: 'GET',
     url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
     headers: {

       Authorization: localStorage.getItem('token')
     },
     success(res) {
       // console.log(res)
       if (res.code !== 0) {
         return '获取文章分类失败'
       }
       let htmlStr = template("template-data", res)
       $('[name="cate_id"]').empty().append(htmlStr)
       form.render()
     }
   })

 }

 

// 给上传按钮添加点击事件
  $('#btnPub').on('click',function () {
    $('#file').click()
  })


  // 添加表单的change事件，获取表单上传的信息
  $('#file').on('change',function (e) {
   const files =  e.target.files
   console.log(files)

    let newImgURL = URL.createObjectURL(files[0])

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域



  })



  // 收集表单的数据，  status  状态栏的设定
  let  status = '已发布'

  $('#btnSave2').on('click',function () {
    status = '草稿'//将状态转变一下
  })


  // 监听表单的提交行为   

  $('#formPub').on('submit',function (e) {
    e.preventDefault() 
    // 收集数据到formdata里面
    let fd = new FormData($(this)[0])

    fd.append('state', status)
    // fd.forEach((v,k) => {
    //   console.log(v,k)
    // })

    // 
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作

        fd.append('cover_img', blob)


        $.ajax({
          method:'POST',
          url:'http://big-event-vue-api-t.itheima.net/my/article/add',
          headers :{
            
            Authorization:localStorage.getItem('token')
          },
          data:fd,
          contentType:false,
          processData:false,
          success(res) {
            console.log(res)
            if(res.code!==0) return '发布失败'

            // location.href= './article.list.html'
            location.href= '../../article/article.list.html'


          }
        })






      })



  })



})