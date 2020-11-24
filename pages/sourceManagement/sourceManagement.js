// pages/Third/out/index/index.js
var start_clientX;
var end_clientX;
var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    num: '4',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['全部', '未就诊', '已就诊'],
    currentTab: 0,
    list2: [],
    list1: [],
    list0: [],
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
    kw: '',
  },
  makesure(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认就诊',
      content: '请确认患者就诊',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/c2/patient/confirmjiuzhen',
            method: 'post',
            data: {
              patientId: id,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 0) {
                console.log(1)
                if (that.data.currentTab == 0) {
                  for (var i = 0; i < that.data.list0.length; i++) {
                    if (that.data.list0[i].itemId == id) {
                      console.log(that.data.list0[i].itemId)
                      that.data.list0[i].status = 4
                    }
                  }
                  that.setData({
                    list0: that.data.list0
                  })
                } else if (that.data.currentTab == 1) {
                  for (var i = 0; i < that.data.list1.length; i++) {
                    if (that.data.list1[i].itemId == id) {
                      that.data.list1[i].status = 4
                    }
                  }
                  that.setData({
                    list1: that.data.list1
                  })
                }
                that.setData({
                  navbar: ['全部(' + (parseInt(that.data.num1) + parseInt(that.data.num2)) + ')', '未就诊(' + (parseInt(that.data.num1) - 1) + ')', '已就诊(' + (parseInt(that.data.num2) + 1) + ')'],
                  num1: parseInt(that.data.num1) - 1,
                  num2: parseInt(that.data.num2) + 1
                })
              } else {
                wx.showToast({
                  title: res.data.codeMsg,
                  icon: 'none'
                })
              }
            }
          })



        }
      }
    })
  },
  backHistory(e) {
    wx.navigateBack({

    })
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
    this.setData({
      list1: [],
      list2: [],
      list0: [],
    })
    that.lastPageNum(that.data.date, that.data.date2, that.data.date3, that.data.date4)
    if (that.data.currentTab == 0) {
      that.lastPage(0, '', that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else if (that.data.currentTab == 1) {
      that.lastPage(0, 1, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else {
      that.lastPage(0, 4, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    }
    that.setData({
      display: "none",
    })

  },
  search(e) {
    this.setData({
      list1: [],
      list2: [],
      list0: [],
      kw: e.detail.value,
    })
    this.lastPageNum(this.data.date, this.data.date2, this.data.date3, this.data.date4)
    console.log(this.data.kw)
    if (this.data.currentTab == 1) {
      this.lastPage(0, 1, this.data.date, this.data.date2, this.data.date3, this.data.date4)
    } else if (this.data.currentTab == 2) {
      this.lastPage(0, 4, this.data.date, this.data.date2, this.data.date3, this.data.date4)
    } else {
      this.lastPage(0, '', this.data.date, this.data.date2, this.data.date3, this.data.date4)
    }
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
    if (start_clientX - end_clientX > 200) {
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
      list0: [],
      // date: '开始时间',
      // date2: '结束时间',
      // date3: '开始时间',
      // date4: '结束时间',
    })
    if (e.currentTarget.dataset.idx == 1) {
      this.lastPage(0, 1, this.data.date, this.data.date2, this.data.date3, this.data.date4)

    } else if (e.currentTarget.dataset.idx == 2) {
      this.lastPage(0, 4, this.data.date, this.data.date2, this.data.date3, this.data.date4)
    } else {
      this.lastPage(0, '', this.data.date, this.data.date2, this.data.date3, this.data.date4)
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

  /**
   * 生命周期函数--监听页面加载
   */
  lastPageNum: function (pushTimeStart, pushTimeEnd, hospitalConfirmTimeStart, hospitalConfirmTimeEnd) {
    var that = this;
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
      async: true,
      data: {
        pn: 1,
        ps: 15,
        status: 1,
        kw: that.data.kw,
        hospitalId: app.globalData.hospitalId,
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
          that.setData({
            num1: res.data.data.sum.totalCount,
          })
          wx.request({
            url: app.globalData.url + '/c2/patient/items',
            method: 'post',
            async: true,
            data: {
              pn: 1,
              ps: 15,
              status: 4,
              hospitalId: app.globalData.hospitalId,
              kw: that.data.kw,
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
                that.setData({
                  navbar: ['全部(' + (parseInt(that.data.num1) + parseInt(res.data.data.sum.totalCount)) + ')', '未就诊(' + that.data.num1 + ')', '已就诊(' + res.data.data.sum.totalCount + ')'],
                  num2: res.data.data.sum.totalCount,
                })
              } else if (res.data.code == 20 || res.data.code == 26) {
                wx.hideToast()
                wx.navigateTo({
                  url: '../newLogin/newLogin',
                })
              }
            }
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
      }
    })
  },
  onLoad: function (options) {
    this.lastPageNum(this.data.date, this.data.date2, this.data.date3, this.data.date4);
    this.lastPage(0, '', this.data.date, this.data.date2, this.data.date3, this.data.date4)
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
        kw: that.data.kw,
        hospitalId: app.globalData.hospitalId,
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
          if (toPageNo == 1) {
            that.setData({
              totalCount: res.data.data.sum.totalCount
            })
          }

          if (that.data.currentTab == 1) {

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
          } else if (that.data.currentTab == 2) {
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
          } else {
            var list0 = that.data.list0;
            var newlist0 = list0.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list0: list0,
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
                list0: newlist0,
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
            url: '../newLogin/newLogin',
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
        for (var i = 0; i < that.data.list0.length; i++) {
          pushTime = that.data.list0[i].pushTime
          that.data.list0[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list0: that.data.list0,
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
  onShow: function () {
    console.log(this.data.list0)
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
            url: '../newLogin/newLogin',
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
      list0: [],
      list1: [],
      list2: [],
    })
    if (that.data.currentTab == 1) {
      that.lastPage(0, 1, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else if (that.data.currentTab == 2) {
      that.lastPage(0, 4, that.data.date, that.data.date2, that.data.date3, that.data.date4)
    } else {
      that.lastPage(0, '', that.data.date, that.data.date2, that.data.date3, that.data.date4)
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
    } else {
      that.lastPage(toPageNo, '', that.data.date, that.data.date2, that.data.date3, that.data.date4)
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})