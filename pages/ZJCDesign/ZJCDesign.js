// pages/ZJCDesign/ZJCDesign.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '设置',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    Version:''
  },
  version(e){
    wx.showModal({
      title: 'ver: '+app.globalData.Version,
      content: app.globalData.versionIntro ? app.globalData.versionIntro : "",
      showCancel: false,
      cancelText: "取消111",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
    
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Version = app.globalData.Version
    this.setData({
      Version: Version
    })
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
  loginout(e) {
//  console.log(app.globalData.lastClient)
    var that = this
    wx.showModal({
        title: '退出',
        content: '确定要退出登录？',
        success: function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
               //点击确定
               app.globalData.cookie=''
               wx.reLaunch({
                url: '../newLogin/newLogin',
              })
              //  if(app.globalData.lastClient==2){
              //   wx.reLaunch({
              //     url: '../newLogin/newLogin',
              //   })
              //  }else  if(app.globalData.lastClient==1){
              //   wx.reLaunch({
              //     url: '../newLogin/newLogin',
              //   })
              //  }
              
            }
         },
         fail: function (res) { }, 
         complete: function (res) { },
    })
    
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