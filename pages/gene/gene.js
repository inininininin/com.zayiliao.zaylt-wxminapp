// pages/out/geneDetection/geneDetection.js
var app = getApp()
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['全部', '未采样本', '未出报告', '已出报告'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,

    schemeList: [],
    status: '',
    kw: '',
  },
  index(e) {
    wx.redirectTo({
      url: '../index/index',
    })
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
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    var status
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    if (Indexs == 0) {
      status = ''
    } else if (Indexs == 1) {
      status = '0'
    } else if (Indexs == 2) {
      status = '1,2'
    } else if (Indexs == 3) {
      status = '3'
    }
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      schemeList: [],
      status: status,
    });
    this.lastPage(0, '', status)
  },

  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      schemeList: []
    })
    that.lastPage(0, '', that.data.status)
  },
  lastPage: function (toPageNo, kw, status) {
    var that = this
    toPageNo++

    wx.request({
      url: app.globalData.url + '/client2/geneTest/samplePacks',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
         pn: toPageNo,
        ps: 10,
        kw: kw,
        status: status,
        sorts: 'addTime',
        orders: 'desc',
        // clinicId: app.globalData.clinicId,
        hospitalId:app.loginRefresh.hospitalId
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var addTime
          for (var i = 0; i < res.data.data.items.length; i++) {
            addTime = res.data.data.items[i].addTime
            res.data.data.items[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
          }
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
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
      schemeList: [],
    })
    that.lastPage(0, that.data.kw, that.data.status)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.kw, that.data.status)
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