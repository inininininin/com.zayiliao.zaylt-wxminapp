// pages/recPeopleSearch/recPeopleSearch.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navtitle: '人员列表',
    schemeList: [],
    kw:'',
    changeIs: ''
  },
  lookDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../recPeopleDetail/recPeopleDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage(0,'')
  },
  searchKey(e){
    this.setData({
      schemeList: [],
    })
    this.lastPage(0, e.detail.value)
  },
  lastPage: function (toPageNo,kw) {
    var that = this
    toPageNo++
    wx.request({
      url: app.globalData.url + '/hospital/def/hospital-operator-users',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: toPageNo,
        ps: 15,
        kw:kw,
        type: 1
      },
      method: 'get',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.rows)
          if (res.data.data.rows.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
          that.setData({
            schemeList: that.data.schemeList,
          })
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      changeIs: this.data.changeIs
    });
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.changeIs == 1) {
      this.setData({
        schemeList: [],
      })
      this.lastPage(0, this.data.kw)
    }
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
      schemeList: [],
    })
    that.lastPage(0,that.data.kw)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.kw)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})