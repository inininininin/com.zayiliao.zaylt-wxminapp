// pages/outpatientList/outpatientList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    hospitalSchemeList: [],
  },


  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/clinic/clinics',
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
          that.setData({
            schemeList: res.data.data,

          })
          var hospitalSchemeList = that.data.hospitalSchemeList;
          var newHospitalSchemeList = hospitalSchemeList.concat(res.data.data.clinics.items)
          if (res.data.data.clinics.items.length == 0) {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
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
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log(123)
    this.setData({ flag: false })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(123)
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },



  onShow: function (options) {
    var that = this;
    that.setData({
      hospitalSchemeList:[]
    })
    that.lastPage(0);
  },
  add:function(){
      wx.navigateTo({
        url: '../KMZaddoutpatient/KMZaddoutpatient',
      })
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