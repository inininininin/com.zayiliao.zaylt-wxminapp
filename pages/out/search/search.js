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
    list:[],
    kw: '',
    toPageNo:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage(0, this.data.kw)
  },
  input(e){
    var val = e.detail.value
    var that = this
    that.setData({
      list: [],
      kw: val
    })
    that.lastPage(0, val);
  },
  // 
  lastPage: function (toPageNo, kw) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
  


    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: 15,
        clinicId: app.globalData.clinicId,
         kw: kw,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {

          var pushTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            pushTime = res.data.data.items[i].pushTime
            res.data.data.items[i].pushTime = app.dateChange(pushTime)
          }

         

            var list = that.data.list;
            var newlist = list.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list: list,
                toPageNo: parseInt(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                icon: 'none',
                duration: 1500
              })
            } else {
              that.setData({
                list: newlist,
                toPageNo: parseInt(toPageNo)
              });
            }
         
       
          // that.setData({
          //   schemeList: res.data.data,
          // })

        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }

        
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
    console.log(1231)
    var that = this
    that.setData({
      list: [],
    })
    that.lastPage(0, that.data.kw)  

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
    var toPageNo = parseInt(that.data.toPageNo)
      that.lastPage(toPageNo, that.data.kw)  
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