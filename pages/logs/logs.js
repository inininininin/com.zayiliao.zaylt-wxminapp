//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    jscode: '',
    openid:'',
  },
  onLoad: function () {
    wx.setStorageSync('domain', 'www.njshangka.com')


    // wx.request({
    //   url: 'https://www.njshangka.com/zaylt/c/useraction/wxopenidbindphone',
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   success: function (res) {
    //     if (res.data.loginIs == 1) {

    //     }
    //   }
    // })

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow:function(){
    var that = this
    var jscode;
    wx.login({
      success: function (res) {
        jscode = res.code;
        console.log(res.code)
        that.setData({
          jscode: res.code,
        })


        wx.request({
          url: 'https://www.njshangka.com/zaylt/c/useraction/logincheck',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          success: function (res) {
            if (res.data.data.loginIs == 0) {

              wx.request({
                url: 'https://www.njshangka.com/zaylt/c/useraction/getandchkwxopenid',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                  jscode: jscode,
                },
                success: function (res) {
                  if (res.data.data.boundPhoneIf == 0) {
                    that.setData({
                      openid: res.data.data.openid
                    })
                    // wx.setStorageSync('openid', res.data.data.openid)
                    wx.request({
                      url: 'https://www.njshangka.com/zaylt/c/useraction/wxapplogin',
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      data: {
                        openid: res.data.data.openid,
                      },
                      success: function (res) {
                        if (res.data.loginIs == 1) {

                        }
                      }
                    })
                    wx.setStorageSync('openid', res.data.data.openid)
                    wx.navigateTo({
                      url: '../login/login?openid=' + res.data.data.openid,
                    })
                  } else {
                    that.setData({
                      openid: res.data.data.openid
                    })
                    wx.request({
                      url: 'https://www.njshangka.com/zaylt/c/useraction/wxapplogin',
                      header: {
                        'Content-type': 'application/json'
                      },
                      data: {
                        openid: res.data.data.openid,
                      },
                      success: function (res) {
                        
                        wx.setStorageSync('openid', that.data.openid)
                        wx.setStorageSync('userToken', res.data.data.token)
                        if (res.data.data.type == '3') {
                          wx.navigateTo({
                            url: '../hospitalList/hospitalList',
                          })
                        } else if (res.data.data.type == '2') {
                          wx.navigateTo({
                            url: '../twoMMzIndex/twoMMzIndex',
                          })
                        } else {
                          wx.navigateTo({
                            url: '../twoYyIndex/twoYyIndex',
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: res.data.data.codeMsg,
                icon: 'loading',
                duration: 5000
              })
            }
          }
        })


      }
    })
    console.log(111)
  },
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
