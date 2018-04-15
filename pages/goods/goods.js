// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weightInput:0,
    weight:'',
    vLenght:0,
    vWidht:0,
    vHeight:0,
    goodsName:'',
    goodsNameIndex:-1,

    goodsNameArray:['日用品','文件','数码产品','服装','食品','其他']

  },

  add: function(e){
    console.log('add')
    console.log(this.data.weight)
    let result = +this.data.weight+1
    // console.log('result -- ' + result)
    this.setData({
      weight:result
    })
  },

  reduce: function(e){
    console.log('add')
    console.log(this.data.weight)
    let result = +this.data.weight - 1
    if(result <= 0){
      result = ''
    }
    // console.log('result -- ' + result)
    this.setData({
      weight: result
    })
  },

  vWeight: function(e){
    this.data.weight = e.detail.value
    console.log(this.data.weight)
  },

  vLenght: function(e){
    this.data.vLenght = e.detail.value
    console.log(this.data.vLenght)
  },

  vWidth: function (e) {
    this.data.vWidth = e.detail.value
    console.log(this.data.vWidth)
  },

  vHeight: function (e) {
    this.data.vHeight = e.detail.value
    console.log(this.data.vHeight)
  },

  onClickGoods: function(e){
    console.log(e.target.dataset.id)
    goodsNameIndex = e.target.dataset.id

    this.setData({
      goodsNameIndex:e.target.dataset.id
    })
  },

  submit: function(e){
    console.log('重量：' + this.data.weight)
    console.log('体积：' + this.data.vLenght + ' ' + this.data.vWidth + ' ' + this.data.vHeight)
    console.log('货品名称: ' + this.data.goodsNameArray[goodsNameIndex])

    let goodsInfo = getApp().globalData.goodsInfo
    goodsInfo.volume.length = this.data.vLenght
    goodsInfo.volume.width = this.data.vWidth
    goodsInfo.volume.height = this.data.vHeight
    goodsInfo.weight = this.data.weight

    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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