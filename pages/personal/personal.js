// pages/personal/personal.js

// import isEmpty from '../../commom/util.js'
// console.log(isEmpty)

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

 
    services: [],
    servicesType: [],
    serviceIndex: -1,
    serviceTypeIndex: -1,

    categorys: [],
    subCategorys: [],
    catIndex: -1,
    subCatIndex: -1

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('on load')
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
    this.data.userName = e.detail.value
    console.log(this)
  },

  /**
   * 用户联系电话输入
   */
  userTelBindInput: function (e) {
    // this.setData({
    //   userTel: e.detail.value
    // })
    this.data.userTel = e.detail.value
    console.log(this.data.userTel)
  },

  /**
   * 商品类别选择
   */
  categoryBindChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    // let index = e.detail.value
    // this.subCategorys = this.categoryDatas[this.categorys[index]]
    // this.subCatIndex = 0
    // this.setData({
    //   catIndex: e.detail.value,
    //   subCategorys: this.subCategorys,
    //   subCatIndex: this.subCatIndex
    // })

    this.data.catIndex = +e.detail.value
    console.log()
    let parentId = this.data.categorys[+this.data.catIndex].id
    this.setData({
      catIndex: this.data.catIndex 
    })
    this.requestCat(parentId)
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
    this.data.goodsNumber = num
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
    this.data.goodsNumber = result
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
    this.data.goodsNumber = result
    this.setData({
      goodsNumber: result
    })
  },

  clickService: function(e) {
    console.log('click service')
    this.getServices()
  },

  clickServiceType : function(e) {
    console.log('click clickServiceType ' + this.data.serviceIndex)
    let util = require('../../common/util')
    if (this.data.serviceIndex < 0) {
      util.showToast('请先选择服务类目')
      return
    }

    console.log(this.data.services)
    let parentId = this.data.services[this.data.serviceIndex].id
    this.getServiceTypes(parentId)
  },

  clickCat: function (e) {
    let util = require('../../common/util')
    if (this.data.serviceIndex < 0) {
      util.showToast('请先选择服务类目')
      return
    }

    if (this.data.serviceTypeIndex < 0) {
      util.showToast('请先选择服务类型')
      return
    }

    let parentId = this.data.services[this.data.serviceIndex].id
    console.log(parentId)
    this.getCat(parentId)
  },

  clickSubCat: function (e) {
    let util = require('../../common/util')
    if (this.data.serviceIndex < 0) {
      util.showToast('请先选择服务类目')
      return
    }

    if (this.data.serviceTypeIndex < 0) {
      util.showToast('请先选择服务类型')
      return
    }

    if (this.data.catIndex < 0) {
      util.showToast('请先商品类型')
      return
    }

    let parentId = this.data.categorys[this.data.catIndex].id
    console.log(parentId)
    this.getSubCat(parentId)
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
    let index = e.detail.value
    this.data.catIndex = index
    console.log(this)
    let parentId = this.data.services[index].id
    this.getServiceTypes(parentId)
    // if (this.serviceIndex !== +index) {
    //   this.serviceIndex = index
    //   this.serviceTypeIndex = 0
    //   this.setData({
    //     serviceIndex: this.serviceIndex,
    //     serviceTypeIndex:this.serviceTypeIndex
    // })
    // }
  },
  /**
   * 选择服务类型
   */
  bindServiceTypeChange: function (e) {
    this.serviceTypeIndex = e.detail.value
    this.setData({
      serviceTypeIndex: this.serviceTypeIndex
    })
  },

  submit: function (e) {
    console.log('下一步')
    // this.cacheData()
    let util = require('../../common/util')
    if (util.isEmpty(this.data.userName)) {
      util.showToast('请输入联系人姓名')
      return
    }

    if (util.isEmpty(this.data.userTel)) {
      util.showToast('请输入联系人联系电话')
      return
    }

    if (this.data.serviceIndex < 0) {
      util.showToast('请输入服务类目')
      return
    }

    if (this.data.serviceTypeIndex < 0) {
      util.showToast('请输入服务类型')
      return
    }

    if (this.data.catIndex < 0) {
      util.showToast('请输入商品类别')
      return
    }
    if (this.data.subCatIndex < 0) {
      util.showToast('请输入商品子类别')
      return
    }

    this.cacheData()
    
    wx.navigateTo({
      url: '../../pages/custom_info/custom_info'
    })   
  },

  cacheData: function(){
    let order = getApp().orderObject
    console.log(order)
    order.orderCctName = this.data.userName
    order.orderCctMobile = this.data.userTel
    order.topCatId = this.data.services[this.data.serviceIndex].id
    order.svrId = this.data.servicesType[this.data.serviceTypeIndex].id
    order.Items = []
    let goods = {}
    goods.subCatId = this.data.categorys[this.data.catIndex].id
    goods.leafCatId = this.data.subCategorys[this.data.subCatIndex].id
    goods.itemNum = this.data.goodsNumber
    goods.model = this.data.goodsModel
    order.Items.push(goods)

    console.log(order)
  },

  getServices: function() {
    let actions = require('../../common/networks')
    let that =  this
    console.log(this)
    this.data.serviceIndex = 0
    actions.getServices({},function(data){
      that.data.services = data || []
      console.log(that)
      that.setData({
        services : that.data.services,
        serviceIndex: that.data.serviceIndex
      })
    },function(res){
      console.log(res)
    })
  },

  getServiceTypes : function (parentId){
    let actions = require('../../common/networks')
    let that = this
    console.log(this)
    let param = {
      topCatId: parentId
    }
    this.data.serviceTypeIndex = 0
    actions.getServicesType(param, function (data) {
      that.data.servicesType = data || []
      that.setData({
        servicesType: that.data.servicesType,
        serviceTypeIndex: that.data.serviceTypeIndex
      })
    }, function (res) {
      console.log(res)
    })
  },

  getCat: function (parentId) {
    let actions = require('../../common/networks')
    let that = this
    let param = {
      parentId
    }
    actions.getCat(param, function (data) {
      that.data.categorys = data || []
      that.data.catIndex = 0
      console.log(that.data.categorys)
      that.setData({
        categorys: that.data.categorys,
        catIndex: that.data.catIndex
      })
    }, function (res) {
      console.log(res)
    })
  },

  getSubCat: function(parentId) {
    let actions = require('../../common/networks')
    let that = this
    let param = {
      parentId
    }
    actions.getCat(param, function (data) {
      that.data.subCategorys = data || []
      that.data.subCatIndex = 0
      console.log(that.data.categorys)
      that.setData({
        subCategorys: that.data.subCategorys,
        subCatIndex: that.data.subCatIndex
      })
    }, function (res) {
      console.log(res)
    })
  }

})