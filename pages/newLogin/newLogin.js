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
    time:60,
    loginRefresh:'',
    showPhone:false,
  },
  getPerson:function(_value){
    let that = this
    if (!that.data.selectAgree){
      wx.showToast({
        title: '请勾选登录协议',
        icon: 'none',
        duration: 1000
      })
    }else{
      console.log(_value)
      wx.login({
        success(res) {
          var code = res.code
          if (_value.detail.errMsg=='getUserInfo:ok'){
            that.wxLogin(_value.detail.userInfo,code)
          }
          
        }
      })
    }
    
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
      // app.globalData.url = 'https://zaylt.njshangka.com'
      // var lengths = that.data.key.length - 4
      // var key = that.data.key.slice(4, lengths);
      app.globalData.url = 'http://192.168.2.45/zaylt'
    } else {
      app.globalData.url = 'http://192.168.2.45/zaylt'
      // app.globalData.url = 'https://zaylt.njshangka.com'
    }
    
    if (that.data.currentTab == 0) {
      that.changeHos(key,that.data.code, password)
    } else if (that.data.currentTab == 1) {
      that.changeCli(key, that.data.code, password)
    } else {
      // that.changeMan(key, password)
      wx.showToast({
        title: '维护中',
        duration: 2000,
      })
    }
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
  submitGetPerson: function() {
    var that = this
    if (!that.data.selectAgree){
      wx.showToast({
        title: '请勾选登录协议',
        icon: 'none',
        duration: 1000
      })
    }else{
      var key = that.data.key;
      var password = that.data.password;
      var keyPrev = key.slice(0, 4)
      var keyLast = key.slice(key.length - 4, key.length)
      console.log(key,keyPrev, keyLast)
      if (keyPrev == 'test' && keyLast == 'test') {
        // app.globalData.url ='https://zaylt.njshangka.com'
        app.globalData.url = 'http://192.168.2.45/zaylt'
        // var lengths = that.data.key.length-4
        // var key = that.data.key.slice(4, lengths);
      }else{
        // app.globalData.url = 'https://zaylt.njshangka.com'
        app.globalData.url = 'http://192.168.2.45/zaylt'
      }
      that.loginHos(key, password)
      buttonDisabled: true
      wx.showToast({
        title: '登录请求中',
        icon: 'loading',
        duration: 2000
      })
    }
   
  },


  loginHos: function (userPhone, userPassword){
    let that = this;
    wx.request({
      url: app.globalData.url + '/login',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      data:{
        account: userPhone,
        password: userPassword,
      },
      success: function (resData) {
        wx.hideToast()
        if (resData.data.code == 0) {
          app.globalData.cookie = resData.header['Set-Cookie']
          that.loginRefresh()
        } else {
          wx.showModal({
            showCancel: false,
            title: resData.data.codeMsg
          })
        }
      }
    })
  },
  showPhoneFn(e) {
    this.setData({
      showPhone: false
    })
  },
  getPhoneNumber(_value){
    let that = this;
    that.setData({
      showPhone: false
    }) 
    
    wx.request({
      url: app.globalData.url + '/update-my-phone',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      data:{
        wxMinAppEncryptedDataOfPhoneNumber:_value.detail.encryptedData,
        wxMinappIv:_value.detail.iv
      },
      success: function (res) {
        console.log(app.loginRefresh)
        if(app.loginRefresh.hospitalIs){
          // 医院端
          wx.navigateTo({ url: '../index/index',})
          return ''
        }
        if(app.loginRefresh.clinicIs){
          // 门诊端
          wx.switchTab({url: '../out/index/index',})
          return ''
        }
        if(app.loginRefresh.hospitalOperateIs){
           // 推广人端
          wx.navigateTo({url: '../promoter/index/index',})
          return ''
        }
        if(app.loginRefresh.hospitalAdminIs){
          // 运营端
          wx.navigateTo({url: '../manage/index/index',})
          return ''
        }
      }
    })
    
    console.log(_value)
  },
  wxLogin:function(_value,code){
    let that = this;
    let sex = '';
    if(_value.gender == 1){
      sex = 1
    }else{
      sex = 2
    }
    wx.request({
      url: app.globalData.url + '/login-by-wxminapp',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      data: {
        jscode: code,
        nickname:_value.nickName,
        logo:_value.avatarUrl,
        sex:sex,
      },
      success: function (res) {
        app.globalData.cookie = res.header['Set-Cookie']
        that.loginRefresh()
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
        if(!res.data.data.phone){
          that.setData({
            showPhone: true
          })
          return ''
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
    let that = this;
    that.loginRefresh(true);
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