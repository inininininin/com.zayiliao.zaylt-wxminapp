// pages/newRec/newRec.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新建推送',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    spanish:0,
    num:0,
    price:0,
    key:'',
    selectAgree:true,
    selectAgree1:true,
    byNum:0,
    mzNum:0,
    toUserType:11,
    isShow:true,
    tsNum:1,
    url:'',
    type:'',
    showIs:true
  },
  spanish(e){
    this.setData({
      spanish:e.detail.value.length,
      key: e.detail.value
    })
  },
  save(e) {
    var that=this
     that.setData({
      showIs:false
     })
     wx.showToast({
       title: '已提交,请稍后',
     })
    if (that.data.type==1){
      var params=''
    }else{
      var toUserType, toUserType1
      var selectAgree = that.data.selectAgree
      var selectAgree1 = that.data.selectAgree1
      if (selectAgree) {
        toUserType = 1
      } else {
        toUserType = 0
      }
      if (selectAgree1) {
        toUserType1 = 1
      } else {
        toUserType1 = 0
      }
      var params = '?toUserType=' + toUserType1.toString() + toUserType.toString()
    }
    wx.request({
      url: app.globalData.url + that.data.url + params,
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId,
        content:that.data.key,
        // toUserType: toUserType1.toString() + toUserType.toString()
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '发送成功',
            icon:'none',
            duration:2000,
            success:function(res){
              setTimeout(function(){
                wx.navigateBack({
            
                })
              },500)
            }
          })
          
        } else {
          wx.showToast({
            title: res.data.codeMsg,
          })
          that.setData({
            showIs:true
           })
        }
      }
    })
  },
  by: function (e) {
    var selectAgree = !this.data.selectAgree;
    if (selectAgree) {
      this.setData({
        price: this.data.price + 0.01 * this.data.byNum,
        num: this.data.num + this.data.byNum,
      });
    } else {
      this.setData({
        price: parseFloat((this.data.price - 0.01 * this.data.byNum).toFixed(2)),
        num: this.data.num - this.data.byNum,
      });
    }
    this.setData({
      selectAgree: selectAgree
    });
  },
  mz: function (e) {
    var selectAgree1 = !this.data.selectAgree1;   
    if (selectAgree1){
      this.setData({
        price: this.data.price + 0.01 * this.data.mzNum,
        num: this.data.num +  this.data.mzNum,
      });
    }else{
      this.setData({
        price: parseFloat((this.data.price - 0.01 * this.data.mzNum).toFixed(2)),
        num: this.data.num - this.data.mzNum,
      });
    }
    this.setData({
      selectAgree1: selectAgree1
    });
  },
  byNum:function(){
    var that = this
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            byNum: res.data.data.sum.totalCount,
            num: parseInt(res.data.data.sum.totalCount) + parseInt(that.data.mzNum),
            price: 0.01 * (parseInt(res.data.data.sum.totalCount) + parseInt(that.data.mzNum))
          })
        }else{
          wx.showToast({
            title: res.data.codeMsg,
          })
        }
      }
    })
  },
  mzNum: function () {
    var that=this
    wx.request({
      url: app.globalData.url + '/c2/clinic/items',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            mzNum: res.data.data.sum.totalCount,
            num: parseInt(res.data.data.sum.totalCount)+parseInt(that.data.byNum),
            price: 0.01 * (parseInt(res.data.data.sum.totalCount) + parseInt(that.data.byNum))
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==1){
      this.setData({
        isShow:false,
        url:'/c2/hospitalpush/itemadd',
        type: options.type
      })
    }else{
      this.setData({
        isShow: true,
        url: '/c2/hospitalsms/itemadd',
        type: options.type
      })
    }
    this.byNum();
    this.mzNum();
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