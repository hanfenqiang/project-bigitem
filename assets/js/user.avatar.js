$(function () {

  let  layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传按钮添加点击事件
  $('#btnChoose').on('click',function (e){
    file.click()
    // console.log(e)

  })

  // 给表单注册change事件
  $('#file').on('change',function(e) {
    // console.log(e)
    let filelist = e.target.files
    // console.log(filelist)//获取文件的列表信息
    if(filelist.length==0) {
      return layer.msg('请上传文件')
    }
    // 上传完文件之后，要干嘛，
    // 根据选择的文件创建一个对应的url地址
    let newImgURL = URL.createObjectURL(filelist[0])
    console.log(newImgURL)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })



  // 给确定按钮添加点击事件
  $('#btnChse').on('click',function () {
// 将图片转换为64格式的图片
    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


      // 发起Ajax请求
      $.ajax( {
        method:'PATCH',
        url:'/my/update/avatar',
        data:{
          avatar: dataURL
        },
        success(res) {
          console.log(res)
          if(res.code !==0 ) {
            return '上传图片失败'
          }

          // 请求成功后，将主页面渲染
          window.parent.renderdata()
        }
      })
  })












})