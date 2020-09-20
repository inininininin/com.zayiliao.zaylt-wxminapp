// pages/manage/clinic /clinic .js
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
    hosList:[],
    kw:'',
    sorts:'',
    orders:'',
    toPageNo:'',
    connectNum:'',
    casIndex: 0,
    casArray:['排序', '默认排序', '推送人数最多', '创建时间最近', '门诊名称A-Z'],
  },
  backHistory(e){
wx.navigateBack({
  
})
  },
  bindCasPickerChange: function (e) {
    var orders='',sorts=''    
    if (e.detail.value == 0 || e.detail.value==1){
      sorts= '';
        orders='desc';
    } else if (e.detail.value == 2){
      sorts = 'pushCount';
      orders = 'desc';
    } else if (e.detail.value == 3) {
      sorts = 'addTime';
      orders = 'desc';
    }else{
      sorts = 'name';
      orders = 'asc';
    }
   
    this.setData({
      hosList:[],
      casIndex: e.detail.value,
      testItem: this.data.casArray[e.detail.value],
      sorts: sorts,
      orders :orders,
    })
    this.lastPageHos(0, this.data.kw, this.data.sorts, this.data.orders) 
  },
  mine(e) {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  index(e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  input(e) {
    var kw = e.detail.value
    let that=this
    that.setData({
      kw: kw,
      hosList: [],      
    })
    that.lastPageHos(0, kw, that.data.sorts, that.data.orders) 
  },
  lastPageHos: function (toPageNo, kw, sorts, orders) {
    var that = this;
    var pageSize = 16;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/c2/clinic/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        kw: kw,
        sorts: sorts,
        orders: orders,
        hospitalId:that.data.id
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
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].addTime = app.dateChange(res.data.data.items[i].addTime)
        
          }
          var hosList = that.data.hosList;
          var newhosList = hosList.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              hosList: hosList,
              toPageNo: String(toPageNo),
              connectNum: res.data.data.sum.totalCount
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              hosList: newhosList,
              toPageNo: String(toPageNo),
              connectNum: res.data.data.sum.totalCount
            });
          }
        }
        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
     var id=options.id
     console.log(getApp().globalData.statusBarHeight)
     that.setData({
       id:id,
       statusBarHeight: getApp().globalData.statusBarHeight,
       titleBarHeight: getApp().globalData.titleBarHeight,
     })
    that.lastPageHos(0, that.data.kw, that.data.sorts, that.data.orders) 
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
   * 页面上拉触底事件的处理函数
   */
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      hosList: [],
    })
    that.lastPageHos(0, that.data.kw,  that.data.sorts, that.data.orders)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPageHos(toPageNo, that.data.kw,  that.data.sorts, that.data.orders)
  },

})