// var url = 'http://api-demo-manage.chumanapp.com/secure/'
var url = 'http://api.chumanapp.com/secure/'
var list = []

//获取列表
function getList() {
  $.ajax({
    url: url + 'index.php?m=Api&c=punisNotice&a=notice_list',
    type: 'POST',
    data: {
      page: 1,
      pagesize: 999,
    },
    success: function (res) {
      console.log(res)
      list = res.data.list
      var str = ''
      for (var i = 0; i < res.data.list.length; i++) {
        var name = res.data.list[i].notice_title
        name = name.substring(7)
        if (i == 0) {
          str +=
            '<div class="changeBtn" onclick="changeData(this)"><a class="active">' +
            name +
            '</a></div> '
        } else {
          str +=
            '<div class="changeBtn"  onclick="changeData(this)"><a>' +
            name +
            '</a></div> '
        }
      }
      $('.scrollBox').append(str)
      getData(list[0].id)
    },
    error: function (err) {
      console.log(err)
    },
  })
}
//获取详情
function getData(id) {
  var tableStr = '<tr><th>处罚账号</th> <th>处罚原因</th><th>处罚措施</th></tr>'
  $.ajax({
    url: url + 'index.php?m=Api&c=punisNotice&a=notice_detail',
    type: 'POST',
    data: {
      id: id,
    },
    success: function (res) {
      $('.title').html(res.data.list.notice_title)
      $('.msg1').html(res.data.list.notice_content)
      $('.msg2').html(
        res.data.list.notice_time_num + '<br/>' + res.data.list.notice_end
      )
      $('.msg3').html(res.data.list.notice_end_tips)
      var tableData = JSON.parse(res.data.list.punis_user_info)

      for (var i = 0; i < tableData.length; i++) {
        tableStr +=
          '<tr><td>' +
          tableData[i].punish_account +
          '</td><td>' +
          tableData[i].punish_reason +
          '</td><td>' +
          tableData[i].punish_method +
          '</td></tr>'
      }
      $('.tableBox').html(tableStr)
    },
    error: function (err) {
      console.log(err)
    },
  })
}
//选择列表
function changeData(e) {
  // console.log($(e).index())
  $(e)
    .children()
    .addClass('active')
    .parent()
    .siblings()
    .children()
    .removeClass('active')
  getData(list[$(e).index()].id)
}

getList()
