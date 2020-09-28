// pages/out/geneDetail/geneDetail.js

var app = getApp()
var utils = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '检测盒详情',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    line1: 1,
    line2: 2,
    line3: 2,
    line4: 2,
    line5: 2,
    line6: 2,
    detail: '',
    luru: '',
    casIndex: 0,
    casArray: [],
    casIndex2: 0,
    casArray2: ["name:names,id:ids", "name:names1,id:ids2"],
    casArray3: [],
    show1: 0,
    testItem: '',
    freightCoId: '',
    freightNo: '',
  },
  backHos(e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/freightCos',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        pn: 1,
        ps: 100,
      },
      method: 'post',
      success: function (res) {
        var casArray2 = [];
        var casArray3 = [];
        for (var i = 0; i < res.data.data.items.length; i++) {
          casArray3.push(res.data.data.items[i].name)
        }
        that.setData({
          show1: 1,
          casArray2: res.data.data.items,
          casArray3: casArray3,
          freightNo:res.data.data.items[0].freightCoId
        })
        console.log(that.data.casArray3)
        console.log(that.data.casArray2)
      }
    });
  },
  postNo(e) {
    this.setData({
      freightNo: e.detail.value
    })
  },
  saveData1(e) {
    var that = this
    if (!that.data.freightCoId) {
      wx.showToast({
        title: '请选择运单号',
        icon: 'none'
      })
      return
    }
    if (!that.data.freightNo) {
      wx.showToast({
        title: '请选择快递公司',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/client2/geneTest/freight3',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        geneTestSamplePackId: that.data.geneTestSamplePackId,
        freightCoId: that.data.freightCoId,
        freightNo: that.data.freightNo,
      },
      method: 'post',
      success: function (res) {
        that.detail(that.data.geneTestSamplePackId)
      }
    });
  },
  close(e) {
    this.setData({
      show1: 0
    })
  },
  name(e) {
    this.setData({
      detailName: e.detail.value
    })
  },
  tel(e) {
    this.setData({
      detailTel: e.detail.value
    })
  },
  saveData(e) {
    var that = this
    if (!that.data.detailName) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if (!that.data.detailTel) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return
    }
    if (!that.data.testItem) {
      wx.showToast({
        title: '请选择检查项目',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/client2/geneTest/sample',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        geneTestSamplePackId: that.data.geneTestSamplePackId,
        sampleRealname: that.data.detailName,
        sampleTel: that.data.detailTel,
        testItem: that.data.testItem,
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          that.detail(that.data.geneTestSamplePackId)
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none',
          })
        }

      }
    });
  },
  enterData(e) {
    var that = this
    console.log(that.data.detail.status)
    if (that.data.detail.status == 2) {
      wx.showToast({
        title: '订单收样不可改',
        icon: 'none',
      })
    } else if (that.data.detail.status == 3) {
      wx.showToast({
        title: '订单已检测完毕',
        icon: 'none',
      })
    } else {
      wx.request({
        url: app.globalData.url + '/client2/geneTest//testItems',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          pn: 1,
          ps: 100,
        },
        method: 'post',
        success: function (res) {
          var casArray = []
          let casIndex
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].name == that.data.detail.testItem) {
              casIndex = i
            }
            casArray.push(res.data.data.items[i].name)
          }
          that.setData({
            show1: 2,
            luru: 1,
            casArray: casArray,
            casIndex: casIndex,
            testItem: res.data.data.items[0].name
          })
        }
      });
    }
  },
  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value,
      testItem: this.data.casArray[e.detail.value],

    })

  },
  bindCasPickerChange1(e) {
    var that = this
    var freightCoId = e.currentTarget.dataset.id
    this.setData({
      casIndex2: e.detail.value,
      freightCoId: freightCoId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  detail(geneTestSamplePackId) {
    var that = this
    wx.request({
      url: app.globalData.url + '/client2/geneTest/samplePackInfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        geneTestSamplePackId: geneTestSamplePackId,
      },
      method: 'post',
      success: function (res) {
        var luru
        if (res.data.data.sampleRealname == '' || res.data.data.sampleRealname == null || res.data.data.sampleRealname == undefined) {
          luru = 0
        } else {
          luru = 1
        }
        that.setData({
          detail: res.data.data,
          luru: luru,
          show1: 0,
          detailName: res.data.data.sampleRealname,
          detailTel: res.data.data.sampleTel,
          testItem: res.data.data.testItem,
          freightCoId: res.data.data.freight3CoId,
          freightNo: res.data.data.freight3No,
        })
      }
    });
  },
  onLoad: function (options) {
    var geneTestSamplePackId = options.geneTestSamplePackId
    this.setData({
      geneTestSamplePackId: geneTestSamplePackId
    })
    this.detail(geneTestSamplePackId)
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