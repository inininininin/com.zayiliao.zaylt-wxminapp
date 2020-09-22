// pages/ZJCSetaddress/ZJCSetaddress.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '地址管理',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    addressList: [],
    name:'',
    tel:'',
    address1:'',
    address2:'',
    receiverId:'',
    addressIf:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  that=this
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    that.setData({
      token: token,
      domain: domain,
    })
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/receivers',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        // token: app.globalData.token,
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
              receiverId: res.data.data.items[0].receiverId,
              name: res.data.data.items[0].name,
              tel: res.data.data.items[0].tel,
              address1: res.data.data.items[0].address1,
              address2: res.data.data.items[0].address2,
              // addressList: res.data.data.items[0]
            })

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
  name:function(e){
    this.setData({
        name:e.detail.value
      })
  },
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  address1: function (e) {
    this.setData({
      address1: e.detail.value
    })
  },
  address2: function (e) {
    this.setData({
      address2: e.detail.value
    })
  },
  modify:function(e){
    var that=this
    if(that.data.address2==''||that.data.address1==''||that.data.name==''||that.data.tel==''){
      wx.showToast({
        title: '请输入完整信息',
        icon:'none'
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/receiveralter',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        receiverId: that.data.receiverId,
        name: that.data.name,
        tel: that.data.tel,
        address: that.data.address1 + "%$" + that.data.address2,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
            wx.navigateBack({
              url:'../ZJCOrder/ZJCOrder'
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
  add: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/receiveradd',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        name: that.data.name,
        tel: that.data.tel,
        address: that.data.address1 + "%$" + that.data.address2,
        defaultIf:1,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.navigateBack({
            url: '../ZJCOrder/ZJCOrder'
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