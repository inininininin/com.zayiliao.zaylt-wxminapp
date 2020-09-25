// pages/Third/out/index/index.js
var start_clientX;
var end_clientX;
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    num: '0',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['新病员', '未就诊', '已就诊'],
    currentTab: 0,
    list2: [],
    list1: [],
    idCard: '',
    name: '',
    remark: '',
    phone: '',
    windowWidth: wx.getSystemInfoSync().windowWidth,
    display: 'none',
    translate: 'transform: ',
    date: '开始时间', //默认起始时间  
    date2: '结束时间', //默认结束时间 
    date3: '开始时间', //默认起始时间  
    date4: '结束时间', //默认结束时间 
    color: '#f2f2f2',
    color2: '#f2f2f2',
    color3: '#f2f2f2',
    color4: '#f2f2f2',
    color5: '#f2f2f2',
    color6: '#f2f2f2',
    status: '',
    num1: '',
    num2: '',
  },
  slider1change(e) {

  },
  bindDateChange(e) {
    let that = this;
    that.setData({
      date: e.detail.value,
      color: 'rgb(255,255,190)'
    })
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
      color2: 'rgb(255, 255, 190)'
    })
  },
  bindDateChange3(e) {
    let that = this;
    that.setData({
      date3: e.detail.value,
      color3: 'rgb(255, 255, 190)'
    })
  },
  bindDateChange4(e) {
    let that = this;
    that.setData({
      date4: e.detail.value,
      color4: 'rgb(255, 255, 190)'
    })
  },
  seeAd(e) {
    let that = this
    that.setData({
      color5: 'rgb(255, 255, 190)',
      color6: '#f2f2f2',
      status: '1',
    })
  },
  noseeAd(e) {
    let that = this
    that.setData({
      color6: 'rgb(255, 255, 190)',
      color5: '#f2f2f2',
      status: '4',
    })
  },
  again(e) {
    this.setData({
      color: '#f2f2f2',
      color2: '#f2f2f2',
      color3: '#f2f2f2',
      color4: '#f2f2f2',
      color5: '#f2f2f2',
      color6: '#f2f2f2',
      date: '开始时间',
      date2: '结束时间',
      date3: '开始时间',
      date4: '结束时间',
      status: '',
    })
  },
  sure(e) {
    let that = this

    if (that.data.status == 1) {
      that.setData({
        currentTab: 1,
        list1: [],
        list2: [],
      })
      that.lastPage(0, 1, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else {
      that.setData({
        currentTab: 2,
        list1: [],
        list2: [],
      })
      that.lastPage(0, 4, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    }

    that.setData({
      display: "none",
      // translate: '',     
    })
  },
  search(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 滑动开始
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  // 滑动结束
  touchend: function (e) {
    end_clientX = e.changedTouches[0].clientX;
    if (start_clientX - end_clientX > 120) {
      this.setData({
        display: "block",
        // translate: 'transform: translateX(-590rpx);'
      })
    } else if (start_clientX - end_clientX > 0) {
      this.setData({
        display: "none",
        // translate: ''
      })
    }
  },
  // 头像
  showview: function () {
    this.setData({
      display: "block",
      // translate: 'transform: translateX(-590rpx);'
      // translate: 'transform: translateX(-' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      // translate: '',
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list1: [],
      list2: [],
      date: '开始时间',
      date2: '结束时间',
      date3: '开始时间',
      date4: '结束时间',
    })
    if (e.currentTarget.dataset.idx == 1) {
      this.lastPage(0, 1, this.data.date, this.data.date2, this.data.date3, this.data.date4)
    } else if (e.currentTarget.dataset.idx == 2) {
      this.lastPage(0, 4, this.data.date, this.data.date2, this.data.date3, this.data.date4)
    }
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  idCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  news: function (e) {
    wx.navigateTo({
      url: '../news/news',
    })
  },
  // /c2/patient/itemadd
  save: function (e) {
    var that = this
    if(!that.data.name){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return
    }
    if(!that.data.phone){
      wx.showToast({
        title: '请输入联系方式',
        icon:'none'
      })
      return
    }
    if(!that.data.idCard||that.data.idCard.length!=18){
      wx.showToast({
        title: '请输入正确的身份证号码',
        icon:'none'
      })
      return
    }
   
    wx.request({
      url: app.globalData.url + '/c2/patient/itemadd',
      method: 'post',
      data: {
        clinicId: app.globalData.clinicId || '',
        hospitalId: app.globalData.hospitalId || '',
        realname: that.data.name,
        tel: that.data.phone,
        idcardNo: that.data.idCard,
        remark: that.data.remark,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '新增成功',
            icon: 'none'
          })
          that.setData({
            name: '',
            phone: '',
            idCard: '',
            remark: '',
          })
          that.lastPageNum();
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  lastPageNum: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      async: true,
      data: {
        pn: 1,
        ps: 15,
        status: 1,
        clinicId: app.globalData.clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            num1: res.data.data.sum.totalCount,
          })
          console.log(that.data.num1)
          wx.request({
            url: app.globalData.url + '/c2/patient/items',
            method: 'post',
            async: true,
            data: {
              pn: 1,
              ps: 15,
              status: 4,
              clinicId: app.globalData.clinicId,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              if (res.data.code == 0) {
                that.setData({
                  navbar: ['新病员', '未就诊(' + that.data.num1 + ')', '已就诊(' + res.data.data.sum.totalCount + ')'],
                  num2: res.data.data.sum.totalCount,
                })
              } else if (res.data.code == 20 || res.data.code == 26) {
                wx.hideToast()
                wx.navigateTo({
                  url: '../../newLogin/newLogin',
                })
              }
            }
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }
      }
    })
  },
  onLoad: function (options) {
    if (options.isShare && options.isShare == 1) {
      wx.navigateTo({
        url: '../articleDetail/articleDetail?id=' + options.shareId,
      })
    } else if (options.isShare && options.isShare == 2) {
      wx.navigateTo({
        url: '../highQualityCaseDetail/highQualityCaseDetail?id=' + options.shareId,
      })
    } else if (options.isShare && options.isShare == 3) {
      wx.navigateTo({
        url: '../../newActivity/newActivity?type=' + options.shareId,
      })
    }
  },


  // 
  lastPage: function (toPageNo, status, pushTimeStart, pushTimeEnd, hospitalConfirmTimeStart, hospitalConfirmTimeEnd) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    if (pushTimeStart == '开始时间') {
      pushTimeStart = ''
    } else {
      pushTimeStart = Date.parse(new Date(that.data.date));
    }
    if (pushTimeEnd == '结束时间') {
      pushTimeEnd = ''
    } else {
      pushTimeEnd = Date.parse(new Date(that.data.date2));
    }
    if (hospitalConfirmTimeStart == '开始时间') {
      hospitalConfirmTimeStart = ''
    } else {
      hospitalConfirmTimeStart = Date.parse(new Date(that.data.date3));
    }
    if (hospitalConfirmTimeEnd == '结束时间') {
      hospitalConfirmTimeEnd = ''
    } else {
      hospitalConfirmTimeEnd = Date.parse(new Date(that.data.date4));
    }


    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: 15,
        status: status,
        clinicId: app.globalData.clinicId,
        token: app.globalData.token,
        pushTimeStart: pushTimeStart,
        pushTimeEnd: pushTimeEnd,
        hospitalConfirmTimeStart: hospitalConfirmTimeStart,
        hospitalConfirmTimeEnd: hospitalConfirmTimeEnd,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (that.data.currentTab == 1) {
            // that.setData({
            //   list1: res.data.data.items,
            // })
            var list1 = that.data.list1;
            var newlist1 = list1.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list1: list1,
                // toPageNo: String(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                icon: 'none'
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              that.setData({
                list1: newlist1,
                toPageNo: parseInt(toPageNo)
              });
            }
          } else {
            // that.setData({
            //   list2: res.data.data.items,
            // })
            var list2 = that.data.list2;
            var newlist2 = list2.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list2: list2,
                // toPageNo: String(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                icon: 'none'
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              that.setData({
                list2: newlist2,
                toPageNo: parseInt(toPageNo)
              });
            }
          }

          // that.setData({
          //   schemeList: res.data.data,
          // })

        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }

        var pushTime
        for (var i = 0; i < that.data.list1.length; i++) {
          pushTime = that.data.list1[i].pushTime
          that.data.list1[i].pushTime = app.dateChange(pushTime)
        }
        for (var i = 0; i < that.data.list2.length; i++) {
          pushTime = that.data.list2[i].pushTime
          that.data.list2[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list1: that.data.list1,
          list2: that.data.list2,
        })
      }
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

    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 20 || res.data.code == 26) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else if (res.data.code == 0) {
        
          app.globalData.phone = res.data.data.phone;
          app.globalData.userId = res.data.data.userId;
          app.globalData.clinicId = res.data.data.clinicId;
          app.globalData.hospitalId = res.data.data.hospitalId;
          app.globalData.hospitalName = res.data.data.hospitalName;
          app.globalData.clinicName = res.data.data.clinicName;
          that.lastPageNum();
          // app.globalData.clinicaddress = res.data.data.clinic.address;
          // app.globalData.authenticationIs = res.data.data.clinic.authenticationIs;
          // if (res.data.data.clinic.license == '' || res.data.data.clinic.license == null || res.data.data.clinic.license == undefined) {
          //   app.globalData.src = ''
          // } else {
          //   app.globalData.src = app.globalData.url + res.data.data.clinic.license
          // }
          // if (res.data.data.clinic.cover == '' || res.data.data.clinic.cover == null || res.data.data.clinic.cover == undefined) {
          //   app.globalData.src = ''
          // } else {
          //   app.globalData.srcCover = app.globalData.url + res.data.data.clinic.cover
          // }
        }
      }
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var that = this

    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/messages',
      method: 'post',
      data: {
        lookIs: 0,
        source: '',
        pn: 1,
        ps: 30,
        // orders: 'asc',
        // sorts: 'orderNo',
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          var num = res.data.data.sum.totalItemCount
          that.setData({
            num: num,
          })

        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }
      }
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
    var that = this
    that.setData({
      list1: [],
      list2: [],
    })
    if (that.data.currentTab == 1) {
      that.lastPage(0, 1, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else if (that.data.currentTab == 2) {
      that.lastPage(0, 4, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    }

    wx.stopPullDownRefresh()
  },

  // backHistory: function (e) {
  //   wx.navigateBack({

  //   })
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = parseInt(that.data.toPageNo)
    if (that.data.currentTab == 1) {
      that.lastPage(toPageNo, 1, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else if (that.data.currentTab == 2) {
      that.lastPage(toPageNo, 4, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    }
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
  }
})