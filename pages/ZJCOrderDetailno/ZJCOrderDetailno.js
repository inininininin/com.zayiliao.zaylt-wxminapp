// pages/ZJCOrderDetailno/ZJCOrderDetailno.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '订单详情',
    statusBarHeight: '',
    titleBarHeight: '',
    addressList: [],
    overIf: 0,
    address1:'',
    address2:'',
    receiverTel:'',
    receiverName: '',
    details:[],
    orderId:'',
    totalPrice: '',
    useBonusPoint:'',
    expressCoCode:'',
    expressNo:'',
  },
  searchWl:function(e){
    wx.navigateTo({
      url: '../webview/webview?href=https://m.kuaidi100.com/index_all.html?type=' + this.data.expressCoCode + '&postid=' + this.data.expressNo + '&callbackurl=' +'../ZJCOrderDetailno/ZJCOrderDetailno'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    var overIf = options.overIf
    var orderId = options.id
    that.setData({
      token: token,
      domain: domain,
      overIf: overIf,
      orderId: orderId,
    })
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/orderinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
        orderId: orderId
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            receiverTel: res.data.data.receiverTel,
            receiverName: res.data.data.receiverName,
            details: res.data.data.details,
            totalPrice: res.data.data.totalPrice,
            useBonusPoint: res.data.data.useBonusPoint,
            expressCoCode: res.data.data.expressCoCode,
            expressNo: res.data.data.expressNo,
          })
          if (res.data.data.receiverAddress != '' && res.data.data.receiverAddress != null && res.data.data.receiverAddress != undefined) {
            var address1 = res.data.data.receiverAddress.split('%$')[0]
            var address2 = res.data.data.receiverAddress.split('%$')[1]
            that.setData({
              address1: address1,
              address2: address2,
            })
          }
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    });
    


    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  backHistory: function (e) {
    wx.navigateBack({

    })
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