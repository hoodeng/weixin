function request(url, data, success, fail) {
  wx.request({
    url: url,
    data:data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      // console.log(res.data)
      success(res.data.data)
    },
    fail: function (res){
      fail(res)
    }
  })
}

module.exports = {
  request: request
}