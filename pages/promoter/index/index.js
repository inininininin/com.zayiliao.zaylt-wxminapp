// pages/promoter/mine/mine.js
var app=getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '- 医院端 -',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    schemeList:[],
    schemeList2:[],
    schemeList3:[],
  },
  operate(e){
    wx.navigateTo({
      url: '../operate/operate',
    })
  },
  recActivity(e){
    wx.navigateTo({
      url: '../recActivity/recActivity',
    })
  },
  activity(e){
    wx.navigateTo({
      url: '../../newActivity/newActivity?type='+e.currentTarget.dataset.id,
    })
  },
  lookMoreGood(e){
    wx.navigateTo({
      url: '../../out/highQualityCase/highQualityCase',
    })
  },
  lastPage: function (toPageNo, kw, pageSize) {
    var that = this
    toPageNo++

    wx.request({
      url: app.globalData.url + '/c2/article/items',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         hospitalId: app.globalData.hospitalId,
        pn: toPageNo,
        ps: pageSize,
        kw: kw,
        sorts: 'addTime',
        orders: 'desc'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            if (toPageNo == 1) {
              wx.showToast({
                title: '尚无运营精选',
                icon: 'loading',
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
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
  },
  bygl: function (e) {
    wx.navigateTo({
      url: '../../sourceManagement/sourceManagement',
    })
  },
  qdmz: function (e) {
    wx.redirectTo({
      url: '../clinic/clinic',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.url + '/login-refresh',
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 20 || res.data.code == 26){
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }else if (res.data.code == 0 ){
          app.globalData.phone = res.data.data.phone;
                       app.globalData.userId = res.data.data.userId;
                       app.globalData.hospitalId = res.data.data.hospitalId;
                       app.globalData.hospitalName = res.data.data.hospitalName;
                      //  app.globalData.hospitaladdress = res.data.data.hospital.address;
                      //  app.globalData.authenticationIs = res.data.data.hospital.authStatus;
                      //  if (res.data.data.hospital.license == '' || res.data.data.hospital.license == null || res.data.data.hospital.license == undefined) {
                      //    app.globalData.src = ''
                      //  } else {
                      //    app.globalData.src = app.globalData.url + res.data.data.hospital.license
                      //  }
                      //  if (res.data.data.hospital.cover == '' || res.data.data.hospital.cover == null || res.data.data.hospital.cover == undefined) {
                      //   app.globalData.srcCover = ''
                      // } else {
                      //   app.globalData.srcCover = app.globalData.url + res.data.data.hospital.cover
                      // }
        }
      }
    })
    that.lastPage(0,'',3);
    wx.request({
      url: app.globalData.url + '/c2/project/items',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: 1,
        ps: 3,
        // kw: kw,
        hospitalId: app.globalData.hospitalId,
        sorts: 'addTime',
        orders: 'desc'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          var schemeListArr = that.data.schemeList3;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList3: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              schemeList3: newSchemeListArr,
            });
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
    wx.request({
      url: app.globalData.url + '/c2/activity/items',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: 1,
        ps: 1,
        // kw: kw,
        hospitalId: app.globalData.hospitalId,
        sorts: 'addTime',
        orders: 'desc'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            res.data.data.items[i].cover=app.cover(res.data.data.items[i].cover)
          }
          var schemeListArr = that.data.schemeList2;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList2: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              schemeList2: newSchemeListArr,
            });
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
  },
  mine(e) {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  clinic(e) {
    wx.redirectTo({
      url: '../clinic/clinic',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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

  }
})