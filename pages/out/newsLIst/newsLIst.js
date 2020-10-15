// pages/out/newsLIst/newsLIst.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '系统消息',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    list:[],
    toPageNo:'',
  },
  jumpurl(e){
    var id=e.currentTarget.dataset.id
    for(var i in this.data.list){
      if(id==this.data.list[i].messageId){
        this.data.list[i].lookIs=1
      }
    }
    this.setData({
      list:this.data.list
    })
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  lastPage: function (toPageNo, source) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1

    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/messages',
      method: 'post',
      data: {
         lookIs: '',
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
      success: function (res) {
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].addTime = utils.formatTime(res.data.data.items[i].addTime / 1000, 'M月D日 h:m');
          }

          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: list,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
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
            url: '../../newLogin/newLogin',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    this.setData({
      source: type
    })
    if(options.type==1){
      wx.setNavigationBarTitle({
        title: '医院消息',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '系统消息',
      })
    }
    this.lastPage(0, type)
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
      list: [],
    })
    that.lastPage(0, that.data.source)


    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo,that.data.source)

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