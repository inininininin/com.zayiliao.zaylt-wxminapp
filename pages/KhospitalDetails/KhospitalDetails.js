// pages/AllhospitalDetails/AllhospitalDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    navtitle: '医院信息',
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
    var hospital_id = options.hospital_id;
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/hospital/info',
      method: 'post',
      data: {
        // page_no: toPageNo,
        // page_size: pageSize,
        hospital_id: hospital_id,       
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,

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
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {

    wx.stopPullDownRefresh()
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