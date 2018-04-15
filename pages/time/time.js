// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      // {
      //   name:'现在发货',
      //   selected:true
      // },
      // {
      //   name: '04-14',
      //   selected: false
      // },
      // {
      //   name: '04-16',
      //   selected: false
      // },
      // {
      //   name: '04-17',
      //   selected: false
      // },
    ],
    // time: this.array[0].name
    time: '现在发货'
  },

  onSelected: function(e){
    console.log(e.currentTarget.dataset.item)
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index

    console.log(this.data.array)
    for(let i = 0;i< this.data.array.length ; i++){
      console.log('for in')
      if(i == index){
        this.data.array[i].selected = true
      }else{
        this.data.array[i].selected = false        
      }
    }

    this.setData({
      array: this.data.array
    })
    this.data.time = this.data.array[index].name
  },

  submit: function(e){
    getApp().globalData.deliveryTime = this.data.time
    wx.navigateBack({
      delta:1
    })
  },

  formatTime: function(date){
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = month + seperator1 + strDate;
    return currentdate;
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let array = this.data.array
    let item0 = {}
    item0.name = '现在发货'
    item0.selected = true
    array[0] = item0

    let date = new Date()
    let item1 = {}
    item1.name = this.formatTime(date)
    item1.selected = false
    array[1] = item1

    let item2 = {}
    item2.name = this.formatTime(new Date(date.getTime() + 24 * 60 * 60 * 1000))
    item2.selected = false
    array[2] = item2

    let item3 = {}
    item3.name = this.formatTime(new Date(date.getTime() + 48 * 60 * 60 * 1000))
    item3.selected = false
    array[3] = item3 

    console.log(this.data.array)
    this.setData({
      array: this.data.array
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
  
  }
})