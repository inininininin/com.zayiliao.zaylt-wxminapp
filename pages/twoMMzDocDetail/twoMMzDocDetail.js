// pages/twoKfDocDetail/twoKfDocDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: '',
    titleBarHeight: '',
    dataItem: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id;
    var userToken = wx.getStorageSync('userToken')
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/hospitalinfo/doctorinfo',
      method: 'post',
      data: {
        id: id,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            dataItem: res.data.data,
            navtitle: res.data.data.name + '医生介绍'
          })
          wx.setNavigationBarTitle({
            title: res.data.data.name + '医生介绍'
          })
          var info = res.data.data.intro;
          WxParse.wxParse('info', 'html', info, that, 5);
        }
      }
    })
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

  }
})