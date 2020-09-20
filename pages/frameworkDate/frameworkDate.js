// pages/frameworkDate/frameworkDate.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    dataList: [],
    swiperCurrent: 0,
    items: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    dateItems: {},
    myVideoSrcIs: false,
  },
  swiperChange(e) {
    for (var i in this.data.dataList) {
      if (e.detail.current == i) {
        var navtitle = this.data.dataList[i].year
      }
    }
    this.setData({
      swiperCurrent: e.detail.current,
      navtitle: navtitle,
    })
    // console.log(1)
    wx.setNavigationBarTitle({
      title: ''+this.data.navtitle,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var dataList = this.data.dataList
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var thisYear = date.getFullYear();
    var thisMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    console.log(thisYear)
   
    for (var i = 24168; i < 24420; i = i + 6) {
      var monthes = i % 12 + 1
      var number = (i - 24168) / 6

      if ((i % 12) <= 5) {
        var month = []
        for (var r = 1; r < 7; r++) {
          if (r == thisMonth && thisYear == parseInt(i / 12)) {
            month.push({ 'month': r, 'active': 'active' })
            this.setData({
              navtitle: thisYear,
              swiperCurrent: number
            })
            console.log(thisYear)

          } else {
            month.push({ 'month': r, 'active': 'noactive' })
          }
        }
        dataList.push({ 'year': parseInt(i / 12), 'month': month })
      } else {
        var month = []
        for (var r = 7; r < 13; r++) {
          if (r == thisMonth && thisYear == parseInt(i / 12)) {
            month.push({ 'month': r, 'active': 'active' })
            this.setData({
              navtitle: thisYear,
              swiperCurrent: number
            })

          } else {
            month.push({ 'month': r, 'active': 'noactive' })
          }
        }
        dataList.push({ 'year': parseInt(i / 12), 'month': month })
      }
    }
    console.log(dataList)
    this.setData({
      dataList: dataList,
      navtitle: thisYear,
    })
    console.log(this.data.navtitle)
    // debugger
    wx.setNavigationBarTitle({
      title: ''+this.data.navtitle,
    })
    var addTimeFrom = Date.parse(new Date(thisYear + '/' + thisMonth + '/01 00:00:00'))
    var addTimeTo = Date.parse(new Date(thisYear + '/' + (parseInt(thisMonth) + 1) + '/01 00:00:00')) - 1
    console.log(addTimeFrom)
    this.setData({
      addTimeFrom: addTimeFrom,
      addTimeTo: addTimeTo
    })
    this.lastPage(0, addTimeFrom, addTimeTo)
  },
  year(e) {
    var year = ''
    this.setData({
      dateItems: {},
    })
    for (var i in this.data.dataList) {
      if (this.data.dataList[i].year == e.currentTarget.dataset.year) {
        var months = this.data.dataList[i].month
        for (var r in months) {
          if (months[r].month == e.currentTarget.dataset.month) {
            months[r].active = 'active'
          } else {
            months[r].active = 'noactive'
          }
        }
      } else {
        var months = this.data.dataList[i].month
        for (var r in months) {
          months[r].active = 'noactive'
        }
      }
    }
    var addTimeFrom = Date.parse(new Date(e.currentTarget.dataset.year + '/' + e.currentTarget.dataset.month + '/01 00:00:00'))
    var addTimeTo = Date.parse(new Date(e.currentTarget.dataset.year + '/' + (parseInt(e.currentTarget.dataset.month) + 1) + '/01 00:00:00')) - 1
    this.setData({
      addTimeFrom: addTimeFrom,
      addTimeTo: addTimeTo,
      dataList: this.data.dataList,
    })
    this.lastPage(0, addTimeFrom, addTimeTo)
  },
  lastPage: function (toPageNo, addTimeFrom, addTimeTo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/operating-manual/section-tracks',
      method: 'get',
      data: {
        pn: toPageNo,
        ps: pageSize,
        hospitalId: app.globalData.hospitalId,
        addTimeFrom: addTimeFrom,
        addTimeTo: addTimeTo,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          var items = that.data.items;
          var newlist = items.concat(res.data.data.rows)
          var addTime
          var arr = [];
          var dateItems = that.data.dateItems
          for (var i in res.data.data.rows) {
            addTime = res.data.data.rows[i].addTime
            res.data.data.rows[i].addTime = utils.formatTime(addTime / 1000, 'M月D日');
            res.data.data.rows[i].time = utils.formatTime(addTime / 1000, 'h:m');
            var date = res.data.data.rows[i].addTime
            if (!dateItems[date])
              dateItems[date] = [];
            dateItems[date].push(res.data.data.rows[i])
          }
          that.setData({
            items: newlist,
            dateItems: dateItems
          })

          if (res.data.data.rows.length == 0) {
            that.setData({
              items: items,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              items: newlist,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
        that.setData({
          items: that.data.items,
        })
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
    var that = this
    that.setData({
      dateItems: {},
    })
    this.lastPage(0, that.data.addTimeFrom, that.data.addTimeTo)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.addTimeFrom, that.data.addTimeTo)
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