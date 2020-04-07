// pages/ZJCQxDetail/ZJCQxDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    totalCountInShoppingcart: '',
    movies: [],
    token: '',
    domain: '',
    title: '',
    qxdetails: '',
    pop: 0,
    qxData: [],
    count: 0,
  },
  shoppingCartList: function (e) {
    wx.navigateTo({
      url: '../ZJCOrder/ZJCOrder',
    })
  },
  addCg: function (e) {
    this.setData({
      pop: 1,
    })
  },
  close: function (e) {
    this.setData({
      pop: 0,
    })
  },
  add: function (e) {
    var that = this
    var num = e.currentTarget.dataset.num;

    var deviceId = e.currentTarget.dataset.id;
    num++;
    that.data.qxData.count++
    that.setData({
      qxData: that.data.qxData,
    })
  },
  del: function (e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    num--;
    that.data.qxData.count--
    that.setData({
      qxData: that.data.qxData,
    })
  },
  inputVal: function (e) {
    var that = this
    var val = e.detail.value
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (val > num) {
      var count = val - num
      that.data.qxData.count = that.data.qxData.count + count
      that.setData({
        qxData: that.data.qxData,
      })
    } else if (val < num && val > 0) {
      var count = num - val
      that.data.qxData.count = that.data.qxData.count - count
      that.setData({
        qxData: that.data.qxData,
      })
    } else if (val == 0) {
      that.data.qxData.count = 0
      that.setData({
        qxData: that.data.qxData,
      })
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
        url: app.globalData.url  + '/c/procurement/shoppingcart/move',
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
          url: app.globalData.url  + '/c/procurement/shoppingcart/sub',
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
          url: app.globalData.url  + '/c/procurement/shoppingcart/remove',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count = options.count;
    var that = this;
    var deviceId = options.deviceId
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    console.log(domain)

    that.setData({
      token: token,
      domain: domain,
      count: count,
    })
    wx.request({
      url: app.globalData.url  + '/c/procurement/deviceinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        deviceId: deviceId,
      },
      async: true,
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var detailBdId = res.data.data.detailBdId
          res.data.data.count = count
          var picBlob = res.data.data.leadPics.split(',')
          for (var i = 0; i < picBlob.length;i++){
            if (picBlob[i].slice(0,1)!='h'){
              picBlob[i] = app.globalData.url + picBlob[i]
            }           
          }
          that.setData({
            qxData: res.data.data,
            title: res.data.data.name,
            movies: picBlob,
            totalCountInShoppingcart: res.data.data.totalCountInShoppingcart
          })
          wx.request({
            url: app.globalData.url + '/other/bigtxt/' + detailBdId + '/' + detailBdId,
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              token: app.globalData.token,
              deviceId: deviceId,
            },
            async: true,
            method: 'get',
            success: function (res) {
              console.log(res.data)
              // that.setData({
              //   qxdetails: res.data
              // })
              var info = res.data;
              WxParse.wxParse('info', 'html', info, that, 5);
            }
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