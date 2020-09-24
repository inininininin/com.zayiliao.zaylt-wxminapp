// pages/out/search/search.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '病员搜索',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    hosList: [],
    kw: '',
    toPageNo: '0',
    url:'',
  },
  lastPageHos: function (toPageNo, kw, url) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + url,// '/clientend2/manageend/hospitals',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        kw: kw,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (toPageNo == 1 && res.data.data.items.length == 0) {
            that.setData({
              number: 0
            });
          } else {
            that.setData({
              number: 1
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].addTime = app.dateChange(res.data.data.items[i].addTime)
            // if (res.data.data.items[i].cover&&res.data.data.items[i].cover.slice(0, 1) != 'h') {
            //   res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
            // }
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          var hosList = that.data.hosList;
          var newhosList = hosList.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              hosList: hosList,
              toPageNo: String(toPageNo),
              connectNum: res.data.data.sum.totalItemCount
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              hosList: newhosList,
              toPageNo: String(toPageNo),
              connectNum: res.data.data.sum.totalItemCount
            });
          }
        }
        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }else{
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var url=options.url
    that.setData({
      url: url
    })
    console.log(url)
    that.lastPageHos(0, that.data.kw, that.data.url)
  },
  input(e) {
    var val = e.detail.value
    var that = this
    
    that.setData({
      hosList: [],
      kw: val
    })
    that.lastPageHos(0, val, that.data.url);
  },
  // 

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
      hosList: [],
    })
    that.lastPageHos(0, that.data.kw, that.data.url);

    wx.stopPullDownRefresh()
  },

  // backHistory: function (e) {
  //   wx.navigateBack({

  //   })
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPageHos(toPageNo, that.data.kw, that.data.url);
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