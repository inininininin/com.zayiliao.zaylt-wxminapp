// pages/frameworkZj/frameworkZj.js
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
    list:[],
    // listOne:[],
    // listTwo:[],
    // listThree:[],
    // showIsThis:false,
  },
  nextPageNone(e){
    wx.navigateTo({
      url: '../frameworkDetailChange/frameworkDetailChange?sectionid=' + e.currentTarget.dataset.id + '&id=' + e.currentTarget.dataset.allid,
    })
  },
  showIsThis(e){
    var that=this
    that.setData({
      showIsThis: !that.data.showIsThis,
      list: that.data.list
    })
  },
  nextPage(e) {
	  if (e.currentTarget.dataset.lowercount == 0) {
	    wx.navigateTo({
	      url: '../frameworkDetailChange/frameworkDetailChange?sectionid=' + e.currentTarget.dataset.sectionid + '&id=' + e.currentTarget.dataset.id,
	    })
	  } else {
	    // + e.currentTarget.dataset.id 
	    wx.navigateTo({
	      url: '../frameworkZj/frameworkZj?sectionid=' + e.currentTarget.dataset.id + '&id=' + this.data.operatingManualId + '&name=' + e.currentTarget.dataset.name + '&count=' + e.currentTarget.dataset.count + '&lowercount=' + e.currentTarget.dataset.lowercount,
	    })
	  }
	  
	  // if(e.currentTarget.dataset.lowercount!=0){
		 // wx.navigateTo({
		 //   url: '../frameworkZj/frameworkZj?sectionid=' + e.currentTarget.dataset.id + '&id=' + e.currentTarget.dataset.allid + '&name=' + e.currentTarget.dataset.name + '&count=' + e.currentTarget.dataset.count + '&lowercount=' + e.currentTarget.dataset.lowercount,
		 // }) 
	  // }
	
    // var that = this
    // wx.request({
    //   url: app.globalData.url + '/'+app.globalData.yyType+'/operating-manual-sections',
    //   method: 'get',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     'cookie': app.globalData.cookie
    //   },
    //   data: {
    //     operatingManualId: that.data.operatingManualId,
    //     pn: 1,
    //     ps: 30,
    //     upperId: e.currentTarget.dataset.id,
    //   },
    //   success: function (res) {
    //     wx.hideToast()
    //     if (res.data.code == 0) {
    //       var listNext = res.data.data.rows
    //       for (var i in listNext) {
    //         listNext[i].showIsThis = false
    //       }
    //       for (var i in that.data.list) {
    //         if (e.currentTarget.dataset.id == that.data.list[i].operatingManualSectionId) {
    //           that.data.list[i].showIsThis = !that.data.list[i].showIsThis
    //           that.data.list[i].showIsThis = that.data.list[i].showIsThis
    //         } else {
    //           that.data.list[i].showIsThis = false
    //         }
    //       }
    //       that.setData({
    //         list: that.data.list,
    //         listOne: listNext
    //       })
    //     } else {
    //       wx.showModal({
    //         showCancel: false,
    //         title: res.data.codeMsg
    //       })
    //     }
    //   }
    // })
  },
  nextPageThis(e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/'+app.globalData.yyType+'/operating-manual-sections',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        operatingManualId: that.data.operatingManualId,
        pn: 1,
        ps: 30,
        upperId: e.currentTarget.dataset.id,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var listNext = res.data.data.rows
          for (var i in listNext) {
            listNext[i].showIsThis = false
          }
          for (var i in that.data.listOne) {
            if (e.currentTarget.dataset.id == that.data.listOne[i].operatingManualSectionId) {
              that.data.listOne[i].showIsThis = !that.data.listOne[i].showIsThis
              that.data.listOne[i].showIsThis = that.data.listOne[i].showIsThis
            } else {
              that.data.listOne[i].showIsThis = false
            }
          }
          that.setData({
            listOne: that.data.listOne,
            listTwo: listNext
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var operatingManualId=options.id
    var upperId=options.sectionid
    var name = options.name
    var count = options.count
    var lowercount = options.lowercount
    that.setData({
      operatingManualId: operatingManualId,
      upperId: upperId,
      name:name,
      count: count,
      lowercount: lowercount,
    })
    wx.request({
      url: app.globalData.url + '/'+app.globalData.yyType+'/operating-manual-sections',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        hospitalId: app.globalData.hospitalId,
        pn: 1,
        ps: 30,
        operatingManualId: operatingManualId,
        upperId: upperId
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var list = res.data.data.rows
          that.setData({
            list:list
          })
          // for (var i in list) {
          //   list[i].showIsThis = false
          // }
          console.log(that.data.list)
        } else {
          wx.showModal({
            showCancel: false,
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

  }
})