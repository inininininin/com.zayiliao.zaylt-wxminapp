// pages/hospitalDetails/hospitalDetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hospital_id: '',
    hospital_name: '',
    statusBarHeight: '',
    titleBarHeight: '',
    navtitle: '首页',
  },
  qhzh: function (e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  bingyuan:function(e){
    wx.navigateTo({
      url: '../MZoutpatientPatient/MZoutpatientPatient',
    })
  },
  outpatient: function () {
    var that = this;
    wx.navigateTo({
      url: '../twoMMzXqIndex/twoMMzXqIndex',
    })
  },
  patient: function () {
    var that = this
    wx.navigateTo({
      url: '../ZJCQxshop/ZJCQxshop',
    })
  },
  hospital: function () {
    var that = this
    wx.navigateTo({
      url: '../twoMMzHoswgw/twoMMzHoswgw',
    })
  },
  userIndex: function () {
    wx.navigateTo({
      url: '../ZJCindex/ZJCindex',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    return {
      title: '忠安医联体小程序',
      path: 'pages/logs/logs',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})