// pages/promoter/mine/mine.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    display:0,
    hospitalId:'',
    srcCover:'../../img/logo@2x.png'
  },
  loginout(){
    var that = this
    wx.showModal({
      title: '退出',
         content: '确定要退出登录？',
         success: function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
               //点击确定
               app.globalData.cookie=''
               wx.reLaunch({
                url:'../../login/login',
              })
            }
         },
         fail: function (res) { }, 
         complete: function (res) { },
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      hospitalId: app.globalData.hospitalId,
    })
    wx.request({
      url: app.globalData.url + '/hospital/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            name: res.data.data.hospital.name,
            phone: res.data.data.phone,
            hospitalId: res.data.data.hospital.hospitalId
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
  },
  index(e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  clinic(e) {
    wx.redirectTo({
      url: '../clinic/clinic',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  lookcover(e){
    wx.previewImage({
      current: app.globalData.srcCover, // 当前显示图片的http链接
      urls: [app.globalData.srcCover] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.srcCover){
      console.log(app.globalData.srcCover)
      this.setData({
        srcCover: app.globalData.srcCover
      })
    }
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