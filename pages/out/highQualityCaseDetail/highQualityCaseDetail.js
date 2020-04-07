// pages/out/newsDetail/newsDetail.js
var app = getApp()
var utils = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    close: 'none',
    fontSize: 24,
    list: [],
    res: '',
    id: '',
    display:'none',
  },
  changefont:function(e){
    this.setData({
      display: 'block'
    })
  },
  closeFont: function (e) {
    this.setData({
      display: 'none'
    })
  },
  slider4change(event){
    var val = event.detail.value
    console.log(val)
    this.setData({
      fontSize:val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.request({
      url: app.globalData.url + '/c2/project/item',
      method: 'post',
      data: {
         itemId: id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.cover&&res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cover = app.globalData.url + res.data.data.cover;
          }
    
          res.data.data.addTime = utils.formatTime(res.data.data.addTime / 1000, 'Y-M-D h:m');
          that.setData({
            list: res.data.data,
            id: id,
          });
          var contentBtId = res.data.data.contentBtId
          wx.request({
            url: app.globalData.url + '/other/bigtxt/' + contentBtId + '/' + contentBtId,
            method: 'get',
            data: {
               itemId: id,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              // console.log(res.data)
              var article = res.data
              WxParse.wxParse('article', 'html', article, that, 5);
              // that.setData({
                // res: res.data,
              // })
            }
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }
      }
    })
  },
  sharewx: function (e) {
    onShareAppMessage()
  },
  // 方法
  share: function (e) {
    this.setData({
      close: 'block'
    })
  },
  close: function (e) {
    this.setData({
      close: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  backHistory: function (e) {
    wx.navigateBack({
      url: '../newsLIst/newsLIst',
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
      var path = '/pages/index/index?shareId=' + this.data.id + "&isShare=2"
    } else {
      var path = '/pages/out/index/index?shareId=' + this.data.id + "&isShare=2"
    }
    return {
      title: this.data.list.title,//分享内容
      path: '/pages/out/highQualityCaseDetail/highQualityCaseDetail?id=' + this.data.id,//分享地址
      imageUrl: this.data.list.cover,//分享图片
    }
  }
})