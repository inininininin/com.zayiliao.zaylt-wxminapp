// pages/promoter/clinicDetail/clinicDetail.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '- 医院端 -',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['全部', '未就诊', '已就诊'],
    currentTab: 0,
    list1: [],
    status: '',
    clinicId: '',
    changeIs: '',
  },
  edit(e) {
    wx.navigateTo({
      url: '../addClinicRec/addClinicRec?typesName=修改门诊&id=' + this.data.clinicId,
    })
  },

  addPatient(e) {
    wx.navigateTo({
      url: '../addPatient/addPatient?clinicId=' + this.data.clinicId,
    })
  },
  lastPage: function (toPageNo, status, clinicId) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        status: status,
        clinicId: clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (status == '') {
            that.setData({
              totalCount: res.data.data.sum.totalCount
            })
          }
          var list1 = that.data.list1;
          var newlist1 = list1.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list1: list1,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list1: newlist1,
              toPageNo: String(toPageNo)
            });
          }
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
        that.setData({
          list1: that.data.list1,
        })
      }
    })
  },
  // 点击下拉列表
  navbarTap(e) {
    let status=''
    let  totalCount=''
    let Indexs = e.currentTarget.dataset.idx; //获取点击的下拉列表的下标
    if (Indexs == 0) {
      status = ''
      totalCount=this.data.totalCount
    } else if (Indexs == 1) {
      status = '4'
      totalCount=this.data.totalCount1
    } else if (Indexs == 2) {
      status = '1'
      totalCount=this.data.totalCount2
    }
    this.setData({
      totalCount:totalCount,
      status: status,
      list1: [],
      currentTab: e.currentTarget.dataset.idx,
    });
    this.lastPage(0, status, this.data.clinicId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    that.setData({
      clinicId: options.id
    })
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: 1,
        ps: 15,
        status: '',
        clinicId: that.data.clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            totalCount: res.data.data.sum.totalCount
          })
          var totalCount = res.data.data.sum.totalCount
          var list1 = that.data.list1;
          var newlist1 = list1.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list1: list1,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list1: newlist1,
            });
          }
          wx.request({
            url: app.globalData.url + '/c2/patient/items',
            method: 'post',
            data: {
              pn: 1,
              ps: 15,
              status: 4,
              clinicId: that.data.clinicId,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              if (res.data.code == 0) {
                var totalCount1 = parseInt(res.data.data.sum.totalCount)
                that.setData({
                  totalCount1: res.data.data.sum.totalCount,
                  totalCount2: parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount),
                  navbar: [{ 'name': '全部', 'count': that.data.totalCount }, { 'name': '已就诊', 'count': totalCount1 }, { 'name': '未就诊', 'count': parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount) }],
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
        var pushTime
        for (var i = 0; i < that.data.list1.length; i++) {
          pushTime = that.data.list1[i].pushTime
          that.data.list1[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list1: that.data.list1,
        })
      }
    })
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
                for (var i = 0; i < that.data.list1.length; i++) {
                  if (that.data.list1[i].itemId == id) {
                    console.log(that.data.list1[i].itemId)
                    that.data.list1[i].status = 4
                  }
                }
                that.setData({
                  list1: that.data.list1
                })
              } else {
                wx.showToast({
                  title: res.data.codeMsg,
                })
              }
            }
          })
        }
      }
    })
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
    var that = this
    if (that.data.changeIs == 1) {
      that.setData({
        list1: []
      })
      wx.request({
        url: app.globalData.url + '/c2/patient/items',
        method: 'post',
        data: {
          pn: 1,
          ps: 15,
          status: '',
          clinicId: that.data.clinicId,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        success: function (res) {
          if (res.data.code == 0) {
            that.setData({
              totalCount: res.data.data.sum.totalCount
            })
            var totalCount = res.data.data.sum.totalCount
            var list1 = that.data.list1;
            var newlist1 = list1.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list1: list1,
                // toPageNo: String(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              that.setData({
                list1: newlist1,
              });
            }
            wx.request({
              url: app.globalData.url + '/c2/patient/items',
              method: 'post',
              data: {
                pn: 1,
                ps: 15,
                status: 4,
                clinicId: that.data.clinicId,
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': app.globalData.cookie
              },
              success: function (res) {
                if (res.data.code == 0) {
                  var totalCount1 = parseInt(res.data.data.sum.totalCount)
                  that.setData({
                    totalCount1: res.data.data.sum.totalCount,
                    totalCount2: parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount),
                    navbar: [{ 'name': '全部', 'count': that.data.totalCount }, { 'name': '已就诊', 'count': totalCount1 }, { 'name': '未就诊', 'count': parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount) }],
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
          var pushTime
          for (var i = 0; i < that.data.list1.length; i++) {
            pushTime = that.data.list1[i].pushTime
            that.data.list1[i].pushTime = app.dateChange(pushTime)
          }
          that.setData({
            list1: that.data.list1,
          })
        }
      })
    }
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
    })
    this.lastPage(0, that.data.status, that.data.clinicId)
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: 1,
        ps: 15,
        status: '',
        clinicId: that.data.clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            totalCount: res.data.data.sum.totalCount
          })
          // var totalCount = res.data.data.sum.totalCount
          // var list1 = that.data.list1;
          // var newlist1 = list1.concat(res.data.data.items)
          // if (res.data.data.items.length == 0) {
          //   // that.setData({
          //   //   list1: list1,
          //   //   // toPageNo: String(toPageNo)
          //   // });
          //   wx.showToast({
          //     title: '数据已全部加载',
          //     // icon: 'loading',
          //     // duration: 1500
          //   })
          // } else {
          //   that.setData({
          //     list1: newlist1,
          //   });
          // }
          wx.request({
            url: app.globalData.url + '/c2/patient/items',
            method: 'post',
            data: {
              pn: 1,
              ps: 15,
              status: 4,
              clinicId: that.data.clinicId,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              if (res.data.code == 0) {
                var totalCount1 = parseInt(res.data.data.sum.totalCount)
                that.setData({
                  totalCount1: res.data.data.sum.totalCount,
                  totalCount2: parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount),
                  navbar: [{ 'name': '全部', 'count': that.data.totalCount }, { 'name': '已就诊', 'count': totalCount1 }, { 'name': '未就诊', 'count': parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount) }],
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
        var pushTime
        for (var i = 0; i < that.data.list1.length; i++) {
          pushTime = that.data.list1[i].pushTime
          that.data.list1[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list1: that.data.list1,
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.status, that.data.clinicId)
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