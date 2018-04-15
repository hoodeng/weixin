// pages/destop/destop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sender: {
      // name:'张三',
      // address: '',
      // tel:'13812345678',
      // province:'',
      // city:'',
      // district:'',
    },
    receiver: {
      // name: '张三',
      // address: '',
      // tel: '13812345678',
      // province: '',
      // city: '',
      // district: '',
    },
    goodsVolume:{
      length:'',
      width:'',
      height:''
    },
    goodsWeight:'',
    // gLenght:'',
    // gWidth:'',
    // gHeight:'',
    // gWeight:'',

    deliveryTime:'现在发货',
    arrow_src:'../../resources/mine_info.png'
  },


  toGoodsInfo: function(e){
    wx.navigateTo({
      url: '../goods/goods',
    })
  },

  timeSelected: function(e){
    wx.navigateTo({
      url: '../time/time',
    })
  },

  checkEmpty: function(o){
    return o && o != ''
  },

  checkVolume: function(){
    let volume = this.data.goodsVolume
    return volume && !this.checkEmpty(volume.length) && !this.checkEmpty(volume.width) && !this.checkEmpty(volume.height)
  },

  submit: function(e){
    if (!this.data.sender || Object.keys(this.data.sender).length < 1){
      wx.showToast({
        title: '请输入寄件人信息',
        icon:'none'
      })
      return
    }

    if (!this.data.receiver || Object.keys(this.data.receiver).length < 1) {
      wx.showToast({
        title: '请输入寄件人信息',
        icon: 'none'
      })
      return
    }

    if (this.checkVolume() && (!this.data.goodsWeight || this.data.goodsWeight <= 0)){
      wx.showToast({
        title: '请输入货品信息',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '../mock_order/mock_order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.initData();
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
    // console.log('onShow')
    let app = getApp()
    let goodsInfo = app.globalData.goodsInfo
    // console.log(goodsInfo)
    if(goodsInfo){
      let goodsVolume = this.data.goodsVolume
      if (goodsInfo.volume){
        goodsVolume.length = goodsInfo.volume.length
        goodsVolume.width = goodsInfo.volume.width
        goodsVolume.height = goodsInfo.volume.height
      }
      
      this.data.goodsWeight= goodsInfo.weight
      this.setData({
        goodsVolume: this.data.goodsVolume,
        goodsWeight: this.data.goodsWeight
      })
    }

    let sender = app.globalData.sender
    if(sender){
      this.setData({
        sender: sender
      })
    }

    let receiver = app.globalData.receiver
    if(receiver){
      this.setData({
        receiver: receiver
      })
    }

    let delivary = app.globalData.deliveryTime
    // console.log(delivary)
    this.setData({
      deliveryTime: delivary
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUpload')
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

  initData:function(){
    // console.log('initData function')
    // this.setData({
    //   'sender.name':'李四',
    //   'sender.tel':'13812345678',
    //   'sender.province':'广东省',
    //   'sender.city':'广州市',
    //   'sender.district':'荔湾区',
    //   'sender.detail':'芳村',

    //   'receiver.name': '王五',
    //   'receiver.tel': '13812345678',
    //   'receiver.province': '广东省',
    //   'receiver.city': '广州市',
    //   'receiver.district': '天河区',
    //   'receiver.detail': '棠东',
    // })
  },

  toSenderAddress: function(){
    //  wx.navigateTo({
    //    url: '../address_multi/address_multi?tpye=0',
    //  })
    wx.navigateTo({
      url: '../address_manager/address_manager?userType=0',
    })
  },

  toReceiverAddress:function(e){
    wx.navigateTo({
      url: '../address_manager/address_manager?userType=1',
    })
  },


  getAppGlobelSender:function(){
  }
})