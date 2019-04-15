// pages/twoYyQxDetail/twoYyQxDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mainrotaions: [],
    phone:'',
    picses:[],
  },
  phone:function(e){
    var that=this
    if (that.data.phone == '' || that.data.phone == null || that.data.phone ==undefined){
      wx.showLoading({
        title: '该器械厂商尚未录入号码',
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: that.data.phone,
      })
    }
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var deviceId = options.id;
    var userToken = wx.getStorageSync('userToken')
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/procurement/deviceinfo',
      method: "POST",
      data: {
        deviceId: deviceId,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          var pics = res.data.data.leadPics;
          var piclead=pics.split(',')
          var picses=[];
          for (var i = 0; i < piclead.length;i++){
            picses.push({ url: "https://www.njshangka.com" + piclead[i] })
          }
          that.setData({
            schemeList: res.data.data.items,
            // mainrotaions: res.data.data.leadPics,
            phone: res.data.data.contactTel,
            picses: picses,
          })
          var info = res.data.data.detail;
          WxParse.wxParse('info', 'html', info, that, 5);
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  }
})