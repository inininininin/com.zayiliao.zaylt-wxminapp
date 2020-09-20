// pages/pushManagement/pushManagement.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '推送管理',
    newMsg: '新建推送',
    newItem: '已推送',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    list: [],
    url: '',
  },
  sendRecs(e) {
    if (this.data.newMsg == '新建推送') {
      wx.navigateTo({
        url: '../newRec/newRec?type=1',
      })
    } else {
      wx.navigateTo({
        url: '../newRec/newRec?type=2',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.type)
    var url = ''
    if (options.type == 1) {
      url = '/c2/hospitalpush/items'
      var navtitle = '推送管理'
      var newMsg = '新建推送'
      var newItem = '已推送'
    } else if (options.type == 2) {
      url = '/c2/hospitalsms/items'
      var navtitle = '短信管理'
      var newMsg = '新建短信'
      var newItem = '已发送'
    }
    this.setData({
      url: url,
      navtitle: navtitle,
      newMsg: newMsg,
      newItem: newItem,
    })
    wx.setNavigationBarTitle({
      title: navtitle,
    })
  
    // /zaylt/c2 / hospitalpush / items
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + that.data.url,
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        hospitalId: app.globalData.hospitalId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {

          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: list,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list: newlist,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }

        var addTime
        for (var i = 0; i < that.data.list.length; i++) {
          addTime = that.data.list[i].addTime
          that.data.list[i].addTime = app.dateChange(addTime)
        }
        that.setData({
          list: that.data.list,
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
    this.setData({
      list:[]
    })
    this.lastPage(0)
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
      list: [],
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