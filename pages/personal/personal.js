// pages/personal/personal.js


Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    //下单人信息
    userName: '',
    userTel: '',

    //服务选择
    services: [],
    servicesType: [],
    serviceIndex: -1,
    serviceTypeIndex: -1,



    //商品数组
    goodsArray: [
      // {
      //   categorys: [
      //   ],
      //   catIndex: -1,
      //   subCategorys: [],
      //   subCatIndex: -1,
      //   hasSubCat: false,//是否有子商品分类，不一定有

      //   goodsNumber: 1,
      //   goodsModel: '',
      //   goodsWarning: '',
      //   vLength: 0,
      //   vWidth: 0,
      //   vHeight: 0,
      //   weight: 0
      // }
    ]
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
    this.data.userName = e.detail.value
  },

  /**
   * 用户联系电话输入
   */
  userTelBindInput: function (e) {
    this.data.userTel = e.detail.value
  },

  /**
  * 选择服务类目
  */
  bindServiceChange: function (e) {
    let index = e.detail.value
    this.data.serviceIndex = index
    this.data.servicesType = []
    this.data.serviceTypeIndex = -1
    this.data.categorys = []
    this.data.catIndex = -1
    this.data.subCategorys = []
    this.data.subCatIndex = -1
    this.data.hasSubCat = false
    this.data.goodsArray = []
    
    this.setData({
      serviceIndex: this.data.serviceIndex,
      servicesType: this.data.servicesType,
      serviceTypeIndex: this.data.serviceTypeIndex,
      categorys: this.data.categorys,
      catIndex: this.data.catIndex,
      subCategorys: this.data.subCategorys,
      subCatIndex: this.data.subCatIndex,
      hasSubCat: this.data.hasSubCat,
      goodsArray: this.data.goodsArray
    })
    let parentId = this.data.services[index].id
    this.getServiceTypes(parentId)
  },
  /**
   * 选择服务类型
   */
  bindServiceTypeChange: function (e) {
    this.data.serviceTypeIndex = e.detail.value
    this.setData({
      serviceTypeIndex: this.data.serviceTypeIndex
    })
  },

  /**
   * 商品类别选择
   */
  categoryBindChange: function (e) {

    // this.data.catIndex = +e.detail.value
    // let _catItem = this.data.categorys[+this.data.catIndex]
    // let parentId = _catItem.id
    // this.data.subCategorys = []
    // this.data.subCatIndex = -1
    // this.data.hasSubCat = (+_catItem.isLeaf == 0)
    // this.setData({
    //   catIndex: this.data.catIndex,
    //   hasSubCat: this.data.hasSubCat,
    //   subCategorys: this.data.subCategorys,
    //   subCatIndex: this.data.subCatIndex
    // })

    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]

    goods.catIndex = +e.detail.value
    let _catItem = goods.categorys[+goods.catIndex]
    let parentId = _catItem.id
    goods.subCategorys = []
    goods.subCatIndex = -1
    goods.hasSubCat = (+_catItem.isLeaf == 0)
    this.setData({
      goodsArray: this.data.goodsArray
    })
  },

  /**
    * 商品子类别选择
    */
  subCategoryBindChange: function (e) {
    this.setData({
      subCatIndex: e.detail.value
    })
  },

  /**
   * 数量输入
   */
  bindNumberInput: function (e) {
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
    this.data.goodsModel = e.detail.value
  },

  /**
   * 特殊要求输入
   */
  bindWarningInput: function (e) {
    // this.data.goodsWarning = e.detail.value
    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    goods.goodsWarning = e.detail.value

    console.log(goods)
  },

  vLengthBindInput: function (e) {
    // this.data.vLength = e.detail.value

    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    goods.vLength = e.detail.value
    console.log(goods)
  },

  vWidthBindInput: function (e) {
    // this.data.vWidth = e.detail.value
    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    goods.vWidth = e.detail.value
    console.log(goods)
  },

  vHeightBindInput: function (e) {
    // this.data.vHeight = e.detail.value
    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    goods.vHeight = e.detail.value
    console.log(goods)
  },

  weightBindInput: function (e) {
    // this.data.weight = e.detail.value

    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    goods.weight = e.detail.value
    console.log(goods)
  },

  /**
   * 数量增加
   */
  add: function (e) {
    // let result = +this.data.goodsNumber + 1
    // if (result < 1) {
    //   result = 1
    // }
    // this.data.goodsNumber = result
    // this.setData({
    //   goodsNumber: result
    // })

    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]


    let result = +goods.goodsNumber + 1
    if (result < 1) {
      result = 1
    }
    goods.goodsNumber = result
    this.setData({
      goodsArray: this.data.goodsArray
    })
  },

  /**
   * 数量减少
   */
  reduce: function (e) {
    // let result = +this.data.goodsNumber - 1
    // if (result < 1) {
    //   result = 1
    // }
    // this.data.goodsNumber = result
    // this.setData({
    //   goodsNumber: result
    // })

    let index = e.currentTarget.dataset.index
    let goods = this.data.goodsArray[index]
    let result = +goods.goodsNumber - 1
    if (result < 1) {
      result = 1
    }
    goods.goodsNumber = result
    this.setData({
      goodsArray: this.data.goodsArray
    })
  },

  clickService: function (e) {
    this.getServices()
  },

  clickServiceType: function (e) {
    let util = require('../../common/util')
    if (this.data.serviceIndex < 0) {
      util.showToast('请先选择服务类目')
      return
    }

    let parentId = this.data.services[this.data.serviceIndex].id
    this.getServiceTypes(parentId)
  },

  clickCat: function (e) {
    console.log(e)
    let util = require('../../common/util')
    if (this.data.serviceIndex < 0) {
      util.showToast('请先选择服务类目')
      return
    }

    if (this.data.serviceTypeIndex < 0) {
      util.showToast('请先选择服务类型')
      return
    }

    // let parentId = this.data.services[this.data.serviceIndex].id
    // this.getCat(parentId)


    //test
    let goods = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    goods = this.data.goodsArray[index]
    console.log(index)
    console.log(goods)
    let parentId = this.data.services[this.data.serviceIndex].id
    this.getCat(goods, parentId)
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

    // if (this.data.catIndex < 0) {
    //   util.showToast('请先商品类型')
    //   return
    // }
    // let parentId = this.data.categorys[this.data.catIndex].id
    // this.getSubCat(parentId)


    let goods = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    goods = this.data.goodsArray[index]

    console.log(index)
    console.log(goods)
    if (goods.catIndex < 0) {
      util.showToast('请先商品类型')
      return
    }
    let parentId = goods.categorys[goods.catIndex].id
    this.getSubCat(goods, parentId)

  },

  /**
   * 选取照片
   */
  takePhoto: function (e) {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths
        if (!that.imageUrls) {
          that.imageUrls = []
        }
        that.imageUrls.push(tempFilePaths)
        that.setData({
          textHidden: true,
          imageUrls: that.data.imageUrls,
          photoHidden: false
        })
      }
    })
  },



  removeGoods: function (e) {
    let that =this
    wx.showModal({
      title: '温馨提示',
      content: '确认要删除商品吗',
      success: function (res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          that.data.goodsArray.splice(index, 1)

          that.setData({
            goodsArray: that.data.goodsArray
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  addGoods: function (e) {
    let goods = this.cloneEmptyGoods()
    this.data.goodsArray.push(goods)
    console.log('========================')
    console.log(this.data.goodsArray)
    this.setData({
      goodsArray: this.data.goodsArray
    })
  },

  cloneEmptyGoods: function () {
    var newobj = {
      categorys: [],
      catIndex: -1,
      subCategorys: [],
      subCatIndex: -1,
      hasSubCat: false,//是否有子商品分类，不一定有

      goodsNumber: 1,
      goodsModel: '',
      goodsWarning: '',
      vLength: 0,
      vWidth: 0,
      vHeight: 0,
      weight: 0
    }
    return newobj
  },


  submit: function (e) {
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

    if (!this.data.goodsArray || this.data.goodsArray.length <=0) {
      util.showToast('请添加商品')
      return
    }

    this.data.goodsArray.forEach((item) => {
      if (item.catIndex < 0) {
        util.showToast('请输入商品类别')
        return
      }
      if (item.hasSubCat && item.subCatIndex < 0) {
        util.showToast('请输入商品子类别')
        return
      }
    })

    this.cacheData()

    wx.navigateTo({
      url: '../../pages/custom_info/custom_info'
    })
  },

  cacheData: function () {
    let order = getApp().orderObject
    let _data = this.data
    order.orderCctName = _data.userName
    order.orderCctMobile = _data.userTel
    order.topCatId = _data.services[_data.serviceIndex].id
    order.svrId = _data.servicesType[_data.serviceTypeIndex].id

    order.items = []
    _data.goodsArray.forEach((item)=>{
      let goods = {}
      goods.subCatId = item.categorys[item.catIndex].id

      if (item.hasSubCat) {
        goods.leafCatId = item.subCategorys[item.subCatIndex].id
      } else {
        // order.leafCatId = ''
      }
      goods.itemNum = item.goodsNumber
      goods.model = item.goodsModel
      goods.req = item.goodsWarning
      goods.width = item.vWidth
      goods.height = item.vHeight
      goods.length = item.vLength
      goods.weight = item.weight
      order.items.push(goods)
    }) 
  },

  getServices: function () {
    let actions = require('../../common/networks')
    let that = this
    this.data.serviceIndex = 0
    actions.getServices({}, function (data) {
      that.data.services = data || []
      that.setData({
        services: that.data.services,
        serviceIndex: that.data.serviceIndex
      })
    }, function (res) {
    })
  },

  getServiceTypes: function (parentId) {
    let actions = require('../../common/networks')
    let that = this
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
    })
  },

  getCat: function (goods, parentId) {
    let actions = require('../../common/networks')
    let that = this
    let param = {
      parentId
    }
    actions.getCat(param, function (data) {
      // that.data.categorys = data || []
      // that.data.catIndex = 0
      // if (that.data.categorys.length > 0) {
      //   let _catItem = that.data.categorys[that.data.catIndex]
      //   that.data.hasSubCat = (+_catItem.isLeaf == 0)
      // }

      // that.setData({
      //   categorys: that.data.categorys,
      //   catIndex: that.data.catIndex,
      //   hasSubCat: that.data.hasSubCat
      // })


      goods.categorys = data || []
      goods.catIndex = 0
      if (goods.categorys.length > 0) {
        let _catItem = goods.categorys[goods.catIndex]
        goods.hasSubCat = (+_catItem.isLeaf == 0)
      }
      console.log(goods)
      console.log(that.data.goodsArray)

      that.setData({
        // categorys: that.data.categorys,
        // catIndex: that.data.catIndex,
        // hasSubCat: that.data.hasSubCat,

        goodsArray: that.data.goodsArray
      })
    }, function (res) {
    })
  },

  getSubCat: function (goods, parentId) {
    let actions = require('../../common/networks')
    let that = this
    let param = {
      parentId
    }
    // actions.getCat(param, function (data) {
    //   that.data.subCategorys = data || []
    //   that.data.subCatIndex = 0
    //   that.setData({
    //     subCategorys: that.data.subCategorys,
    //     subCatIndex: that.data.subCatIndex
    //   })
    // }, function (res) {
    // })

    actions.getCat(param, function (data) {
      goods.subCategorys = data || []
      goods.subCatIndex = 0
      that.setData({
        // subCategorys: that.data.subCategorys,
        // subCatIndex: that.data.subCatIndex

        goodsArray: that.data.goodsArray
      })
    }, function (res) {
    })
  }

})