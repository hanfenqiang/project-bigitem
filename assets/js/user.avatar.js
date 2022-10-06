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













})