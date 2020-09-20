// pages/out/hospitalImage/hospitalImage.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '4',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['医院介绍', '特色科室'],
    currentTab: 0,
    list:[],
  },
  // 特色科室
  specialOffice(e){
    wx.navigateTo({
      url: '../../specialOffice/specialOffice?id='+e.currentTarget.dataset.id,
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(this.data.currentTab)
  },
phone(e){
  wx.makePhoneCall({
    phoneNumber: this.data.detail.tel //仅为示例，并非真实的电话号码
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if(options.currentTab){
      that.setData({
        currentTab:options.currentTab
      })
      console.log(this.data.currentTab)
    }
   
    wx.request({
      url: app.globalData.url + '/c2/hospital/item',
      method: 'post',
      data: {
         itemId: app.globalData.hospitalId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          res.data.data.cover=app.cover(res.data.data.cover)
          if (res.data.data.license){
            var license = res.data.data.license.split(',')
            for (var i = 0; i < license.length; i++) {
              license[i]=app.cover(license[i])
            }
          }
        
          that.setData({
            detail: res.data.data,
            license: res.data.data.license
          })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/c2/office/items',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          for(var i=0;i<res.data.data.items.length;i++){
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          
         
          that.setData({
            list: res.data.data.items,
          })
          console.log(that.data.list)
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg
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