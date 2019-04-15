// pages/twoKfXmDetail/twoKfXmDetail.js
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
    cover: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var userToken = wx.getStorageSync('userToken')
    var that = this;
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/hospitalinfo/projectinfo',
      method: 'post',
      data: {
        token: userToken,
        id: id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {

        if (res.data.code == 0) {
          that.setData({
            cover: res.data.data.cover,
            navtitle: res.data.data.name
          })
          var info = res.data.data.content;
          WxParse.wxParse('info', 'html', info, that, 5);
          wx.setNavigationBarTitle({
            title: res.data.data.name
          })
        }
        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
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