// pages/promoter/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    display: 0,
    hospitalId: '',
    srcCover: '../../img/logo@2x.png'
  },
  bindWxmApp(e){
    let that=this
    wx.login({
      complete: (res) => {
        wx.request({
          url: app.globalData.url + '/bind-wx-mapp',
          header: {
            'Content-type': 'application/x-www-form-urlencoded',
            'cookie': app.globalData.cookie
          },
          method: "post",
          data:{
            jscode: res.code,
          },
          success: function (resData) {
            wx.hideToast()
            if (resData.data.code == 0) {
              that.setData({
                wxOpenId:false
              })
              that.loginRefresh()
            } else {
              wx.showToast({
                title:  res.data.codeMsg,
                icon:'none'
              })
            }
          }
        })
      },
    })
  },
  loginout(e) {
    var that = this
    wx.showModal({
      title: '退出',
      content: '确定要退出登录？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          app.globalData.cookie = ''
          wx.reLaunch({
            url: '../../newLogin/newLogin',
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
    var that = this
    if(app.loginRefresh.wxOpenId){
      that.setData({
        wxOpenId:false
      })
    }else{
      that.setData({
        wxOpenId:true
      })
    }
    that.setData({
      hospitalId: app.globalData.hospitalId,
    })
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            name: res.data.data.hospitalName,
            phone: res.data.data.phone,
            hospitalId: res.data.data.hospitalId
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
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
  lookcover(e) {
    wx.previewImage({
      current: this.data.srcCover, // 当前显示图片的http链接
      urls: [this.data.srcCover] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.loginRefresh.hospital&&app.loginRefresh.hospital.map&&app.loginRefresh.hospital.map.cover){
      app.loginRefresh.hospital.map.cover=app.cover(app.loginRefresh.hospital.map.cover)
      this.setData({
        srcCover: app.loginRefresh.hospital.map.cover
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

  },
  loginRefresh:function(_value){
    let that = this;
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
       if(res.data.code==0){
        // wx.redirectTo({
        //   url: '../selectRole/selectRole',
        // })
        if(app.globalData){
          app.globalData.phone = res.data.data.phone;
          app.globalData.userId = res.data.data.userId;
          app.globalData.hospitalId = res.data.data.hospitalId;
          app.globalData.hospitalName = res.data.data.hospitalName;
          // app.globalData.hospitaladdress = res.data.data.hospital.address;
          // app.globalData.authenticationIs = res.data.data.hospital.authStatus;
          // if (res.data.data.hospital.license == '' || res.data.data.hospital.license == null || res.data.data.hospital.license == undefined) {
          //   app.globalData.src = ''
          // } else {
          //   app.globalData.src = app.globalData.url + res.data.data.hospital.license
          // }
          // if (res.data.data.hospital.cover == '' || res.data.data.hospital.cover == null || res.data.data.hospital.cover == undefined) {
          //   app.globalData.srcCover = ''
          // } else {
          //   app.globalData.srcCover = app.globalData.url + res.data.data.hospital.cover
          // }
        }
        app.loginRefresh = res.data.data;
        
        
       }else{
         if(!_value){
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
         }
         
       }
      }
    })
  },
})