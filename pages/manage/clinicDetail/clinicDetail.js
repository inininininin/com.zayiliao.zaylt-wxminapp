// pages/manage/clinicDetail/clinicDetail.js
var app = getApp()
var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['推送病源', '门诊简介'],
    currentTab: 0,
    navBg:"#f2f2f2",
    imgalist: [],
    list:[],
    detail:[],
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    if (e.currentTarget.dataset.idx==0){
      this.setData({
        navBg:'#f2f2f2'
      })
    }else{
      this.setData({
        navBg: '#fff'
      })
    }
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  lastPage: function (toPageNo) {
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
        clinicId: that.data.clinicId,
        // hospitalId: that.data.hospitalId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (toPageNo == 1 && res.data.data.items.length == 0) {
            that.setData({
              number: 0
            });
          } else {
            that.setData({
              number: 1
            });
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: list,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list: newlist,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }

        var pushTime
        for (var i = 0; i < that.data.list.length; i++) {
          pushTime = that.data.list[i].pushTime
          that.data.list[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list: that.data.list,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var clinicId=options.id
    that.setData({
      clinicId: clinicId
    })
    that.lastPage(0)

    wx.request({
      url: app.globalData.url + '/c2/clinic/item',
      method: 'post',
      data: {
        itemId: that.data.clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success:function(res){
        if(res.data.code==0){
          var addTime = res.data.data.addTime
          res.data.data.addTime = app.dateChange(addTime)
          var license = res.data.data.license
          if (license != null && license != undefined && license!=''){
            license = license.split(',')[0]
            if (license.slice(0, 1) != 'h') {
              res.data.data.license = app.globalData.url + license
            } else {
              res.data.data.license = license
            }
            var imgalist = []
            imgalist.push(res.data.data.license)
          }else{
            var imgalist = []
          }
          
         
          that.setData({
            detail:res.data.data,
            imgalist: imgalist
          })
          console.log(that.data.imgalist)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      height: wx.getSystemInfoSync().windowHeight
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
      list: [],
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