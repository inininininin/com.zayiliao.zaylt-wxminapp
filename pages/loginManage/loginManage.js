// pages/login/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    key: '',
    // 密码
    password: '',
    // 密码的显示和隐藏
    isShowPassword: true,
    selectAgree:true,
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['医院端', '门诊端', '运营端'],
    currentTab: 0,
    openid:'',
    loginChange:true,
    times: '获取验证码',
    time:60
  },
  selectEnter(){
    wx.reLaunch({
      url: '../selectRole/selectRole',
    })
  },
  timeBack(){
    var that=this
      var timer = setInterval(function () {
        var time=that.data.time-1;
        that.setData({
          times: time + ' s',
          time: time
        })
        if (that.data.time == 0) {
          clearInterval(timer);
          that.setData({
            times: '获取验证码',
            time:60
          })
        }
      }, 1000);   
  },
  // 获取验证码
  smsvcodeGet(e) {
    var that = this
    
    if (that.data.key == '' || that.data.key.length < 11) {
      wx.showToast({
        title: '请填写正确手机号',
      })
    } else if (that.data.times != '获取验证码') {
      return
    } else {
      that.setData({
        time:60
      })
      wx.request({
        url: app.globalData.url + '/sendsmsvcode',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'post',
        data: {
          phone: that.data.key,
          // smsvcode: that.data.smsvcode
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            that.timeBack()
          } else {
            wx.showToast({
              title: res.data.codeMsg
            })
          }
        }
      })
    }

  },
  loginCode: function (e) {
    this.setData({
      code: e.detail.value,
    })
  },
  // 账号有内容显示清除按钮
  loginPhone: function (e) {
    this.setData({
      key: e.detail.value,
    })
  },
  // 密码有内容显示清除按钮
  loginPassward: function (e) {
    this.setData({
      password: e.detail.value,
    })
  },
  // 密码显示和隐藏切换
  toggleShowPassword: function (e) {
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },
  selectIcon: function (e) {
    var selectAgree = !this.data.selectAgree;
    this.setData({
      selectAgree: selectAgree
    });
  },
  // 清除账号内容
  eliminate: function () {
    this.setData({
      key: ""
    })
  },
  eliminate1: function () {
    this.setData({
      password: ""
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
  },
  changePwd(e){
    wx.navigateTo({
      url: '../changePwd/changePwd',
    })
  },
  // 忘记密码切换
  forgotpwd: function (e) {
    var loginChange = !this.data.loginChange;
    this.setData({
      loginChange: loginChange,
      password:'',
      times: '获取验证码',
      time:1,
      code:'',
    });
  },

  loginXy:function(e) { 
    wx.navigateTo({
      url: '../registerXy/registerXy',
    })
  },
  changeHos: function (key, code, password){
    var that=this
    wx.request({
      url: app.globalData.url + '/hospital/set-pwd-by-phone',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      data: {
        phone: key,
        smsvcode: code,
        newpwd: password,
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            var loginChange = !that.data.loginChange;
            that.setData({
              loginChange: loginChange,
              times: '获取验证码',
            });
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'loading',
            duration: 1000,
          }) 
          that.setData({
            times: '获取验证码',
          })
        }
      }
    })
  },
  changeCli: function (key, code, password) {
    var that = this
    wx.request({
      url: app.globalData.url + '/clinic/set-pwd-by-phone',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      data: {
        phone: key,
        smsvcode: code,
        newpwd: password,
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            var loginChange = !that.data.loginChange;
            that.setData({
              loginChange: loginChange,
              times: '获取验证码',
            });
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'loading',
            duration: 1000,
          })
          that.setData({
            times: '获取验证码',
          })
        }
      }
    })
  },
  changeMan: function (key, code, password) {
    var that = this
    wx.request({
      url: app.globalData.url + '/manager/set-pwd-by-phone',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      data: {
        phone: key,
        smsvcode: code,
        newpwd: password,
      },
      method: 'post',
      success: function (res) {
        if (res.data.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            var loginChange = !that.data.loginChange;
            this.setData({
              loginChange: loginChange
            });
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.data.codeMsg,
            icon: 'loading',
            duration: 1000,
          })
        }
      }
    })
  },
  // 修改密码
  makeSure:function(){
    var that=this
    var key = that.data.key;
    var password = that.data.password;
    var code = that.data.code;
    var keyPrev = key.slice(0,4)
    var keyLast = key.slice(key.length-4,key.length)
    console.log(keyPrev, keyLast)
    if (keyPrev == 'test' || keyLast == 'test') {
      app.globalData.url = 'https://test.zaylt.njshangka.com'
      var lengths = that.data.key.length - 4
      var key = that.data.key.slice(4, lengths);
    } else {
      app.globalData.url = 'https://zaylt.njshangka.com'
    }
    
   
      that.changeMan(key, that.data.code, password)
     
    // setTimeout(function () {
    //   if (that.data.currentTab == 0) {
    //     that.changeHos(key, password)
    //   } else if (that.data.currentTab == 1) {
    //     that.changeCli(key, password)
    //   } else {
    //     // that.changeMan(key, password)
    //     wx.showToast({
    //       title: '维护中',
    //       duration: 2000,
    //     })
    //   }
    // }, 1000)
    
  },
  // 登录
  loginBtn: function() {
    var that = this
    if (!that.data.selectAgree){
      wx.showToast({
        title: '请勾选登录协议',
        icon: 'loading',
        duration: 1000
      })
    }else{
      var key = that.data.key;
      var password = that.data.password;
      var keyPrev = key.slice(0, 4)
      var keyLast = key.slice(key.length - 4, key.length)
      console.log(key,keyPrev, keyLast)
      if (keyPrev == 'test' && keyLast == 'test') {
        app.globalData.url ='https://test.zaylt.njshangka.com'
        var lengths = that.data.key.length-4
        var key = that.data.key.slice(4, lengths);
      }else{
        app.globalData.url = 'https://zaylt.njshangka.com'
      }
      wx.request({
        url: app.globalData.url + '/phone-in-which',
        header: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        method: "get",
        data: {
          phone: key,
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            console.log(res.data.data.managerUser)
            if (res.data.data.managerUser == 1) {
              app.globalData.lastClient = 3
              that.loginMan(key, password)
            } else {
              wx.showToast({
                title: '账号不是运营号',
              })
            }
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      })
      buttonDisabled: true
      wx.showToast({
        title: '登录请求中',
        icon: 'loading',
        duration: 2000
      })
    }
   
  },


  loginHos: function (userPhone, userPassword){
    wx.request({
      url: app.globalData.url + '/hospital/login',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      data:{
        account: userPhone,
        password: userPassword,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.request({
            url: app.globalData.url + '/hospital/wxminapp-bind-phone',
            header: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            data: {
              openid: wx.getStorageSync('openid'),
              phone: userPhone,
              pwd: userPassword,
            },
            success: function (res) {
              wx.request({
                url: app.globalData.url + '/hospital/login-by-wxminapp',
                header: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                data: {
                  openid: wx.getStorageSync('openid'),
                },
                success: function (res) {
                  app.globalData.cookie = res.header['Set-Cookie']
                  app.globalData.token = res.data.data.token;
                  app.globalData.userToken = res.data.data.token;
                  wx.setStorageSync('userToken', res.data.data.token)
                  wx.setStorageSync('token', res.data.data.token)
                  wx.request({
                    url: app.globalData.url + '/hospital/login-refresh',
                    header: {
                      'Content-type': 'application/x-www-form-urlencoded',
                      'longitude':app.globalData.longitude,
                      'latitude': app.globalData.latitude,
                      'device-speed': app.globalData.speed,
                      'cookie': app.globalData.cookie
                    },
                    method: 'post',
                    success: function (res) {
                     if(res.data.code==0){
                       app.globalData.phone = res.data.data.phone;
                       app.globalData.userId = res.data.data.userId;
                       app.globalData.hospitalId = res.data.data.hospital.hospitalId;
                       app.globalData.hospitalName = res.data.data.hospital.name;
                       app.globalData.hospitaladdress = res.data.data.hospital.address;
                       app.globalData.authenticationIs = res.data.data.hospital.authStatus;
                       if (res.data.data.hospital.license == '' || res.data.data.hospital.license == null || res.data.data.hospital.license == undefined) {
                         app.globalData.src = ''
                       } else {
                         app.globalData.src = app.globalData.url + res.data.data.hospital.license
                       }
                       if (res.data.data.type == 1) {
                         wx.navigateTo({
                           url: '../promoter/index/index',
                         })
                       } else {
                         wx.navigateTo({
                           url: '../index/index',
                         })
                       }
                     }else{
                       wx.showModal({
                         title: '',
                         content: '',
                       })
                     }
                    }
                  })
                }
              })
            }
            })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    })
  },

  loginCli: function (userPhone, userPassword) {
    wx.request({
      url: app.globalData.url + '/clinic/login?account=' + userPhone + "&password=" + userPassword,
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.request({
            url: app.globalData.url + '/clinic/wxminapp-bind-phone',
            header: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            data: {
              openid: wx.getStorageSync('openid'),
              phone: userPhone,
              pwd: userPassword,
            },
            success: function (res) {
              wx.request({
                url: app.globalData.url + '/clinic/login-by-wxminapp',
                header: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                data: {
                  openid: wx.getStorageSync('openid'),
                  phone: userPhone,
                  pwd: userPassword,
                },
                success: function (res) {
                  app.globalData.cookie = res.header['Set-Cookie']
                  app.globalData.token = res.data.data.token;
                  app.globalData.userToken = res.data.data.token;
                  wx.setStorageSync('userToken', res.data.data.token)
                  wx.setStorageSync('token', res.data.data.token)
                  wx.request({
                    url: app.globalData.url + '/clinic/login-refresh',
                    header: {
                      'Content-type': 'application/x-www-form-urlencoded',
                      'longitude': app.globalData.longitude,
                      'latitude': app.globalData.latitude,
                      'device-speed': app.globalData.speed,
                      'cookie': app.globalData.cookie
                    },
                    method:'post',
                    success: function (res) {
                      app.globalData.phone = res.data.data.phone;
                      app.globalData.userId = res.data.data.userId;
                      app.globalData.clinicId = res.data.data.clinic.clinicId;
                      app.globalData.hospitalId = res.data.data.hospital.hospitalId;
                      app.globalData.hospitalName = res.data.data.hospital.name;
                      app.globalData.clinicName = res.data.data.clinic.name;
                      app.globalData.clinicaddress = res.data.data.clinic.address;
                      app.globalData.authenticationIs = res.data.data.clinic.authenticationIs;
                      if (res.data.data.clinic.license == '' || res.data.data.clinic.license == null || res.data.data.clinic.license == undefined) {
                        app.globalData.src = ''
                      } else {
                        app.globalData.src = app.globalData.url + res.data.data.clinic.license
                      }

                      wx.switchTab({
                        url: '../out/index/index',
                      })

                    }
                  })


                }
              })
            }
          })
        } else {
          wx.showModal({
            showCancel:false,
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  loginMan: function (userPhone, userPassword) {
    wx.request({
      url: app.globalData.url + '/manager/login',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      data: {
        account: userPhone,
        password: userPassword,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.request({
            url: app.globalData.url + '/manager/wxminapp-bind-phone',
            header: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            data: {
              openid: wx.getStorageSync('openid'),
              phone: userPhone,
              pwd: userPassword,
            },
            success: function (res) {
              wx.request({
                url: app.globalData.url + '/manager/login-by-wxminapp',
                header: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                data: {
                  openid: wx.getStorageSync('openid'),
                },
                success: function (res) {
                  app.globalData.cookie = res.header['Set-Cookie']
                  app.globalData.token = res.data.data.token;
                  app.globalData.userToken = res.data.data.token;
                  wx.setStorageSync('userToken', res.data.data.token)
                  wx.setStorageSync('token', res.data.data.token)
                  wx.request({
                    url: app.globalData.url + '/manager/login-refresh',
                    header: {
                      'Content-type': 'application/x-www-form-urlencoded',
                      'longitude': app.globalData.longitude,
                      'latitude': app.globalData.latitude,
                      'device-speed': app.globalData.speed,
                      'cookie': app.globalData.cookie
                    },
                    method: 'post',
                    success: function (res) {
                      if (res.data.code == 0) {
                        app.globalData.phone = res.data.data.phone;
                        app.globalData.userId = res.data.data.userId;
                       
                          wx.navigateTo({
                            url: '../manage/index/index',
                          })
                       
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: res.data.codeMsg,
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    })
    // wx.request({
    //   url: app.globalData.url + '/manager/login',
    //   header: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: "post",
    //   data: {
    //     account: userPhone,
    //     password: userPassword,
    //   },
    //   success: function (res) {
    //     wx.hideToast()
    //     if (res.data.code == 0) {        
    //       wx.request({
    //         url: app.globalData.url + '/manager/wxminapp-bind-phone',
    //         header: {
    //           'Content-type': 'application/x-www-form-urlencoded'
    //         },
    //         method: 'post',
    //         data: {
    //           openid: wx.getStorageSync('openid'),
    //           phone: userPhone,
    //           pwd: userPassword,
    //         },
    //         success: function (res) {
    //           wx.request({
    //             url: app.globalData.url + '/manager/login-by-wxminapp',
    //             header: {
    //               'Content-type': 'application/x-www-form-urlencoded'
    //             },
    //             method: 'post',
    //             data: {
    //               openid: wx.getStorageSync('openid'),
    //               // phone: userPhone,
    //               // pwd: userPassword,
    //             },
    //             success: function (res) {
    //               // console.log(res.data.data.token)
    //               app.globalData.token = res.data.data.token;
    //               app.globalData.userToken = res.data.data.token;
    //               wx.setStorageSync('userToken', res.data.data.token)
    //               wx.setStorageSync('token', res.data.data.token)
    //               wx.request({
    //                 url: app.globalData.url + '/manager/login-refresh',
    //                 header: {
    //                   'Content-type': 'application/x-www-form-urlencoded',
    //                 },
    //                 method: 'post',
    //                 success: function (res) {
                      
    //                   app.globalData.phone = res.data.data.phone;
    //                   app.globalData.userId = res.data.data.userId;
    //                   app.globalData.clinicId = res.data.data.clinic.clinicId;
    //                   app.globalData.hospitalId = res.data.data.hospital.hospitalId;
    //                   app.globalData.hospitalName = res.data.data.hospital.name;
    //                   app.globalData.clinicName = res.data.data.clinic.name;
    //                   app.globalData.clinicaddress = res.data.data.clinic.address;
    //                   app.globalData.authenticationIs = res.data.data.clinic.authenticationIs;
    //                   if (res.data.data.clinic.license == '' || res.data.data.clinic.license == null || res.data.data.clinic.license == undefined) {
    //                     app.globalData.src = ''
    //                   } else {
    //                     app.globalData.src = app.globalData.url + res.data.data.clinic.license
    //                   }

    //                   // wx.switchTab({
    //                   //   url: '../out/index/index',
    //                   // })

    //                 }
    //               })


    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       wx.showModal({
    //         title: res.data.codeMsg
    //       })
    //     }
    //   }
    // })
  },
  // 登录界面取值end
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    that.setData({
      openid: wx.getStorageSync('openid')
    })
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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
})