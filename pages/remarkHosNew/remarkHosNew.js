// pages/remarkNew/remarkNew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',
    patientId: '',
    userToken: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userToken = wx.getStorageSync("userToken")

    var that = this
    var patientId = options.patientId

    that.setData({
      patientId: patientId,
      userToken: userToken,
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },


  add: function () {
    var that = this
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/patientinfo/addremark',
      method: 'post',
      data: {
        patient_id: that.data.patientId,
        remark: that.data.remark,
        token: that.data.userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateBack({
            url: '../remarks/remarks'
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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