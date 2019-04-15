// pages/HospatientDetails/HospatientDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    schemeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.nextPage(0)
  },
  nextPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/patientinfo/patients',
      method: 'post',
      data: {
        page_no: toPageNo,
        page_size: pageSize,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {


          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.patients.items)



          if (res.data.data.patients.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            // console.log(res.data.data.doctors.items.length)
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }


        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },


  // 到底加载
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.nextPage(toPageNo)
  },
  //下拉刷新
  onPullDownRefresh: function () {

    this.setData({ flag: false })
    wx.stopPullDownRefresh()
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