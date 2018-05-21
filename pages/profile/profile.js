// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatorUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.login({
      // login流程  
      success: function (res) {
        //登录成功  
        if (res.code) {
          // 这里是用户的授权信息每次都不一样  
          var code = res.code;
          that.auth(code)
          console.log(res)
          wx.getUserInfo({
            // getUserInfo流程  
            success: function (res2) {
              console.log(res2)
              // that.globalData.userInfo = res2.userInfo
              // typeof cb == "function" && cb(that.globalData.userInfo)
              // var username = res2.userInfo.nickName
              // var img = res2.userInfo.avatarUrl
              // // 请求自己的服务器  
              // Login(code, username, img);
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户登录态失败！' + res.errMsg
          })
        }
      }
    })
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //     var userInfo = res.userInfo
    //     // var nickName = userInfo.nickName
    //     // var avatarUrl = userInfo.avatarUrl
    //     // var gender = userInfo.gender
    //     // var province = userInfo.province
    //     // var city = userInfo.city
    //     // var country = userInfo.country
    //     that.setData({
    //       nickName: userInfo.nickName,
    //       avatorUrl: userInfo.avatarUrl
    //     })
    //   }
    // })
  },

  auth: function (code) {
    let HTTP_URL = 'https://api.weixin.qq.com/sns/jscode2session?'
    wx.request({
      url: HTTP_URL,
      data:
      {
        appid: 'wxd2454c70fef36230',
        secret: 'f6286b58475803baad3918b162bee560',
        js_code: code,
        grant_type: 'authorization_code'
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (a) {
        var openid = a.data.openid
        // 请求自己的服务器  
        wx.request({
          url: API_URL,
          data:
          {
            img: img,
            openid: openid,
            username: username,
          },
          success: function (b) {
            // 成功返回用户的唯一ID(这是数据库ID)  
            console.log(b.data.uid)
            // 我这里是把用户返回的ID存到了缓存里因为，我在使用全局变  
            // 量时候发现有时候引入了js但是还会有丢失找不到的现象  
            // wx.setStorageSync('uid', b.data.uid)
          }
        })
      },
      fail: function () {
        // 在这里你要考虑到用户登录失败的情况  
        wx.showToast({
          title: '网站正在维护中...',
          icon: 'loading',
          duration: 10000
        });
      }
    })

  },

  addressManager: function (e) {
    wx.navigateTo({
      url: '../address_manager/address_manager?userType=2',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})