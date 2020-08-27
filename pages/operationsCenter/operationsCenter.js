// pages/operationsCenter/operationsCenter.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '运营中心',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
  },
  backHistory: function (e) {
    wx.navigateBack({
      
    })
  },
  sendRec:function(e){
    console.log(2)
    wx.navigateTo({
      url: '../pushManagement/pushManagement?type=1',
    })
  },
  sendMsg: function (e) {
    console.log(3)
    wx.navigateTo({
      url: '../pushManagement/pushManagement?type=2',
    })
  },
  sendAct: function (e) {
    wx.navigateTo({
      url: '../putInPrecisionActivities/putInPrecisionActivities',
    })
  },
  article: function (e) {
    wx.navigateTo({
      url: '../operationalArticles/operationalArticles',
    })
  },
  framework: function (e) {
    wx.navigateTo({
      url: '../framework/framework',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    if(options.type==1){
      app.globalData.yyType = 'hospital/operating-manual'
    }else{
      app.globalData.yyType = 'manager'
    } 
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