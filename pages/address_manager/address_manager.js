// pages/address_manager/address_manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddressArray:[],
    //0为寄件人,1为收件人
    userType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userType = options.userType
    console.log(options)
    console.log(this.data.userType == 1)    
  },

  onItemClick:function(e){
    console.log(e.currentTarget.dataset.item)
    let data = e.currentTarget.dataset.item
    console.log(this.data.userType == 1)
    if (this.data.userType == 1){
      let receiver = getApp().globalData.receiver
      receiver.name = data.name
      receiver.tel = data.tel
      receiver.province = data.province
      receiver.city = data.city
      receiver.district = data.district
      receiver.address = data.address
    } else if (this.data.userType == 0){
      let sender = getApp().globalData.sender
      sender.name = data.name
      sender.tel = data.tel
      sender.province = data.province
      sender.city = data.city
      sender.district = data.district
      sender.address = data.address
    }

    wx.navigateBack({
      delta: 1
    })
  },

  submit: function(e){
    wx.navigateTo({
      url: '../address_multi/address_multi?tpye=2',
    })
  },

  refreshData: function(){
    console.log('refresh data')
    this.data.userAddressArray = getApp().globalData.userAddressArray
    // console.log(getApp().globalData.userAddressArray)
    if (!this.data.userAddressArray || this.data.userAddressArray.length < 1) {
      let that = this

      // that.data.userAddressArray = wx.getStorageSync({
      //   key: 'userAddress',
      //   // success: function (res) {
      //   //   that.data.userAddressArray = res.data
      //   //   // console.log(that.userAddressArray)
      //   // },
      // })

      that.data.userAddressArray = wx.getStorageSync('userAddress')
    }

    this.setData({
      userAddressArray: this.data.userAddressArray
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
    this.refreshData()
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