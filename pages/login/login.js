// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    userPassword: '',
    openid: '',
  },
  // 登录界面取值start
  loginPhone: function(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  loginPassward: function(e) {
    this.setData({
      userPassword: e.detail.value
    })
  },

  loginXy:function(e) {
    console.log(123)
    wx.navigateTo({
      url: '../twoLoginXy/twoLoginXy',
    })
  },
  loginBtn: function() {

    buttonDisabled: true
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 5000
    })
    var that = this
    var userPhone = that.data.userPhone;
    var userPassword = that.data.userPassword;

    // var openId = that.data.openId
    // 网络请求
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/useraction/wxopenidbindphone',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        openid: that.data.openid,
        phone: userPhone,
        pwd: userPassword
        // wxOpenId: openId
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.request({
            url: 'https://www.njshangka.com/zaylt/c/useraction/wxapplogin',
            header: {
              'Content-type': 'application/json'
            },
            data: {
              openid: that.data.openid,
            },
            success: function(res) {
              console.log(res.data.data.userToken)
              wx.setStorageSync('userToken', res.data.data.token)
              wx.setStorageSync('token', res.data.data.token)
              if (res.data.data.type == '3') {
                wx.navigateTo({
                  url: '../hospitalList/hospitalList',
                })
              } else if (res.data.data.type == '2') {
                wx.navigateTo({
                  url: '../twoMMzIndex/twoMMzIndex',
                })
              } else {
                wx.navigateTo({
                  url: '../twoYyIndex/twoYyIndex',
                })
              }
            }
          })



          // wx.navigateBack({
          //   delta: 1
          // })

        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },

  // 登录界面取值end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    // console.log(options.openid)
    that.setData({
      openid: wx.getStorageSync('openid')
    })
    wx.setNavigationBarTitle({
      title: '登录'
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
    var that = this
    return {
      title: '忠安医联体小程序',
      path: 'pages/logs/logs',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})