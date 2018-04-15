App({
  onLaunch: function (options) {
    // console.log(this)
    // console.log(options)

    let that = this
    wx.getStorage({
      key: 'userAddress',
      success: function(res) {
        console.log('app launch')
        that.globalData.userAddressArray = res.data
        console.log(that.globalData.userAddressArray)
      },
    })
  },

  globalData:{
    //发货人信息
    sender:{
      // name: '张三',
      // address: '',
      // tel: '13812345678',
      // province: '',
      // city: '',
      // district: '',
    },
    //收货人信息
    receiver:{
      // name: '张三',
      // address: '芳村大道',
      // tel: '13812345678',
      // province: '广东省',
      // city: '广州市',
      // district: '荔湾区',
    },
    //货品信息
    goodsInfo:{
      volume:{},
      weight:''
    },
    //发货时间
    deliveryTime:'现在发货',
    userAddressArray:[]
  }
})