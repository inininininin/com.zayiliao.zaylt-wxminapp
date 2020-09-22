// pages/framework/framework.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '运营手册',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    showIsThis: false,
    list: [],
    listNext: [],
  },
  edit(e) {
    wx.navigateTo({
      url: '../frameworkDate/frameworkDate',
    })
  },
  showIsThis(e) {
    wx.navigateTo({
      url: '../frameworkZj/frameworkZj?sectionid=&id=' + e.currentTarget.dataset.id+'&titlename='+e.currentTarget.dataset.name,// + '&name=' + e.currentTarget.dataset.name + '&count=' + e.currentTarget.dataset.count + '&lowercount=' + e.currentTarget.dataset.lowercount,
    })
    // var that = this
    // for (var i in that.data.list) {
    //   if (e.currentTarget.dataset.id == that.data.list[i].operatingManualId) {
    //     that.data.list[i].showIsThis = !that.data.list[i].showIsThis
    //     that.data.list[i].showIsThis = that.data.list[i].showIsThis
    //   } else {
    //     that.data.list[i].showIsThis = false
    //   }
    // }
    // that.setData({
    //   list: that.data.list
    // })
  },
  nextPage(e) {
    if (e.currentTarget.dataset.lowercount == 0) {
      wx.navigateTo({
        url: '../frameworkDetailChange/frameworkDetailChange?sectionid=' + e.currentTarget.dataset.sectionid + '&id=' + e.currentTarget.dataset.id,
      })
    } else {
      // + e.currentTarget.dataset.id 
      wx.navigateTo({
        url: '../frameworkZj/frameworkZj?sectionid=' + (e.currentTarget.dataset.sectionid||'') + '&id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&count=' + e.currentTarget.dataset.count + '&lowercount=' + e.currentTarget.dataset.lowercount,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var that = this
    wx.request({
      url: app.globalData.url + '/operating-manual/items',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        hospitalId: app.globalData.hospitalId,
        pn: 1,
        ps: 30,
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var list = res.data.data.rows
          that.setData({
            list: list
          })
          that.outer(list.length, list)
          
          console.log(that.data.list)
          that.setData({
            list: that.data.list,
          })
        } else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    })
  },

  outer: function(value, list) {
    var that=this
    var result = [];
    for (var i = 0; i < value; i++) {
      result[i] = function(num) {
          wx.request({
            url: app.globalData.url + '/operating-manual/sections',
            method: 'get',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie,
              'operatingManualId': list[num].operatingManualId,
            },
            data: {
              operatingManualId: list[num].operatingManualId,
              pn: 1,
              ps: 30,
            },
            success: function(res) {
              if (res.data.code == 0) {
                for (var i in list) {
                  list[num].showIsThis=false
                  list[num].listNext = res.data.data.rows
                  list[num].number = res.data.data.rows.length
                }
                that.setData({
                  list: that.data.list,
                })
              } else {
                wx.showToast({
                  title:  res.data.codeMsg,
                  icon:'none'
                })
              }
            }
          })
      
        // return (list); // 此时访问的num，是上层函数执行环境的num，数组有10个函数对象，每个对象的执行环境下的number都不一样
        // }
      }(i)   
    }
    // that.setData({
    //   list: that.data.list,
    // })
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})