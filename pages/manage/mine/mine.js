// pages/manage/mine/mine.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    headimg:'../../img/touxiang@2x.png'
  },
  handleContact (e) {
    console.log(e)
    console.log(e.detail.path)
    console.log(e.detail.query)
},
  userIndex: function (e) {
    wx.navigateTo({
      url: '../ZJCDesign/ZJCDesign',
    })
  },
  clinic(e) {
    wx.redirectTo({
      url: '../clinicBottom/clinicBottom',
    })
  },
  index(e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var headimg = app.globalData.headimg
    var phone = app.globalData.phone
    var realname = app.globalData.realname
    if (app.globalData.headimg == '' || app.globalData.headimg == null || app.globalData.headimg ==undefined){
      headimg ='../../img/touxiang@2x.png'
    }
    if (app.globalData.phone == '') {
      phone = ''
    }
    if (app.globalData.realname == '') {
      realname = ''
    }
  
    this.setData({
      realname: realname,
      phone: phone,
      headimg: headimg,
    })
  },
  numberSecurity(e){
    wx.navigateTo({
      url: '../numberSecurity/numberSecurity',
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