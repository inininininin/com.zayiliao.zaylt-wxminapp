// pages/out/checkLogistics/checkLogistics.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '物流信息',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that=this
    var type

    var postid = id;
    wx.request({
      url: 'http://www.kuaidi100.com/autonumber/autoComNum',
      data: {
        text: postid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
         type = res.data.auto[0].comCode;
      },
      complete: function () {
        console.log(type)
        wx.request({
          url: 'http://www.kuaidi100.com/query',
          data: {
            type: type,
            postid: postid
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            'cookie': app.globalData.cookie
          },
          method: 'GET',
          success: function (res) {
            
            that.setData({
              list:res.data.data
            })
            console.log(that.data.list)
          }
        })
      }
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