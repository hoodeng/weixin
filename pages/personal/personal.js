// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userTel: '',
    goodsCategory: '',
    goodsSubCategory: '',
    goodsNumber: 1,
    goodsModel: '',
    goodsWarning: '',
    categorysData: ['床类', '柜类', '家具类'],
    subCategorysData: ['aaa', 'bbb', 'ccc'],
    catIndex: 0,
    subCatIndex: 0,
    services: ['家具类', '灯具类', '卫浴类'],
    servicesType: ['送货到楼下', '送货到家', '安装'],
    serviceIndex: 0,
    serviceTypeIndex: 0
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

  },

  /**
   * 用户名称输入
   */
  userNameBindInput: function (e) {
    // this.setData({
    //   userName:e.detail.value
    // })
    this.userName = e.detail.value
    console.log(this.userName)
  },

  /**
   * 用户联系电话输入
   */
  userTelBindInput: function (e) {
    // this.setData({
    //   userTel: e.detail.value
    // })
    this.userTel = e.detail.value
    console.log(this.userTel)
  },

  /**
   * 商品类别选择
   */
  categoryBindChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      catIndex: e.detail.value
    })
  },

  /**
    * 商品子类别选择
    */
  subCategoryBindChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subCatIndex: e.detail.value
    })
  },

  /**
   * 数量输入
   */
  bindNumberInput: function (e) {
    console.log('bindNumberInput  ' + e.detail.value)
    let num = e.detail.value
    if (num && num < 1) {
      num = 1
    }
    this.setData({
      goodsNumber: num
    })
  },

  /**
   * 商品型号输入
   */
  bindModelInput: function (e) {
    this.goodsModel = e.detail.value
    console.log(this.goodsModel)
  },

  /**
   * 特殊要求输入
   */
  bindWarningInput: function (e) {
    this.goodsWarning = e.detail.value
    console.log(this.goodsWarning)
  },

  /**
   * 数量增加
   */
  add: function (e) {
    let result = +this.data.goodsNumber + 1
    // console.log('result -- ' + result)
    if (result < 1) {
      result = 1
    }
    this.setData({
      goodsNumber: result
    })
  },

  /**
   * 数量减少
   */
  reduce: function (e) {
    let result = +this.data.goodsNumber - 1
    // console.log('result -- ' + result)
    if (result < 1) {
      result = 1
    }
    this.setData({
      goodsNumber: result
    })
  },

  /**
   * 选取照片
   */
  takePhoto: function (e) {
    console.log('take photo')
    let that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (!that.imageUrls) {
          that.imageUrls = []
        }
        that.imageUrls.push(tempFilePaths)
        that.setData({
          textHidden: true,
          imageUrls: that.imageUrls,
          photoHidden: false
        })
      }
    })
  },

  /**
   * 选择服务类目
   */
  bindServiceChange: function (e) {
    this.setData({
      serviceIndex: e.detail.value
    })
  },
  /**
   * 选择服务类型
   */
  bindServiceTypeChange: function (e) {
    this.setData({
      serviceTypeIndex: e.detail.value
    })
  }
})