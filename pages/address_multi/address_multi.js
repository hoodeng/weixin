var area = require('../../data/area')
var p = 0, c = 0, d = 0
Page({
  data: {
    provinceName: [],
    provinceCode: [],
    provinceSelIndex: '',
    cityName: [],
    cityCode: [],
    citySelIndex: '',
    districtName: [],
    districtCode: [],
    districtSelIndex: '',
    cityEnabled: false,
    districtEnabled: false,
    showMessage: false,
    messageContent: '',

    //type=0为寄件人，type=1为收件人
    type:0
  },
  onLoad: function (options) {
    console.log(options)
    this.data.type = options.type
    this.setAreaData()
  },
  // 选择省
  changeProvince: function (e) {
    this.resetAreaData('province')
    p = e.detail.value
    this.setAreaData('province', p)
  },
  // 选择市
  changeCity: function (e) {
    this.resetAreaData()
    c = e.detail.value
    this.setAreaData('city', p, c)
  },
  // 选择区
  changeDistrict: function (e) {
    d = e.detail.value
    this.setAreaData('district', p, c, d)
  },
  setAreaData: function (t, p, c, d) {
    switch (t) {
      case 'province':
        this.setData({
          provinceSelIndex: p,
          cityEnabled: true
        })
        break;
      case 'city':
        this.setData({
          citySelIndex: c,
          districtEnabled: true
        })
        break;
      case 'district':
        this.setData({
          districtSelIndex: d
        })
    }

    var p = p || 0 // provinceSelIndex
    var c = c || 0 // citySelIndex
    var d = d || 0 // districtSelIndex
    // 设置省的数据
    var province = area['100000']
    var provinceName = [];
    var provinceCode = [];
    for (var item in province) {
      provinceName.push(province[item])
      provinceCode.push(item)
    }
    this.setData({
      provinceName: provinceName,
      provinceCode: provinceCode
    })
    // 设置市的数据
    var city = area[provinceCode[p]]
    var cityName = [];
    var cityCode = [];
    for (var item in city) {
      cityName.push(city[item])
      cityCode.push(item)
    }
    this.setData({
      cityName: cityName,
      cityCode: cityCode
    })
    // 设置区的数据
    var district = area[cityCode[c]]
    var districtName = [];
    var districtCode = [];
    for (var item in district) {
      districtName.push(district[item])
      districtCode.push(item)
    }
    this.setData({
      districtName: districtName,
      districtCode: districtCode
    })
  },
  // 重置数据
  resetAreaData: function (type) {
    this.setData({
      districtName: [],
      districtCode: [],
      districtSelIndex: '',
      districtEnabled: false
    })
    if (type == 'province') {
      this.setData({
        cityName: [],
        cityCode: [],
        citySelIndex: ''
      })
    }
  },
  savePersonInfo: function (e) {
    let that = this
    var data = e.detail.value
    var telRule = /^1[3|4|5|7|8]\d{9}$/, nameRule = /^[\u2E80-\u9FFF]+$/
    if (data.name == '') {
      this.showMessage('请输入姓名')
    } 
    // else if (!nameRule.test(data.name)) {
    //   this.showMessage('请输入中文名')
    // } 
    else if (data.tel == '') {
      this.showMessage('请输入手机号码')
    } else if (!telRule.test(data.tel)) {
      this.showMessage('手机号码格式不正确')
    } else if (data.province == '') {
      this.showMessage('请选择所在省')
    } else if (data.city == '') {
      this.showMessage('请选择所在市')
    } else if (data.district == '') {
      this.showMessage('请选择所在区')
    } else if (data.address == '') {
      this.showMessage('请输入详细地址')
    } else {
      this.showMessage(' 保存成功')
      console.log(data)

      let userAddressArray = wx.getStorageSync('userAddress')

      // userAddressArray = wx.getStorage({
      //   key: 'userAddress',
      //   success: function (res) {
      //     console.log(res)
      //     userAddressArray = res.data

      //     userAddressArray.push(data)
      //     getApp().globalData.userAddressArray = userAddressArray

      //     console.log(getApp().globalData.userAddressArray)

      //     wx.setStorageSync({
      //       key: 'userAddress',
      //       data: userAddressArray,
      //     })
      //   },
      // })
      
      if(!userAddressArray){
        userAddressArray = []
      }

      userAddressArray.push(data)
      getApp().globalData.userAddressArray = userAddressArray
      console.log(getApp().globalData.userAddressArray)
      wx.setStorageSync('userAddress', userAddressArray)

      

      // if(this.data.type == 1){
      //   let receiver = getApp().globalData.receiver
      //   receiver.name = data.name
      //   receiver.tel = data.tel
      //   receiver.province = data.province
      //   receiver.city = data.city
      //   receiver.district = data.district
      //   receiver.address = data.address
      // }else{
      //   // console.log(getApp().globalData.sender)
      //   let sender = getApp().globalData.sender
      //   sender.name = data.name
      //   sender.tel = data.tel
      //   sender.province = data.province
      //   sender.city = data.city
      //   sender.district = data.district
      //   sender.address = data.address
      // }

      wx.navigateBack({
        delta: 1
      })
    }

  },
  showMessage: function (text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function () {
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 3000)
  }
})