// pages/AllhospitalDetails/AllhospitalDetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

    navtitle: '',
    statusBarHeight: '',
    titleBarHeight: '',
    userToken: '',
    schemeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/hospitalinfo/info',
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
            navtitle:res.data.data.name
          })
        }
      }
    })
  },
  edit: function () {
    wx.navigateTo({
      url: '../MZeditHospitalInfo/MZeditHospitalInfo',
    })
  },
  add:function(e){
      wx.navigateTo({
        url: '../MZeditHospitalInfo/MZeditHospitalInfo',
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