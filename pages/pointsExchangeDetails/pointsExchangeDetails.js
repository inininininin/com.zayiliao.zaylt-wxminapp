// pages/ZJCQxDetail/ZJCQxDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
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
    payExchangepoint: '',
    commodityId: '',
    cover:''
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
        url: app.globalData.url + '/c/procurement/shoppingcart/move',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
           count: val,
          deviceId: that.data.qxData.deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {

          } else {
            wx.showToast({
              title:  res.data.codeMsg,
              icon:'none'
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
             count: val,
            deviceId: that.data.qxData.deviceId,
          },
          method: 'post',
          success: function (res) {
            wx.hideToast()
            if (res.data.code == 0) {
            } else {
              wx.showToast({
                title:  res.data.codeMsg,
                icon:'none'
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
              wx.showToast({
                title:  res.data.codeMsg,
                icon:'none'
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
    var that = this;
    var deviceId = options.id
    console.log(deviceId)

    that.setData({
      token: app.globalData.token,
      domain: app.globalData.url,
    })
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/commoditydetail',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         commodityId: deviceId,
      },
      async: true,
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          res.data.data.cover=app.cover(res.data.data.cover)
        //   var cover=res.data.data.cover;
        //  var coverBlob=cover.split(',');
        //   for(var i=0;i<coverBlob.length;i++){
        //     if (coverBlob[i].slice(0,1)!='h'){
        //       // coverBlob[i] = app.globalData.url+coverBlob[i]
        //       coverBlob[i]=app.cover(coverBlob[i])
        //     }
        //   }
          that.setData({
            // movies: coverBlob,
            cover:res.data.data.cover,
            intro:res.data.data.intro,
            title: res.data.data.name,
            payExchangepoint: res.data.data.payExchangepoint,
            commodityId: res.data.data.commodityId
          })
          console.log(that.data.movies)
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