// pages/out/mine/mine.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    productInfo: '',
    tel: '',
    name: '',
    address: '',
    display: '2',
    src: '../img/logo@2x.png',
    srcCover: '../img/logo@2x.png',
  },
  bindWxmApp(e) {
    let that = this
    wx.login({
      complete: (res) => {
        wx.request({
          url: app.globalData.url + '/bind-wx-mapp',
          header: {
            'Content-type': 'application/x-www-form-urlencoded',
            'cookie': app.globalData.cookie
          },
          method: "post",
          data: {
            jscode: res.code,
          },
          success: function (resData) {
            wx.hideToast()
            if (resData.data.code == 0) {
              that.setData({
                wxOpenId: false
              })
              that.loginRefresh()
            } else {
              wx.showToast({
                title: res.data.codeMsg,
                icon: 'none'
              })
            }
          }
        })
      },
    })
  },
  loginout(e) {

    var that = this
    wx.showModal({
      title: '退出',
      content: '确定要退出登录？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          app.globalData.cookie = ''
          wx.reLaunch({
            url: '../newLogin/newLogin',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  index(e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  clinic(e) {
    wx.redirectTo({
      url: '../clinic/clinic',
    })
  },
  gene(e) {
    wx.redirectTo({
      url: '../gene/gene',
    })
  },
  lookcover(e) {
    wx.previewImage({
      current: this.data.srcCover, // 当前显示图片的http链接
      urls: [this.data.srcCover] // 需要预览的图片http链接列表
    })
  },
  yyzz(e) {
    console.log(app.globalData.src)
    if (app.globalData.src == '' || app.globalData.src == null || app.globalData.src == undefined) {

      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0]
          var avatar = res.tempFilePaths[0]
          wx.uploadFile({
            url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
            filePath: avatar,
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              var url = data.data.url
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.request({
                  url: app.globalData.url + '/c2/hospital/itemalter', //仅为示例，非真实的接口地址
                  method: 'post',
                  data: {
                    license: url,
                    itemId: app.globalData.hospitalId,
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'cookie': app.globalData.cookie
                  },
                  success: function (res) {
                    if (res.data.codeMsg) {
                      wx.showToast({
                        title: res.data.codeMsg,
                        icon: 'none'
                      })
                    }
                    if (res.data.code == 0) {
                      if (url.slice(0, 1) != 'h') {
                        url = app.globalData.domain + url
                      }
                      app.globalData.src = url
                      that.setData({
                        src: url
                      })

                    }
                  }
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../cropper/cropper',
      })
    }

  },

  bindChooiceProduct: function () {
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)
        that.setData({
          src: tempFilePaths
        })
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            //do something
            console.log(data.data.url)
            if (data.code == 0) {
              wx.showToast({
                title: '上传成功',
                icon: 'none',
                duration: 2000
              })
              that.setData({ introPic1: data.data.url })

              console.log(data.data.url)
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  userIndex: function (e) {
    wx.navigateTo({
      url: '../ZJCDesign/ZJCDesign',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.loginRefresh.wxOpenId) {
      this.setData({
        wxOpenId: false
      })
    } else {
      this.setData({
        wxOpenId: true
      })
    }
    if (app.loginRefresh.hospital && app.loginRefresh.hospital.map && app.loginRefresh.hospital.map.authStatus) {
      this.setData({
        display: app.loginRefresh.hospital.map.authStatus
      })
    } else {
      this.setData({
        display: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  backHistory: function (e) {
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.loginRefresh.hospital && app.loginRefresh.hospital.map && app.loginRefresh.hospital.map.cover) {
      app.loginRefresh.hospital.map.cover = app.cover(app.loginRefresh.hospital.map.cover)
      this.setData({
        srcCover: app.loginRefresh.hospital.map.cover
      })
    }
    if (app.loginRefresh.hospital && app.loginRefresh.hospital.map && app.loginRefresh.hospital.map.license) {
      app.loginRefresh.hospital.map.license = app.cover(app.loginRefresh.hospital.map.license)
      app.globalData.src = app.cover(app.loginRefresh.hospital.map.license)
      // this.setData({
      //   srcLicense: app.loginRefresh.hospital.map.license
      // })
    }

    // if(app.globalData.srcCover){
    //   console.log(app.globalData.srcCover)
    //   this.setData({
    //     srcCover: app.globalData.srcCover
    //   })
    // }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var tel = app.globalData.phone;
    if (tel) {
      if (tel.length == 8) {
        tel = tel.slice(0, 2) + '****' + tel.slice(6, 8)
      } else if (tel.length == 12) {
        tel = tel.slice(0, 3) + '****' + tel.slice(7, 12)
      } else {
        tel = tel.slice(0, 3) + '****' + tel.slice(7, 11)
      }
    }


    this.setData({
      address: app.globalData.hospitaladdress,
      name: app.globalData.hospitalName,
      tel: tel,
    })
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
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index'
    } else {
      var path = '/pages/out/index/index'
    }
    return {
      title: '欢迎使用共享医联体小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://zaylt.njshangka.com/favicon.ico', //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  loginRefresh: function (_value) {
    let that = this;
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          // wx.redirectTo({
          //   url: '../selectRole/selectRole',
          // })
          if (app.globalData) {
            app.globalData.phone = res.data.data.phone;
            app.globalData.userId = res.data.data.userId;
            app.globalData.hospitalId = res.data.data.hospitalId;
            app.globalData.hospitalName = res.data.data.hospitalName;
            // app.globalData.hospitaladdress = res.data.data.hospital.address;
            // app.globalData.authenticationIs = res.data.data.hospital.authStatus;
            // if (res.data.data.hospital.license == '' || res.data.data.hospital.license == null || res.data.data.hospital.license == undefined) {
            //   app.globalData.src = ''
            // } else {
            //   app.globalData.src = app.globalData.url + res.data.data.hospital.license
            // }
            // if (res.data.data.hospital.cover == '' || res.data.data.hospital.cover == null || res.data.data.hospital.cover == undefined) {
            //   app.globalData.srcCover = ''
            // } else {
            //   app.globalData.srcCover = app.globalData.url + res.data.data.hospital.cover
            // }
          }
          app.loginRefresh = res.data.data;

        } else {
          if (!_value) {
            wx.showToast({
              title: res.data.codeMsg,
              icon: 'none'
            })
          }

        }
      }
    })
  },
})