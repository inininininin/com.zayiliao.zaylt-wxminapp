// pages/MZoutpatientIndex/MZoutpatientIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userToken:'',
  },
  outpatient:function(){
    wx.navigateTo({
      url: '../MZdetails/MZdetails',
    })
  },
  patient: function () {
    wx.navigateTo({
      url: '../MZoutpatientPatient/MZoutpatientPatient',
    })
  },
  hospital: function () {
    wx.navigateTo({
      url: '../MZhospitalDetails/MZhospitalDetails',
    })
  },
  selectNo: function () {
    var that=this
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/useraction/logout',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        token: that.data.userToken,
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '门诊',
    })
    console.log(wx.getStorageSync("openid"), wx.getStorageSync("userToken"))
    this.setData({
      userToken: wx.getStorageSync("userToken"),
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