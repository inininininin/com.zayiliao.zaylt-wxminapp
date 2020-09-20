// pages/twoQmzdetail/twoQmzdetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '门诊详情',
    statusBarHeight: '',
    titleBarHeight: '',
    schemeList: [],
    patients: [],
  },
  edit: function () {
    wx.navigateTo({
      url: '../MZeditDetails/MZeditDetails',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    var that = this;
   
    var userToken = wx.getStorageSync("userToken");
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/clinicinfo/info',
      method: 'post',
      data: {
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,
          })
         
          var info = res.data.data.featuredProject;
          WxParse.wxParse('info', 'html', info, that, 5);
          

        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
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
    wx.stopPullDownRefresh()
  },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {
  //   var that = this
  //   var toPageNo = that.data.toPageNo
  //   that.lastPage(toPageNo)
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})