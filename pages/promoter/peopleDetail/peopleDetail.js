// pages/recPeopleDetail/recPeopleDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navtitle: '人员列表',
    schemeList: [],
    password: '',
    name: '',
    remark: '',
    phone: '',
    hospitalUserId: '',
    detail: [],
    showIs: false,
    showIsOne: false,
    password: '',
    name: '',
    phone: '',
    account: '',
    remark: '',
    array: [],
    index: 0,
    showIsTwo: false,
    hospitalUserIdNew: '',
    changeClinicId: '',
    typeIs: '',
    clinicNum: 0,
  },
  bindPickerChange: function (e) {
    var hospitalUserIdNew = ''
    for (var i in this.data.array) {
      if (i == e.detail.value) {
        hospitalUserIdNew = this.data.array[i].hospitalUserId
      }
    }
    this.setData({
      index: e.detail.value,
      hospitalUserIdNew: hospitalUserIdNew
    })
  },
  makeSure(e) {
    var that = this
    if (that.data.typeIs == 1) {
      var param = '?hospitalClinicId=' + that.data.changeClinicId + '&expectedRowCount=1'
      wx.request({
        url: app.globalData.url + '/hospital/operator/hospital-clinics-alter' + param,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          hospitalUserIdNew: that.data.hospitalUserIdNew,
        },
        method: 'post',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              that.setData({
                showIs: false,
                showIsOne: false,
                showIsTwo: false,
                schemeList: [],
              })
              that.lastPage(0)
            }, 500)
          } else {
            wx.showToast({
              title:  res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    } else {
      var param = '?hospitalUserId=' + that.data.hospitalUserId + '&expectedRowCount=' + that.data.clinicNum
      wx.showModal({
        title: '全部门诊转移',
        content: '该推广人名下共有' + that.data.clinicNum + '门诊，是否确认转移？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.url + '/hospital/operator/hospital-clinics-alter' + param,
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': app.globalData.cookie
              },
              data: {
                hospitalUserIdNew: that.data.hospitalUserIdNew,
              },
              method: 'post',
              success: function (res) {
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '修改成功',
                  })
                  setTimeout(function () {
                    that.setData({
                      showIs: false,
                      showIsOne: false,
                      showIsTwo: false,
                      schemeList: [],
                    })
                    that.lastPage(0)
                  }, 500)
                } else {
                  wx.showToast({
                    title:  res.data.codeMsg,
                    icon:'none'
                  })
                }
              }
            });
          } else if (res.cancel) {
          }
        },
      })
    }

  },
  recPeople() {
    var that = this
    wx.request({
      url: app.globalData.url + '/hospital/operator/hospital-users',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        pn: 1,
        ps: 150,
        type: 1
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var array = res.data.data.rows
          that.setData({
            array: array,
            hospitalUserIdNew: that.data.hospitalUserId
          })
          for (var i in array) {
            if (array[i].hospitalUserId == that.data.hospitalUserId) {
              that.setData({
                index: i
              })
            }
          }
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
  },

  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  remark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  clinicDetail(e) {
    wx.navigateTo({
      url: '../clinicDetail/clinicDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  useNow(e) {
    var that = this
    if (that.data.name == '' || that.data.phone == '' || that.data.remark == '') {
      wx.showToast({
        title: '请填写完整表格',
        icon: 'loading'
      })
    } else {
      wx.request({
        url: app.globalData.url + '/hospital/operator/hospital-user-alter',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          type: 1,
          name: that.data.name,
          phone: that.data.phone,
          remark: that.data.remark,
          hospitalUserId: that.data.hospitalUserId,
        },
        method: 'post',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              that.setData({
                showIs: false,
                showIsOne: false,
              })
            }, 500)
          } else {
            wx.showToast({
              title:  res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    }
  },
  delete(e) {
    var that = this
    wx.showModal({
      title: '删除推广人',
      content: '该推广人名下共有' + that.data.clinicNum + '门诊，是否确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/hospital/operator/hospital-user-alter',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              del: 1,
              hospitalUserId: that.data.hospitalUserId,
            },
            method: 'post',
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '删除成功',
                })
                setTimeout(function () {
                  var pages = getCurrentPages();
                  var currPage = pages[pages.length - 1];   //当前页面
                  var prevPage = pages[pages.length - 2];  //上一个页面
                  prevPage.setData({
                    changeIs: 1
                  });
                  wx.navigateBack({
                    delta: 1
                  })
                }, 500)
              } else {
                wx.showToast({
                  title:  res.data.codeMsg,
                  icon:'none'
                })
              }
            }
          });
        } else if (res.cancel) {
        }
      },
    })
  },
  edit(e) {
    var showIs = !this.data.showIs
    var showIsOne = !this.data.showIsOne
    this.setData({
      showIs: showIs,
      showIsOne: showIsOne
    })
  },
  close(e) {
    this.setData({
      showIs: false,
      showIsOne: false,
      showIsTwo: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    that.setData({
      hospitalUserId: options.id
    })
    that.lastPage(0)

    wx.request({
      url: app.globalData.url + '/hospital/operator/hospital-clinics-sum',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        hospitalUserId: options.id
      },
      method: 'get',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            clinicNum: res.data.data.rowCount,
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          if (res.data.data.cover && res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cove = app.globalData.url + res.data.data.cove
          }
          that.setData({
            detail: res.data.data,
            name: res.data.data.nickname,
            phone: res.data.data.phone,
            remark: res.data.data.remark,
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
  },
  lastPage: function (toPageNo) {
    var that = this
    toPageNo++
    wx.request({
      url: app.globalData.url + '/hospital/operator/hospital-clinics',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        pn: toPageNo,
        ps: 15,
        hospitalUserId: that.data.hospitalUserId,
        type: 1
      },
      method: 'get',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.rows)
          if (res.data.data.rows.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
          that.setData({
            schemeList: that.data.schemeList
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  backHistory: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      changeIs: 1
    });
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
      schemeList: [],
    })
    that.lastPage(0)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
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