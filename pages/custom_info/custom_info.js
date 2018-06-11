// pages/custom_info/custom_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    express:[],
    expressIndex:0,
    expressReact:["已到货","未到货"],
    expressReactIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.express = require('../../data/express')
    this.setData({
      express: this.express,

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
  
  },

   /**
   * 物流公司选择
   */
  expressBindChange : function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      expressIndex: e.detail.value
    })
  },

  /**
   * 物流公司选择
   */
  expressReactBindChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      expressReactIndex: e.detail.value
    })
  },

})