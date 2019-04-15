// pages/remarks/remarks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: '',
    toPageNo: '',
    remarkSchemeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var patientId = options.patientId
    that.setData({
      patientId: patientId,
    })
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/patientinfo/remarks',
      method: 'post',
      data: {
        patient_id: that.data.patientId,
        page_no: toPageNo,
        page_size: pageSize,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {


        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.patients.items.length; i++) {
            var myDate = new Date(res.data.data.patients.items[i].addTime);
            var day = myDate.getDay();
            var time = myDate.getHours() + ":" + myDate.getMinutes();
            console.log(day + "=====" + myDate.getHours() + "====" + myDate.getMinutes())
            // that.setData({
            res.data.data.patients.items[i].num = i + 1
            res.data.data.patients.items[i].day = day
            res.data.data.patients.items[i].time = time
            // })
          }
          var remarkSchemeList = that.data.remarkSchemeList;
          var newremarkSchemeList = remarkSchemeList.concat(res.data.data.patients.items)
          if (res.data.data.patients.items.length == 0) {
            that.setData({
              remarkSchemeList: newremarkSchemeList,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              remarkSchemeList: newremarkSchemeList,
              toPageNo: String(toPageNo)
            });
          }
        }


        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  add: function (res) {
    var that = this
    wx.navigateTo({
      url: '../remarkHosNew/remarkHosNew?patientId=' + that.data.patientId,
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
  onShow: function (options) {

    this.setData({
      remarkSchemeList: [],
    })
    var that = this
    var patientId = that.data.patientId

    that.lastPage(0)
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

  // 到底加载
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },
  //下拉刷新
  onPullDownRefresh: function () {

    this.setData({ flag: false })
    wx.stopPullDownRefresh()
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