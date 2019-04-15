// pages/ZJCOrder/ZJCOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '采购清单表',
    statusBarHeight: '',
    titleBarHeight: '',
    addressIf:'1',
    domain:'',
    token:'',
    showList:[],
    addressIf:'',
    addressList:[],
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
      url: that.data.domain + '/zaylt/c/procurement/shoppingcart/move',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
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
          wx.showModal({
            title: res.data.codeMsg
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
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            that.listNum();
          } else {
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      });
    } else {
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
            wx.showModal({
              title: res.data.codeMsg
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
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val < num && val > 0) {
      var count = num - val
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val == 0) {
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            that.listNum();
          } else {
            wx.showModal({
              title: res.data.codeMsg
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
      url: that.data.domain + '/zaylt/c/procurement/shoppingcart/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
        pn: 1,
        ps: 100,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            showList: res.data.data.items,
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
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
  submit:function(e){
    var that=this
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/orderconfirmforall',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var receiverId = res.data.data.receiver.receiverId
          wx.request({
            url: that.data.domain + '/zaylt/c/procurement/orderforall',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
              token: that.data.token,
              param: "{receiverId:" + receiverId+"}"
            },
            method: 'post',
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                wx.showLoading({
                  title: '下单成功',
                })
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1,
                    })
                  },1000)
              } else {
                wx.showModal({
                  title: res.data.codeMsg
                })
              }
            }
          });
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })

     
  },

  backHistory: function (e) {
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/receivers',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
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
          wx.showModal({
            title: res.data.codeMsg
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

  }
})