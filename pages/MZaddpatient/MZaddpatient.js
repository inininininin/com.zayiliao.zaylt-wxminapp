// pages/MZaddpatient/MZaddpatient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新增病员',
    statusBarHeight: '',
    titleBarHeight: '',
    name: '',
    tel: '',
    sickness: '',
    remark: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  sickness: function (e) {
    this.setData({
      sickness: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  onLoad: function (options) {

  },

  add: function () {
    buttonDisabled: true
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 5000
    })
    var that = this;
    var name = that.data.name
    var tel = that.data.tel
    var sickness = that.data.sickness
    var remark = that.data.remark
    if (!sickness) {
      sickness = ''
    }
    if (!remark) {
      remark = ''
    }
    var userToken = wx.getStorageSync("userToken");
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/patientinfo/add',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        realname: name,
        tel: tel,
        sickness: sickness,
        remark: remark,
        token: userToken,
        // wxOpenId: openId
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.navigateBack({
            url: '../MZoutpatientPatient/MZoutpatientPatient',
          })
        }
        else {
          wx.showModal({
            title: res.data.codeMsg
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