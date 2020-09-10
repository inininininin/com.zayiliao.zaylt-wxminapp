// pages/out/expertIntroduction/expertIntroduction.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '专家列表',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    array: [{ url: '123132' }, { url: '12卡萨丁2' }, { url: '1asdf' }],
    schemeList: [],
  },
  linkDetail(e){
      wx.navigateTo({
        url: '../expertDetails/expertDetails?detail=' + JSON.stringify(e.currentTarget.dataset.detail),
      })
  },
  look(e){
    
    var that=this
    var intro = e.target.dataset.intro;
    var classed = e.target.dataset.classed;
    var id = e.target.dataset.id;
    if (classed=='line2'){
      for (var i = 0; i < that.data.schemeList.length; i++) {
        if (that.data.schemeList[i].itemId == id) {
          that.data.schemeList[i].icon = '../../img/up-1@2x.png';
          that.data.schemeList[i].class = ' '
        }else{
          that.data.schemeList[i].icon = '../../img/down@2x.png';
          that.data.schemeList[i].class = 'line2'
        }
        that.setData({
          schemeList: that.data.schemeList
        })
      }
    }else{
      for (var i = 0; i < that.data.schemeList.length; i++) {
          that.data.schemeList[i].icon = '../../img/down@2x.png';
          that.data.schemeList[i].class = 'line2'
          that.setData({
            schemeList: that.data.schemeList
          })
      }
    }
    
  },
  lastPage: function (toPageNo) {
    var that = this
    toPageNo++

    wx.request({
      url: app.globalData.url + '/c2/doctor/items',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: toPageNo,
        ps: 10,
        hospitalId: app.globalData.hospitalId,
        sorts: 'addTime',
        orders: 'desc'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].jobTitles != '' && res.data.data.items[i].jobTitles != null && res.data.data.items[i].jobTitles!=undefined){
              if(res.data.data.items[i].jobTitles.split(',')){
                var jobTitles = res.data.data.items[i].jobTitles.split(',')
              }else if(res.data.data.items[i].jobTitles.split('，')){
                var jobTitles = res.data.data.items[i].jobTitles.split('，')
              }
          
              res.data.data.items[i].jobTitles = jobTitles
            }
            
            res.data.data.items[i].headimg=app.cover(res.data.data.items[i].headimg)
            
            res.data.data.items[i].icon ='../../img/down@2x.png'
            res.data.data.items[i].class='line2'
          }
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.lastPage(0)
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
      schemeList: [],
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