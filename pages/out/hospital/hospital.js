// pages/out/hospital/hospital.js
var app=getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    show:2,
    kw:'',
    schemeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      schemeList:[]
    })
    that.lastPage(0, '')
  },
  input:function(e){
    var val = e.detail.value
    var that=this
    that.setData({
      schemeList: [],
    })
  
    if(val==''||val==null||val==undefined){
      that.setData({
        show:2,
        kw:val
      })
    }else{
      that.setData({
        show:1,
        kw: val
      })
    }
    that.lastPage(0, val)
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
    // var that = this
    // that.setData({
    //   schemeList:[]
    // })
    // that.lastPage(0, '')
  },
  lastPage: function (toPageNo, kw) {
    var that = this
    toPageNo++

    wx.request({
      url: app.globalData.url + '/c2/article/items',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: toPageNo,
        ps: 10,
        kw: kw,
        sorts: 'addTime',
        orders:'desc',
        hospitalId: app.globalData.hospitalId
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            // if (res.data.data.items[i].cover&&res.data.data.items[i].cover.slice(0, 1) != 'h') {
            //   res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
            // }
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            if (toPageNo==1){
              wx.showToast({
                title: '没有相关类型文章',
                // icon: 'loading',
                // duration: 1500
              })
            }else{
              wx.showToast({
                title: '数据已全部加载',
                // icon: 'loading',
                // duration: 1500
              })
            }
           
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
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
    that.lastPage(0,that.data.kw)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
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