// pages/promoter/addPatient/addPatient.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新增门诊',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    name:'',
    phone:'',
    idCard:'',
    remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      clinicId: options.clinicId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  backHistory: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  idCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  save: function (e) {
    var that = this
    if(!that.data.name){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return
    }
    if(!that.data.phone){
      wx.showToast({
        title: '请输入号码',
        icon:'none'
      })
      return
    }
    if(!that.data.idCard){
      wx.showToast({
        title: '请输入身份证号码',
        icon:'none'
      })
      return
    }
   
    wx.request({
      url: app.globalData.url + '/c2/patient/itemadd',
      method: 'post',
      data: {
        clinicId: that.data.clinicId || '',
        hospitalId: app.globalData.hospitalId || '',
        realname: that.data.name || '',
        tel: that.data.phone || '',
        idcardNo: that.data.idCard || '',
        remark: that.data.remark || '',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '新增成功',
            icon:'none'
          })
          that.setData({
            name: '',
            phone: '',
            idCard: '',
            remark: '',
          })
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            changeIs: 1
          });
          wx.navigateBack({
            delta:1
          })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
      }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})