// pages/ZJCOrderDetail/ZJCOrderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    addressList:[],
    overIf:0,
    token: '',
    domain: '',
    address1: '',
    address2: '',
    receiverTel: '',
    receiverName: '',
    details: [],
    orderId:'',
    totalPrice: '',
    useBonusPoint: '',
    serviceTel: '',
  },
  phone: function (e) {
    // var that = this
    wx.makePhoneCall({
      phoneNumber: this.data.serviceTel,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    var orderId = options.id
    that.setData({
      token: token,
      domain: domain,
      orderId: orderId,
    })
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/orderinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
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
            status: res.data.data.status,
            details: res.data.data.details,
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
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });

    wx.request({
      url: that.data.domain + '/zaylt/c/oth/publicinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: that.data.token,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            serviceTel: res.data.data.serviceTel,
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    wx.stopPullDownRefresh()
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
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index'
    } else {
      var path = '/pages/out/index/index'
    }
    return {
      title: '欢迎使用共享医联体小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://zaylt.njshangka.com/favicon.ico', //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
})