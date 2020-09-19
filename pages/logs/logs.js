//logs.js
const util = require('../../utils/util.js')
var app = getApp() 
Page({
  data: {
    logs: [],
    jscode: '',
    openid: '',
  },
  onLoad: function() {
    
    wx.setStorageSync('domain', app.globalData.url)

    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  onShow: function() {
    var that = this
    var jscode;
    wx.showToast({
      title: '登陆中',
      icon:'loading'
    })
    wx.login({
      success: function(res) {
        jscode = res.code;
        that.setData({
          jscode: res.code,
        })
        wx.request({
          url: app.globalData.url + '/login-refresh',
          header: {
            'Content-type': 'application/x-www-form-urlencoded',
            'cookie': app.globalData.cookie
          },
          method: 'post',
          success: function (res) {
            if(res.data.code==0){
              console.log(1)
              // wx.redirectTo({
              //   url: '../selectRole/selectRole',
              // })
              if(app.globalData){
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
              // console.log(res.data.data.phone)
              if(!res.data.data.phone){
                that.setData({
                  showPhone: true
                })
              }
              // res.data.data.hospitalAdminIs = "1";
              // res.data.data.clinicIs = "1";
              let _num = parseInt(res.data.data.hospitalIs)+parseInt(res.data.data.clinicIs)+parseInt(res.data.data.hospitalOperateIs)+parseInt(res.data.data.hospitalAdminIs)
              if(_num>1){
                wx.navigateTo({ url: '../selectRole/selectRole'})
                return ''
              }
              if(res.data.data.hospitalIs){
                // 医院端
                wx.navigateTo({ url: '../index/index',})
                return ''
              }
              if(res.data.data.clinicIs){
                // 门诊端
                wx.switchTab({url: '../out/index/index',})
                return ''
              }
              if(res.data.data.hospitalOperateIs){
                // 推广人端
                wx.navigateTo({url: '../promoter/index/index',})
                return ''
              }
              if(res.data.data.hospitalAdminIs){
                // 运营端
                wx.navigateTo({url: '../manage/index/index',})
                return ''
              }
              
            }else if(res.data.code==20){
              console.log(2)
              wx.request({
                url: app.globalData.url + '/login-by-wxminapp',
                header: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                data: {
                  jscode: jscode,
                },
                success: function (res) {
                 if(res.data.code==0){
                  app.globalData.cookie = res.header['Set-Cookie']
                  that.loginRefresh()
                 }else if(res.data.code==10001){
                   wx.showToast({
                    title: '当前小程序未绑定账号，请用账号密码登录',
                    icon: 'none',
                    duration: 2000,
                    mask: true,
                    complete: function complete(res) {
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '../newLogin/newLogin',
                        })
                      }, 1000);
                    }
                   })
                   
                 }
                }
              })
            }else{
              wx.navigateTo({
                url: '../newLogin/newLogin',
              })
              
            }
          }
        })
        // wx.request({
        //   url: app.globalData.url + '/c/useraction/logincheck',
        //   method: "POST",
        //   header: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   success: function(res) {         
        //     if (res.data.data.loginIs == 0) {
        //       wx.request({
        //         url: app.globalData.url + '/wxminapp-get-openid',
        //         method: "POST",
        //         header: {
        //           "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         data: {
        //           jscode: jscode,
        //         },
        //         success: function(res) {
        //           if (res.data.code == 0) {
        //             that.setData({
        //               openid: res.data.data.openid
        //             })
        //             wx.setStorageSync('openid', res.data.data.openid)
        //             var lastClient=res.data.data.lastClient                   
        //             if (lastClient==1){
        //               app.globalData.lastClient = 1
        //               that.loginHos(res.data.data.openid)
        //             } else if (lastClient==2){
        //               app.globalData.lastClient = 2
        //               that.loginCli(res.data.data.openid)
        //             } else if (lastClient==3){
        //               app.globalData.lastClient = 3
        //               that.loginMan(res.data.data.openid)
        //             }else{
        //               wx.navigateTo({
        //                 url: '../login/login?openid=' + res.data.data.openid,
        //               })
        //             }
                   
                   
        //           } else {
        //             // that.setData({
        //             //   openid: res.data.data.openid
        //             // })
                   
        //           }
        //         }
        //       })
        //     } else {
        //       wx.navigateTo({
        //         url: '../login/login',
        //       })

        //     }
        //   },
        //   fail: function(err) {
        //     wx.showModal({
        //       title: err,
        //       content: '',
        //       showCancel: false,
        //     })
        //   }, //请求失败
        //   complete: function() {
        //     // wx.showModal({
        //     //   title: '111',
        //     //   content: '',
        //     // })
        //   }, //请求失败
        //   //  }//请求完成后执行的函数
        // })


      }
    })
  },
  loginRefresh:function(_value){
    let that = this;
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
       if(res.data.code==0){
        // wx.redirectTo({
        //   url: '../selectRole/selectRole',
        // })
        if(app.globalData){
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
        // console.log(res.data.data.phone)
        // if(!res.data.data.phone){
        //   that.setData({
        //     showPhone: true
        //   })
        //   return ''
        // }
        // res.data.data.hospitalAdminIs = "1";
        // res.data.data.clinicIs = "1";
        let _num = parseInt(res.data.data.hospitalIs)+parseInt(res.data.data.clinicIs)+parseInt(res.data.data.hospitalOperateIs)+parseInt(res.data.data.hospitalAdminIs)
        if(_num>1){
          wx.navigateTo({ url: '../selectRole/selectRole'})
          return ''
        }
        if(res.data.data.hospitalIs){
          // 医院端
          wx.navigateTo({ url: '../index/index',})
          return ''
        }
        if(res.data.data.clinicIs){
          // 门诊端
          wx.switchTab({url: '../out/index/index',})
          return ''
        }
        if(res.data.data.hospitalOperateIs){
           // 推广人端
          wx.navigateTo({url: '../promoter/index/index',})
          return ''
        }
        if(res.data.data.hospitalAdminIs){
          // 运营端
          wx.navigateTo({url: '../manage/index/index',})
          return ''
        }
        
       }else{
         if(!_value){
          wx.showModal({
            title: '',
            content: res.data.codeMsg,
          })
         }
         
       }
      }
    })
  },
  loginHos: function (openid) {
    wx.request({
      url: app.globalData.url + '/hospital/login-by-wxminapp',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: {
        openid: openid,
      },
      success: function (res) {
        app.globalData.cookie = res.header['Set-Cookie']
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('userToken', res.data.data.token)
        app.globalData.token = res.data.data.token;
        app.globalData.userToken = res.data.data.token;
        wx.request({
          url: app.globalData.url + '/hospital/login-refresh',
          header: {
            'Content-type': 'application/x-www-form-urlencoded',
            'longitude': app.globalData.longitude,
            'latitude': app.globalData.latitude,
            'device-speed': app.globalData.speed,
            'cookie': app.globalData.cookie
          },
          method: 'post',
          success: function (res) {
            app.globalData.phone = res.data.data.phone;
            app.globalData.userId = res.data.data.userId;
            app.globalData.hospitalId = res.data.data.hospital.hospitalId;
            app.globalData.hospitalName = res.data.data.hospital.name;
            app.globalData.hospitaladdress = res.data.data.hospital.address;
            app.globalData.authenticationIs = res.data.data.hospital.authStatus;
            app.globalData.src=app.cover(res.data.data.hospital.license) 
            if (res.data.data.type == 1) {
              wx.navigateTo({
                url: '../promoter/index/index',
              })
            } else {
              wx.navigateTo({
                url: '../index/index',
              })
            }
          }
        })

      }
    })
  },
  loginCli: function (openid){
    wx.request({
      url: app.globalData.url + '/clinic/login-by-wxminapp',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method:'post',
      data: {
        openid: openid,
      },
      success: function (res) {
        app.globalData.cookie = res.header['Set-Cookie']
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('userToken', res.data.data.token)
        app.globalData.token = res.data.data.token;
        app.globalData.userToken = res.data.data.token;
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
            // if (res.data.data.type == '3') {
            //   wx.redirectTo({
            //     url: '../manage/index/index',
            //   })
            //   if (res.data.data.headimg != '' && res.data.data.headimg != undefined && res.data.data.headimg != null) {
            //     if (res.data.data.headimg.slice(0, 1) != 'h') {
            //       res.data.data.headimg = app.globalData.url + res.data.data.headimg
            //     }
            //   }
            //   app.globalData.realname = res.data.data.realname;
            //   app.globalData.phone = res.data.data.phone;
            //   app.globalData.headimg = res.data.data.headimg;
            //   // wx.showToast({
            //   //   title: '请输入门诊账号',
            //   // })333
            // } else if (res.data.data.type == '2') {
              app.globalData.clinicId = res.data.data.clinic.clinicId;
              app.globalData.hospitalId = res.data.data.hospital.hospitalId;
              app.globalData.hospitalName = res.data.data.hospital.name;
              app.globalData.clinicName = res.data.data.clinic.name;
              app.globalData.clinicaddress = res.data.data.clinic.address;
              app.globalData.authenticationIs = res.data.data.clinic.authStatus;
              app.globalData.src=app.cover(res.data.data.clinic.license) 
            wx.switchTab({
                url: '../out/index/index',
              })
          }
        })

      }
    })
  },
  loginMan: function (openid) {
    wx.request({
      url: app.globalData.url + '/manager/login-by-wxminapp',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: {
        openid: openid,
      },
      success: function (res) {
        app.globalData.cookie = res.header['Set-Cookie']
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('userToken', res.data.data.token)
        app.globalData.token = res.data.data.token;
        app.globalData.userToken = res.data.data.token;
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
            app.globalData.phone = res.data.data.phone;
            app.globalData.managerId = res.data.data.managerUserId;
            app.globalData.managerName = res.data.data.name;
            app.globalData.userId = res.data.data.userId;
            wx.navigateTo({
              url: '../manage/index/index',
            })
          }
        })

      }
    })
  },
  
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
function mockSessionCookies(res) {
  if (!res.header['Set-Cookie']) return;
  let cookies = this.storage('mockSessionCookies');
  if (!cookies) cookies = {};
  //解析Set-Cookie. wx.request会将多个Set-Cookie以','连接
  res.header['Set-Cookie'].split('HttpOnly,').forEach(ck => {
    let kv = ck.split(';')[0].split('=');
    cookies[kv[0]] = kv[1];
  })
  wx.setStorageSync('mockSessionCookies', cookies);
}

function serializeJson(obj) {
  let str = '';
  for (let k in obj) {
    str += k + '=' + obj[k] + ';';
  }
  return str;
}