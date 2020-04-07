// pages/out/news/news.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '消息',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    lookIs: 0,
    source: '',
    num:0,
    num1:0,
    num2:0
  },

  lastPage: function(toPageNo, lookIs, source) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1

    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/messages',
      method: 'post',
      data: {
         lookIs: lookIs,
        source: source,
        pn: toPageNo,
        ps: pageSize,
        // orders: 'asc',
        // sorts: 'orderNo',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function(res) {
        if (res.data.code == 0) {
          if (source==''){
            var num = res.data.data.sum.totalItemCount
            that.setData({
              num: num,
            })
          }else if(source==1){
            var num1 = res.data.data.sum.totalItemCount
            that.setData({
              num1: num1,
            })
          } else if (source == 2) {
            var num2 = res.data.data.sum.totalItemCount
            that.setData({
              num2: num2,
            })
          }
          
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // wx.request({
    //   url: app.globalData.url + '/clientend2/clinicend/messages',
    //   method: 'post',
    //   data: {
    //     token: app.globalData.token,
    //     lookIs: lookIs,
    //     source: source
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",

    //   },
    //   success: function(res) {

    //   }
    // })
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
    this.lastPage(0, this.data.lookIs, 1);
    this.lastPage(0, this.data.lookIs, 2);
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
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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