$(function () {
  let form = layui.form
  getDate()

 function getDate() {
   $.ajax({
     method: 'GET',
     url: '/my/cate/list',
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

 







})