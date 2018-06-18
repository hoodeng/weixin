function request(url, data, success, fail) {
  wx.request({
    url: url,
    data:data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res)
      if(res.data.code == 200) {
        success(res.data.data)
      }else{
        fail(res.data)
      } 
    },
    fail: function (res){
      let error = {}
      error.code = -1000
      error.msg = '网络出现异常'
      fail(error)
    }
  })
}

module.exports = {
  request: request
}