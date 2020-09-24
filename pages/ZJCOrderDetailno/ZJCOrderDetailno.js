// pages/ZJCOrderDetailno/ZJCOrderDetailno.js
var app=getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    addressList: [],
    overIf: 0,
    address1:'',
    address2:'',
    receiverTel:'',
    receiverName: '',
    details:[],
    orderId:'',
    totalPrice: '',
    useBonusPoint:'',
    expressCoCode:'',
    expressNo:'',
    list:[],
    toPageNo:'',
  },
  // 
  // searchWl:function(e){
  //   wx.navigateTo({
  //     url: '../webview/webview?href=https://m.kuaidi100.com/index_all.html?type=' + this.data.expressCoCode + '&postid=' + this.data.expressNo + '&callbackurl=' +'../ZJCOrderDetailno/ZJCOrderDetailno'
  //   })
  // },

  lastPage: function (toPageNo) {
    var that = this;
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1

    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/orders',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: toPageNo,
        ps: pageSize,
      },
      method: 'post',
      success: function (res) {
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length; i++) {

            res.data.data.items[i].addTime = utils.formatTime(res.data.data.items[i].addTime / 1000, 'Y-M-D h:m');
            // if (res.data.data.items[i].details[0].cover.slice(0, 1) != 'h') {
            //   res.data.data.items[i].details[0].cover = app.globalData.url + res.data.data.items[i].details[0].cover
            // }
            res.data.data.items[i].details[0].cover=app.cover(res.data.data.items[i].details[0].cover)
          }
            var list = that.data.list;
            var newlist = list.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list: list,
                // toPageNo: String(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                icon: 'none',
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              that.setData({
                list: newlist,
                toPageNo: String(toPageNo)
              });
            }
        }


        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }

        // var pushTime
        // for (var i = 0; i < that.data.list.length; i++) {
        //   pushTime = that.data.list[i].pushTime
        //   that.data.list[i].pushTime = app.dateChange(pushTime)
        // }
       
        // that.setData({
        //   list: that.data.list,
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   that.lastPage(0)
  
    // wx.request({
    //   url: app.globalData.url + '/clientend2/clinicend/pointexchange/orders',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    // 'cookie': app.globalData.cookie
    //   },
    //   data: {
    //     token: app.globalData.token,
    //     // orderId: orderId
    //   },
    //   method: 'post',
    //   success: function (res) {
    //     wx.hideToast()
    //     if (res.data.code == 0) {
    //       for(var i=0;i<res.data.data.items.length;i++){
            
    //         res.data.data.items[i].addTime = utils.formatTime(res.data.data.items[i].addTime/1000 , 'Y-M-D h:m');
    //         if (res.data.data.items[i].details[0].cover.slice(0,1)!='h'){
    //           res.data.data.items[i].details[0].cover = app.globalData.url+ res.data.data.items[i].details[0].cover
    //         }
           
    //       }
    //       that.setData({
    //        list: res.data.data.items
    //       })


    //     } else {
    //       wx.showModal({
    //         title: res.data.codeMsg
    //       })
    //     }
    //   }
    // });
    


    
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
      list: [],
    })
      that.lastPage(0)

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
      that.lastPage(toPageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})