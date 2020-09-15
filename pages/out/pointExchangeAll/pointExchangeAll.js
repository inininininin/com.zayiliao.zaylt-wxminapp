// pages/out/pointsExchange/pointsExchange.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    navtitle: '兑换列表',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    movies: [{
      phone: '158****5451',
      title: '健康枕'
    },
    {
      phone: '158****5451',
      title: '健康枕1'
    },
    {
      phone: '158****5451',
      title: '健康枕2'
    },
    {
      phone: '158****5451',
      title: '健康枕3'
    }
    ],
    list1: [],
    exchangePoint: '',
    news: '',
  },

  lastPage: function (toPageNo) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1

    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/more',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        orders: 'asc',
        sorts: 'orderNo',
       },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }

          var list1 = that.data.list1;
          var newlist1 = list1.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list1: list1,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list1: newlist1,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }

        var addTime
        for (var i = 0; i < that.data.list1.length; i++) {
          addTime = that.data.list1[i].addTime
          that.data.list1[i].addTime = app.dateChange(addTime)
        }

        that.setData({
          list1: that.data.list1,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.lastPage(0);
  
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
      list1: [],
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