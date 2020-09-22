// pages/frameworkDetail/frameworkDetail.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '服务内容',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    list: [],
    changeIs:0,
  },
  detail(e) {
    wx.navigateTo({
      url: '../frameworkIntro/frameworkIntro?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  edit(e) {
    wx.navigateTo({
      url: '../frameworkEdit/frameworkEdit?id=' + this.data.operatingManualSectionId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      operatingManualId: options.id,
      operatingManualSectionId: options.sectionid
    })
    this.lastPage(0)
  },
  lastPage: function(toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/'+app.globalData.yyType+'/operating-manual-section-tracks',
      method: 'get',
      data: {
        pn: toPageNo,
        ps: pageSize,
        operatingManualId: that.data.operatingManualId,
        operatingManualSectionId: that.data.operatingManualSectionId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function(res) {
        if (res.data.code == 0) {
          var addTime
          // if (res.data.data.rows[i].image) {
          //   for (var i in res.data.data.rows[i].image.split(',')) {
          //     if (res.data.data.rows[i].image.split(',')[i].slice(0, 1) != 'h') {
          //       res.data.data.rows[i].image.split(',')[i] = app.globalData.url + res.data.data.rows[i].image.split(',')[i]
          //     }
          //   }
          // }
          for (var i = 0; i < res.data.data.rows.length; i++) {
            addTime = res.data.data.rows[i].addTime
            res.data.data.rows[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            if (res.data.data.rows[i].video) {
              var image = res.data.data.rows[i].video.split(',')
              var imgArr = []
              for (var r in image) {
                if (image[r].slice(0, 1) != 'h') {

                  if (image[r].split('.')[1] == 'jpg' || image[r].split('.')[1] == 'png' || image[r].split('.')[1] == 'jpeg') {
                    imgArr.push({
                      'src': app.globalData.url + image[r],
                      'type': '1'
                    })
                  } else {
                    imgArr.push({
                      'src': app.globalData.url + image[r],
                      'type': '2'
                    })
                  }
                } else {
                  imgArr.push(image[r])
                }
              }
              res.data.data.rows[i].imgArr = imgArr
            }
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.rows)

          if (res.data.data.rows.length == 0) {
            that.setData({
              list: list,
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
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
            url: '../newLogin/newLogin',
          })
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },
  backHistory: function(e) {
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.changeIs == 1) {
      this.setData({
        list: [],
      })
      this.lastPage(0)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index'
    } else {
      var path = '/pages/out/index/index'
    }
    return {
      title: '欢迎使用共享医联体小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://zaylt.njshangka.com/favicon.ico', //分享图片
      success: function(res) {},
      fail: function(res) {}
    }
  }
})