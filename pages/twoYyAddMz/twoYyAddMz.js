// pages/HosaddOutpatient/HosaddOutpatient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新增门诊',
    statusBarHeight: '',
    titleBarHeight: '',
    distributionNum: '',
    distributionPassword: '',
    hospitalName: '',
    chargePeople: '',
    hospitalTel: '',
    address: '',
    remark: '',
    hospital_id: '',
  },
  distributionNum: function (e) {
    this.setData({
      distributionNum: e.detail.value
    })
  },
  distributionPassword: function (e) {
    this.setData({
      distributionPassword: e.detail.value
    })
  },
  hospitalName: function (e) {
    this.setData({
      hospitalName: e.detail.value
    })
  },
  chargePeople: function (e) {
    this.setData({
      chargePeople: e.detail.value
    })
  },
  hospitalTel: function (e) {
    this.setData({
      hospitalTel: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hospital_id = options.id;
    this.setData({
      hospital_id: hospital_id,
    })
  },


  add: function () {
    // wx.hideToast()
    var that = this;
    if (that.data.distributionNum == '') {
      wx.showModal({
        title: '号码不能为空'
      })
    }
    if (that.data.distributionPassword == '' || that.data.hospitalName == '' || that.data.distributionPassword == '' || that.data.hospitalTel == '' || that.data.hospitalTel == '' || that.data.address == '' || that.data.remark == '') {
      wx.showModal({
        title: '请将表格填写完整'
      })
    } else {
      // var that = this;
      var userToken = wx.getStorageSync("userToken");
      wx.request({
        url: 'https://www.njshangka.com/zaylt/c/h/e/clinicinfo/add',
        header: {
          'Content-type': 'application/json'
        },
        data: {
          phone: that.data.distributionNum,
          pwd: that.data.distributionPassword,
          clinic_name: that.data.hospitalName,
          headman_name: that.data.chargePeople,
          contact_tel: that.data.hospitalTel,
          address: that.data.address,
          remark: that.data.remark,
          token: userToken,
          hospital_id: that.data.hospital_id,
        },
        success: function (res) {

          if (res.data.code == 0) {
            // console.log(res.data.data.userToken)
            // wx.setStorageSync('userToken', res.data.data.token)
            wx.navigateBack({
              url: '../twoMzlist/twoMzlist?id=' + that.data.hospital_id,
            })
            // wx.navigateBack({
            //   delta: 1
            // })

          }
          else {
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      })
    }


  },
  // 登录界面取值start

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