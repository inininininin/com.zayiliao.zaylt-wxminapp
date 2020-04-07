// pages/changePwd/changePwd.js

var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '修改密码',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    phone:'',
    oldpwd:'',
    newpwd:'',
  },
  phone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  oldpwd(e) {
    this.setData({
      oldpwd: e.detail.value
    })
  },
  newpwd(e) {
    this.setData({
      newpwd: e.detail.value
    })
  },
  makesure(e){
    let that=this
    wx.request({
      url: app.globalData.url + '/c/useraction/setpwdbyold',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      data:{
        phone:that.data.phone,
        oldpwd: that.data.oldpwd,
        newpwd: that.data.newpwd,
      },
     
      success: function (res) {
        if(res.data.code==0){
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(
            function(){
              wx.navigateBack({

              })
            }
            ,1000
         )
            
        }else{
wx.showToast({
  title: res.data.codeMsg,
})
        }
      }
    })
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