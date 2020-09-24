// pages/ZJCMyorder/ZJCMyorder.js
var utils = require('../../utils/util.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    toPageNo:0,
    navtitle: '我的订单',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    currentTab: 0,
    status: 0,
    schemeList:[],
  },
  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        schemeList:[],
      })
      if (e.target.dataset.current==0){
        that.setData({
          status: e.target.dataset.current,
        })
        that.shenhe(0, e.target.dataset.current)
      } else if (e.target.dataset.current == 1){
        that.setData({
          status: '1,3',
        })
        that.shenhe(0, '1,3')
      }else{
        that.setData({
          status: '2,4',
        })
        that.shenhe(0, '2,4')
      }
     
    }
    
  },
  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
      status: e.detail.current,
    })
  },
  shenhe: function (toPageNo,status) {
    var that = this
    toPageNo++
    wx.request({
      url:  app.globalData.url + '/c/procurement/orders',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': app.globalData.token,
        'cookie': app.globalData.cookie
      },
      data: {
        token:  app.globalData.token,
        pn: toPageNo,
        ps: 10,
        statuses:status,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }


          var addTime
          for (var i = 0; i < that.data.schemeList.length; i++) {
            addTime = that.data.schemeList[i].addTime
            that.data.schemeList[i].addTimes = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
          }
          console.log(that.data.schemeList)
          that.setData({
            // bonusPoint: res.data.data.bonusPoint,
            schemeList: that.data.schemeList,
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
  onLoad: function(options) {
    var that = this
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    that.setData({
      token: token,
      domain: domain,
    })
    that.shenhe(0,0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    
  },

  backHistory: function(e) {
    wx.navigateBack({

    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    that.setData({
      schemeList: [],
    })
    that.shenhe(0,that.data.status)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.shenhe(toPageNo, that.data.status)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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