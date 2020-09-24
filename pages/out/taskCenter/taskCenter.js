// pages/out/taskCenter/taskCenter.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '任务中心',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    dis: 'none',
    list1:[],
    list2:[],
  },
  look: function(e) {
    this.setData({
      dis: 'block',
    })
  },
  close: function(e) {
    this.setData({
      dis: 'none',
    })
  },
  gofinish:function(e){
    var url = e.currentTarget.dataset.url
    if (url == 1 || url == 5){
     wx.reLaunch({
       url: '../../newLogin/newLogin',
     })
    } else if (url == 3 || url == 4 || url == 7 || url == 8 || url == 10){
      wx.switchTab({
       url: '../hospital/hospital',
     })
    } else if (url == 6 || url == 9 || url == 12 || url == 11) {
     wx.switchTab({
       url: '../index/index',
     })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/taskcenter/tasks',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.rows.length; i++) {

            // if (res.data.data.rows[i].gotExchangePointToday == res.data.data.rows[i].exchangePointUpperPerDay){
            //   res.data.data.rows[i].finish='1'
            // }else{
            //   res.data.data.rows[i].finish = '0'
            // }

            if (res.data.data.rows[i].everyDayIs==0){
              var list1 = that.data.list1.concat(res.data.data.rows[i]) 
          
              that.setData({
                list1: list1
              })
            }else{
              res.data.data.rows[i].percent = (parseInt(res.data.data.rows[i].gotExchangePointToday) / parseInt(res.data.data.rows[i].exchangePointUpperPerDay))*100+"%"
              var list2 = that.data.list2.concat(res.data.data.rows[i])
              that.setData({
                list2: list2
              })
            }
          }


          that.setData({
            list1: list1,
            list2: list2
          })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none',
          })
        }
      }
    })
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