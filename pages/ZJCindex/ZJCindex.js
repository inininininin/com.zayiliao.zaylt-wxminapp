// pages/ZJCindex/ZJCindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    token:'',
    domain:'',
    cover: '',
    name: '',
    address: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    that.setData({
      token: token,
      domain: domain,
    })
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/useraction/loginrefresh',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        token: that.data.token,
      },
      success: function (res) {
        that.setData({
          cover: res.data.data.hospital.cover,
          name: res.data.data.hospital.name,
          address: res.data.data.hospital.address,
        })
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
  shezhi:function(){
    wx.navigateTo({
      url: '../ZJCDesign/ZJCDesign',
    })
  },
  myjifen: function () {
    wx.navigateTo({
      url: '../ZJCMyjifen/ZJCMyjifen',
    })
  },
  myorder: function () {
    wx.navigateTo({
      url: '../ZJCMyorder/ZJCMyorder',
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