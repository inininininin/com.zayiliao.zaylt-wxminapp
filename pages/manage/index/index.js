// pages/Third/out/index/index.js
var start_clientX;
var end_clientX;
var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    num: '4',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navbar: ['新病源', '未就诊', '已就诊'],
    currentTab: 0,
    list2: [],
    list1: [],
    hosList:[],
    idCard: '',
    name: '',
    remark: '',
    phone: '',
    windowWidth: wx.getSystemInfoSync().windowWidth,
    display: 'none',
    translate: 'transform: ',
    date: '开始时间', //默认起始时间  
    date2: '结束时间', //默认结束时间 
    date3: '开始时间', //默认起始时间  
    date4: '结束时间', //默认结束时间 
    color: '#f2f2f2',
    color2: '#f2f2f2',
    color3: '#f2f2f2',
    color4: '#f2f2f2',
    color5: '#f2f2f2',
    color6: '#f2f2f2',
    status: '',
    num1: '',
    num2: '',
    // url: '/clientend2/manageend/hospitals',
    url: '/clientend2/manageend/hospitals',
    url1:'/clientend2/manageend/hospitals',
    kw:'',
    sorts:'',
    orders:'',
    changeIs:''
  },
  clinic(e){
    wx.redirectTo({
      url: '../clinicBottom/clinicBottom',
    })
  },
  mine(e) {
    wx.redirectTo({
      url: '../mine/mine',
    })
  },
  slider1change(e) {

  },
  status1(e) {
    let that = this;
    that.setData({
      sorts: 'clinicCount',
      orders:'desc',
      color: 'rgb(255,255,190)',
      color4: '#f2f2f2',
      color2: '#f2f2f2',
      color3: '#f2f2f2'
    })
  },
  status2(e) {
    let that = this;
    that.setData({
      sorts: 'patientCount',
      orders: 'desc',
      color2: 'rgb(255, 255, 190)',
      color4: '#f2f2f2',
      color: '#f2f2f2',
      color3: '#f2f2f2'
    })
  },
  status3(e) {
    let that = this;
    that.setData({
      sorts: 'addTime',
      orders: 'desc',
      color3: 'rgb(255, 255, 190)',
      color4: '#f2f2f2',
      color2: '#f2f2f2',
      color: '#f2f2f2'
    })
  },
  status4(e) {
    let that = this;
    that.setData({
      sorts: 'hospitalName',
      orders: 'asc',
      color4: 'rgb(255, 255, 190)',
      color: '#f2f2f2',
      color2: '#f2f2f2',
      color3: '#f2f2f2'
    })
  },
  seeAd(e) {
    let that = this
    that.setData({
      color5: 'rgb(255, 255, 190)',
      color6: '#f2f2f2',
      url: '/clientend2/manageend/allhospitals',
    })
  },
  noseeAd(e) {
    let that = this
    that.setData({
      color6: 'rgb(255, 255, 190)',
      color5: '#f2f2f2',
      url: '/clientend2/manageend/hospitals',
    })
  },
  again(e) {
    this.setData({
      color: '#f2f2f2',
      color2: '#f2f2f2',
      color3: '#f2f2f2',
      color4: '#f2f2f2',
      color5: '#f2f2f2',
      color6: '#f2f2f2',
      url: this.data.url1
    })
  },
  sure(e) {
    let that = this
    that.setData({
      hosList:[],
    })
    console.log()
    that.lastPageHos(0, that.data.kw, that.data.url, that.data.sorts, that.data.orders)

    that.setData({
      display: "none",
      toPageNo:1,
    })
  },
  search(e) {
    wx.navigateTo({
      url: '../search/search?url=' + this.data.url,
    })
  },
  // 滑动开始
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  // 滑动结束
  touchend: function (e) {
    end_clientX = e.changedTouches[0].clientX;
    if (start_clientX - end_clientX > 120) {
      this.setData({
        display: "block",
        // translate: 'transform: translateX(-590rpx);'
      })
    } else if (start_clientX - end_clientX > 0) {
      this.setData({
        display: "none",
        // translate: ''
      })
    }
  },
  // 头像
  showview: function () {
    this.setData({
      display: "block",
      // translate: 'transform: translateX(-590rpx);'
      // translate: 'transform: translateX(-' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      // translate: '',
    })
  },
  
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  idCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  lastPageHos: function (toPageNo, kw, url,sorts,orders) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + url,// '/clientend2/manageend/hospitals',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        kw: kw,
        sorts: sorts,
        orders:orders,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (toPageNo == 1 && res.data.data.items.length==0){
            that.setData({
              number: 0
            });
          }else{
            that.setData({
              number: 1
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].addTime = app.dateChange(res.data.data.items[i].addTime)

            if (res.data.data.items[i].cover == null|| res.data.data.items[i].cover == '' || res.data.data.items[i].cover ==undefined){
              res.data.data.items[i].cover ='../../img/logo@2x.png'
            }else{
              if (res.data.data.items[i].cover&&res.data.data.items[i].cover.slice(0, 1) != 'h') {
                res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
              }
            }
            
          }
          var hosList = that.data.hosList;
          var newhosList = hosList.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              hosList: hosList,
              toPageNo: String(toPageNo),
              connectNum: res.data.data.sum.totalItemCount
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
              connectNum: res.data.data.sum.totalItemCount
            });
          }
        }
        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  onLoad: function (options) {
    this.lastPageHos(0, this.data.kw, this.data.url, this.data.sorts, this.data.orders)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    if (this.data.changeIs==1){
      this.setData({
        hosList:[]
      })
      this.lastPageHos(0, this.data.kw, this.data.url, this.data.sorts, this.data.orders)
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
      hosList: [],
    })
    that.lastPageHos(0, that.data.kw, that.data.url, that.data.sorts, that.data.orders)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPageHos(toPageNo, that.data.kw, that.data.url, that.data.sorts, that.data.orders)
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