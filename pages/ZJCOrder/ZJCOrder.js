// pages/ZJCOrder/ZJCOrder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '采购清单表',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    addressIf: '1',
    domain: '',
    token: '',
    showList: [],
    addressIf: '',
    addressList: [],
  },
  add: function (e) {
    var that = this
    var num = e.currentTarget.dataset.num;
    if (num == 0) {
      that.setData({
        qixienum: that.data.qixienum + 1
      })
    }
    var deviceId = e.currentTarget.dataset.id;
    num++;
    wx.request({
      url: app.globalData.url + '/c/procurement/shoppingcart/move',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        count: 1,
        deviceId: deviceId,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for (var i = 0; i < that.data.showList.length; i++) {
            if (that.data.showList[i].deviceId == deviceId) {
              that.data.showList[i].count++;
            }
          }
          that.setData({
            showList: that.data.showList,
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });

  },
  del: function (e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    num--;
    if (num == 0) {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            that.listNum();
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    } else {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: 1,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].count--;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    }


  },
  inputVal: function (e) {
    var that = this
    var val = e.detail.value
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (val > num) {
      var count = val - num
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: count,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].count = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    } else if (val < num && val > 0) {
      var count = num - val
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: count,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].count = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    } else if (val == 0) {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            that.listNum();
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  listNum: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/c/procurement/shoppingcart/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: 1,
        ps: 100,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for(var i=0;i<res.data.data.items.length;i++){
            // if (res.data.data.items[i].deviceCover.slice(0,1)!='h'){
            //   res.data.data.items[i].deviceCover = app.globalData.url+res.data.data.items[i].deviceCover
            // }
            res.data.data.items[i].deviceCover=app.cover(res.data.data.items[i].deviceCover)
          }
          that.setData({
            showList: res.data.data.items,
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    that.setData({
      token: token,
      domain: domain,
    })
    that.listNum();


  },
  submit: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/c/procurement/orderconfirmforall',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var receiverId = res.data.data.receiver.receiverId
          wx.request({
            url: app.globalData.url + '/c/procurement/orderforall',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              token: app.globalData.token,
              param: "{receiverId:" + receiverId + "}"
            },
            method: 'post',
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                wx.showLoading({
                  title: '下单成功',
                })
                wx.navigateBack({
                  delta: 1,
                })
              } else {
                wx.showToast({
                  title: res.data.codeMsg,
                  icon:'none'
                })
              }
            }
          });
        } else {
          wx.showToast({
            title: res.data.codeMsg,
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
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/c/procurement/receivers',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: 1,
        ps: 1,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            addressIf: res.data.data.totalCount,
          })
          if (res.data.data.items != '' && res.data.data.items != null && res.data.data.items != undefined) {
            var address1 = res.data.data.items[0].address.split('%$')[0]
            var address2 = res.data.data.items[0].address.split('%$')[1]
            res.data.data.items[0].address1 = address1
            res.data.data.items[0].address2 = address2
            that.setData({
              addressList: res.data.data.items[0]
            })

          }
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });
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
  }
})