// pages/ZJCQxshopSearch/ZJCQxshopSearch.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    showList:[],
    kw:"",
    toPageNo:0,
    qxData: [],
    count: 0,
  },
  cool(e){
    console.log(123)
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
              that.data.showList[i].countInShoppingcart++;
            }
          }
          that.setData({
            showList: that.data.showList,
          })
        } else {
          wx.showModal({
            showCancel: false,
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
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart--;
              }
            }
            that.setData({
              showList: that.data.showList,
              qixienum: that.data.qixienum - 1
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
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
                that.data.showList[i].countInShoppingcart--;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
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
    console.log(val)
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
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
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
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
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
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
              qixienum: that.data.qixienum - 1
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    }
  },
  makesureAdd: function (e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var count = that.data.count;
    console.log(num)
    if (count <= num) {
      if (count == 0) {
        that.setData({
          count: num,
          totalCountInShoppingcart: that.data.totalCountInShoppingcart + 1
        })
      }
      var val = num - count
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/move',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: val,
          deviceId: that.data.qxData.deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {

          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (count == 0 && num == 0) {
    } else if (count != 0 && num < count) {
      if (num != 0) {
        wx.request({
          url: app.globalData.url + '/c/procurement/shoppingcart/sub',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            'cookie': app.globalData.cookie
          },
          data: {
            token: app.globalData.token,
            count: val,
            deviceId: that.data.qxData.deviceId,
          },
          method: 'post',
          success: function (res) {
            wx.hideToast()
            if (res.data.code == 0) {
            } else {
              wx.showModal({
                showCancel: false,
                title: res.data.codeMsg
              })
            }
          }
        });
      } else {
        wx.request({
          url: app.globalData.url + '/c/procurement/shoppingcart/remove',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            'cookie': app.globalData.cookie
          },
          data: {
            token: app.globalData.token,
            deviceId: that.data.qxData.deviceId,
          },
          method: 'post',
          success: function (res) {
            wx.hideToast()
            if (res.data.code == 0) {
              that.setData({
                count: 0,
                totalCountInShoppingcart: that.data.totalCountInShoppingcart - 1
              })
            } else {
              wx.showModal({
                showCancel: false,
                title: res.data.codeMsg
              })
            }
          }
        });
      }
    }
    that.setData({
      pop: 0,
    })
  },
  navigator1(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  input(e){
    var kw=e.detail.value
    this.setData({
      showList:[],
      kw: kw,
    })
    this.lastPage(0,kw)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage(0,'')
  },
  lastPage(toPageNo,kw ){
    var that = this
    toPageNo++
    wx.request({
      url: app.globalData.url + '/c/procurement/devicelist',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: toPageNo ,
        ps: 15,
        kw: kw,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].cover && res.data.data.items[i].cover.slice(0, 1) != 'h') {
              // res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
              res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
            }
          }
          var schemeListArr = that.data.showList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            if (toPageNo == 1) {
              wx.showToast({
                title: '当前没有器械',
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              wx.showToast({
                title: '数据已全部加载',
                // icon: 'loading',
                // duration: 1500
              })
            }

          } else {
            
            that.setData({
              showList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
          var showList = that.data.showList
         
          that.setData({
            showList: showList,
          });
          
        } else {
          wx.showModal({
            showCancel: false,
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
    
  },
  backHistory: function (e) {
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
      showList: [],
    })
    that.lastPage(0, that.data.kw)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.kw)
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