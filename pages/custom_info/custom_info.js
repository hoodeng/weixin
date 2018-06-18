// pages/custom_info/custom_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customName: '',
    customTel: '',

    provinces: [],
    provinceIndex: -1,
    citys: [],
    cityIndex: -1,
    districts: [],
    districtIndex: -1,
    streets: [],
    streetIndex: -1,
    customAddress: '',//详细地址

   //楼梯信息
    stairsIndex:0,
    stairs:['有电梯','无电梯'],
    floor:'',


    needJDCheckout: false,//是否需要喵师傅核销
    needAliCheckout: false,//是否需要汪师傅核销
    checkoutCodes: [
      {
        checkoutCode: '',//核销码
      }
    ],

    takeGoodsAddress: '',//提货地址
    takeGoodsTel: '',//提货电话
    takeGoodsNum: 1,
    needExpress: false,//是否需要到物流点提货

    express: [],
    expressIndex: -1,
    expressReact: ["未到货", "已到货"],
    expressReactIndex: 0,
    expressOrderSn: '',//物流单号
  },

  cacheData: function () {
    let util = require('../../common/util')
    let order = getApp().orderObject
    let _data = this.data
    order.cstName = _data.customName
    order.cstMobile = _data.customTel
    order.cstAddrProvCode = _data.provinces[_data.provinceIndex].code
    order.cstAddrCityCode = _data.citys[_data.cityIndex].code
    order.cstAddrAreaCode = _data.districts[_data.districtIndex].code
    order.cstAddrDistrict = _data.streets[_data.streetIndex].code
    order.cstAddrDetail = _data.customAddress
    order.bldLift = (_data.stairsIndex ==1)? '0':'1'
    order.bldFloor = _data.floor
    if (_data.needJDCheckout) {
      order.verify = '1'
    } else if (_data.needAliCheckout) {
      order.verify = '2'
    }else{
      order.verify = '0'
    }
    order.verifyCode = ''
    if (_data.needJDCheckout || _data.needAliCheckout) {
      _data.checkoutCodes.forEach((item) => {
        if (!util.isEmpty(item.checkoutCode)) {
          if (order.verifyCode.length > 0) {
            order.verifyCode = order.verifyCode + ','
          }
          order.verifyCode = order.verifyCode + item.checkoutCode 
        }
      })
    }
    order.pkAddr = _data.takeGoodsAddress
    order.pkCctMobile = _data.takeGoodsTel
    order.pkgNum = _data.takeGoodsNum
    if (_data.needExpress) {
      order.exprComId = _data.express[_data.expressIndex].id
      order.exprStatus = _data.expressReactIndex
      order.exprOrderNo = _data.expressOrderSn
    } else {
      // order.exprComId = ''
      // order.exprStatus = ''
      // order.exprOrderNo = ''
    }
    console.log(order)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let s= ''
    let s1= 'ss'
    console.log(s.length + '  ' + s1.length)
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

  userNameBindInput: function (e) {
    this.data.customName = e.detail.value
  },

  userTelBindInput: function (e) {
    this.data.customTel = e.detail.value
  },

  addressBindInput: function (e) {
    this.data.customAddress = e.detail.value
  },

  floorBindInput: function (e) {
    this.data.floor = e.detail.value
  },

  checkoutBindInput: function (e) {
    // this.data.checkoutCode = e.detail.value
    let index = e.currentTarget.dataset.index
    let itemCode = this.data.checkoutCodes[index]
    itemCode.checkoutCode = e.detail.value
  },

  takeAddressBindInput: function (e) {
    this.data.takeGoodsAddress = e.detail.value
  },

  takeTelBindInput: function (e) {
    this.data.takeGoodsTel = e.detail.value
  },

  takeNumBindInput: function (e) {
    this.data.takeGoodsNum = e.detail.value
  },

  expressNoBindInput: function (e) {
    this.data.expressOrderSn = e.detail.value
  },


  clickProvince: function (e) {
    this.getProvince()
  },

  clickCity: function (e) {
    let util = require('../../common/util')
    if (this.data.provinceIndex < 0) {
      util.showToast('请先选择省份')
      return
    }

    let _province = this.data.provinces[this.data.provinceIndex]
    if (this.isSpecCity(_province.name)) {
      let _citys = []
      _citys.push(_province)
      this.data.citys = _citys
      this.data.cityIndex = 0
      this.setData({
        citys: this.data.citys,
        cityIndex: this.data.cityIndex
      })

      return
    }

    let parentCode = _province.code
    this.getCity(parentCode)
  },

  clickDistrict: function (e) {
    let util = require('../../common/util')
    if (this.data.provinceIndex < 0) {
      util.showToast('请先选择省份')
      return
    }

    if (this.data.cityIndex < 0) {
      util.showToast('请先选择城市')
      return
    }

    let _city = this.data.citys[this.data.cityIndex]
    let parentCode = _city.code
    this.getDistrict(parentCode)
  },

  clickStreet: function (e) {
    let util = require('../../common/util')
    if (this.data.provinceIndex < 0) {
      util.showToast('请先选择省份')
      return
    }

    if (this.data.cityIndex < 0) {
      util.showToast('请先选择城市')
      return
    }

    if (this.data.districtIndex < 0) {
      util.showToast('请先选择区县')
      return
    }

    let _district = this.data.districts[this.data.districtIndex]
    let parentCode = _district.code
    this.getStreet(parentCode)
  },

  clickExpress: function (e) {
    this.getExpress()
  },

  provinceBindChange: function (e) {
    this.data.provinceIndex = e.detail.value
    this.data.citys = []
    this.data.cityIndex = -1
    this.data.districts = []
    this.data.districtIndex = -1
    this.data.streets = []
    this.data.streetIndex = -1

    this.setData({
      provinceIndex: this.data.provinceIndex,
      citys: this.data.citys,
      cityIndex: this.data.cityIndex,
      districts: this.data.districts,
      districtIndex: this.data.districtIndex,
      streets: this.data.streets,
      streetIndex: this.data.streetIndex
    })
  },
  cityBindChange: function (e) {
    this.data.cityIndex = e.detail.value
    this.data.districts = []
    this.data.districtIndex = -1
    this.data.streets = []
    this.data.streetIndex = -1

    this.setData({
      cityIndex: this.data.cityIndex,
      districts: this.data.districts,
      districtIndex: this.data.districtIndex,
      streets: this.data.streets,
      streetIndex: this.data.streetIndex
    })
  },
  districtBindChange: function (e) {
    this.data.districtIndex = e.detail.value
    this.data.streets = []
    this.data.streetIndex = -1

    this.setData({
      districtIndex: this.data.districtIndex,
      streets: this.data.streets,
      streetIndex: this.data.streetIndex
    })
  },
  streetBindChange: function (e) {
    this.data.streetIndex = e.detail.value
    this.setData({
      streetIndex: this.data.streetIndex
    })
  },

  stairsBindChange: function (e) {
    this.data.stairsIndex = e.detail.value
    this.setData({
      stairsIndex: this.data.stairsIndex
    })
  },

  needCheckedChange: function (e) {
    this.data.needJDCheckout = !this.data.needJDCheckout
    if (this.data.needJDCheckout) {
      this.data.needAliCheckout = false
    }
    this.setData({
      needJDCheckout: this.data.needJDCheckout,
      needAliCheckout:this.data.needAliCheckout
    })
  },

  needAliCheckedChange: function (e) {
    this.data.needAliCheckout = !this.data.needAliCheckout
    if (this.data.needAliCheckout) {
      this.data.needJDCheckout = false
    }
    this.setData({
      needAliCheckout: this.data.needAliCheckout,
      needJDCheckout:this.data.needJDCheckout
    })
  },

  

  addCheckoutCode: function(e) {
    let _code = {
      'checkoutCode':''
    }
    this.data.checkoutCodes.push(_code)
    this.setData({
      checkoutCodes:this.data.checkoutCodes
    })
  },

  needExpressChange: function (e) {
    this.data.needExpress = !this.data.needExpress
    this.setData({
      needExpress: this.data.needExpress
    })
  },

  /**
  * 物流公司选择
  */
  expressBindChange: function (e) {
    this.data.expressIndex = e.detail.value
    this.setData({
      expressIndex: e.detail.value
    })
  },

  /**
   * 物流公司选择
   */
  expressReactBindChange: function (e) {
    this.data.expressReactIndex = e.detail.value
    this.setData({
      expressReactIndex: e.detail.value
    })
  },

  submit: function (e) {
    let _data = this.data
    let util = require('../../common/util')
    if (util.isEmpty(_data.customName)) {
      util.showToast('请输入客户姓名')
      return
    }
    if (util.isEmpty(_data.customTel)) {
      util.showToast('请输入客户电话')
      return
    }

    if (_data.provinceIndex < 0 || _data.cityIndex < 0 || _data.districtIndex < 0 || _data.streetIndex < 0 || util.isEmpty(_data.customAddress)) {
      util.showToast('请输入客户地址信息')
      return
    }

    if (_data.needJDCheckout || _data.needAliCheckout) {
      let hasCheckoutCode = false
      _data.checkoutCodes.forEach((item) => {
        if (!util.isEmpty(item.checkoutCode)) {
          hasCheckoutCode = true
        }
      })
      if (!hasCheckoutCode) {
        util.showToast('请输入核销码')
        return
      }
    }

    if (util.isEmpty(_data.takeGoodsAddress)) {
      util.showToast('请输入提货地址')
      return
    }

    if (util.isEmpty(_data.takeGoodsTel)) {
      util.showToast('请输入提货电话')
      return
    }

    if (_data.needExpress) {
      if (_data.expressIndex < 0) {
        util.showToast('请选择物流公司')
        return
      }

      if (util.isEmpty(_data.expressOrderSn)) {
        util.showToast('请输入物流单号')
        return
      }
    }

    this.cacheData()

    this.createOrder()
  },



  createOrder: function () {
    console.log('create order')
    let request = require('../../common/request')
    let util = require('../../common/util')
    let dataJson = getApp().orderObject
    let dataStr = JSON.stringify(dataJson)

    let params = {
      'data': dataStr
    }
    console.log(dataStr)
    let actions = require('../../common/networks')
    let that = this
    actions.createOrder(params, function (data) {
      util.showToast('订单提交成功')
    }, function (res) {
      util.showToast(res.msg)
    })
  },

  getAddress: function (code, success, fail) {
    let actions = require('../../common/networks')
    let that = this
    let param = {}
    if (code) {
      param.parentCode = code
    }
    actions.getAddress(param, function (data) {
      success(data)
    }, function (res) {
      fail(res)
    })
  },

  isSpecCity: function (name) {
    if (!name) {
      return false
    }
    return name.search("北京") != -1 || name.search("上海") != -1 || name.search("重庆") != -1 || name.search("天津") != -1
  },

  getProvince: function () {
    let that = this
    this.getAddress('', (data) => {
      that.data.provinces = data || []
      that.data.provinceIndex = 0

      that.setData({
        provinces: that.data.provinces,
        provinceIndex: that.data.provinceIndex
      })
    }, (res) => {
    })
  },
  getCity: function (parentCode) {
    let that = this
    this.getAddress(parentCode, (data) => {
      that.data.citys = data || []
      that.data.cityIndex = 0
      that.setData({
        citys: that.data.citys,
        cityIndex: that.data.cityIndex
      })
    }, (res) => {

    })
  },
  getDistrict: function (parentCode) {
    let that = this
    this.getAddress(parentCode, (data) => {
      that.data.districts = data || []
      that.data.districtIndex = 0
      that.setData({
        districts: that.data.districts,
        districtIndex: that.data.districtIndex
      })
    }, (res) => {

    })
  },
  getStreet: function (parentCode) {
    let that = this
    this.getAddress(parentCode, (data) => {
      that.data.streets = data || []
      that.data.streetIndex = 0
      that.setData({
        streets: that.data.streets,
        streetIndex: that.data.streetIndex
      })
    }, (res) => {

    })
  },
  getExpress: function () {
    let actions = require('../../common/networks')
    let that = this
    let param = {}
    actions.getExpress(param, function (data) {
      that.data.express = data
      that.data.expressIndex = 0
      that.setData({
        express: that.data.express,
        expressIndex: that.data.expressIndex
      })
    }, function (res) {

    })
  }
})