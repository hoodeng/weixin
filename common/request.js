function request(url, data, success, fail) {
  wx.request({
    url: url,
    data: {
      'parentId':'2'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      success(res)
    }
  })
}

module.exports = {
  request: request
}