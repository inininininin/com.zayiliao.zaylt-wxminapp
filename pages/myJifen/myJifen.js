// pages/myJifen/myJifen.js
var utils = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    navtitle: '我的积分',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    points: '',
    schemeList:[],
  },
  useNow(e){
    wx.navigateTo({
      url: '../ZJCQxshop/ZJCQxshop',
    })
  },
  lastPage: function (toPageNo) {
    var that = this
    toPageNo++

    wx.request({
      url: app.globalData.url + '/c/bonuspoint/bills',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: toPageNo,
        ps: 15,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            // that.data.schemeList[i].addTime = that.dateChange(addTime) 
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
          }
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
          that.setData({
            // bonusPoint: res.data.data.bonusPoint,
            schemeList: that.data.schemeList,
            points: res.data.data.bonusPoint
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    that.setData({
      token: token,
      domain: domain,
    })
    that.lastPage(0)
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
    var that = this
    that.setData({
      schemeList: [],
    })
    that.lastPage(0)


    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)

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