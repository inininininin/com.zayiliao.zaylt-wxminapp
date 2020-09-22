// pages/MZdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schemeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/clinicinfo/info',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        token: userToken,
        
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
            that.setData({
              schemeList:res.data.data
            })
        }
        else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    })
  },
edit:function(){
  wx.navigateTo({
    url: '../MZeditDetails/MZeditDetails',
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