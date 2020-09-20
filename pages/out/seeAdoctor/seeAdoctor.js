// pages/out/seeAdoctor/seeAdoctor.js
var app=getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle:'未就诊',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    id:'',
    detail:'',
    picBlob:[],
    imglist:[],
  },
  phoneThis(e) {
    if (e.currentTarget.dataset.phone == '') {
      return
    } else {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id=options.id;
    var that=this
    that.setData({
        id:id,
      })

    wx.request({
      url: app.globalData.url + '/c2/patient/item',
      method: 'post',
      data: {
        patientId: id,
       },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if(res.data.code==0){
          var arr = new Array(),picBlob;

          if (res.data.data.invoices != '' && res.data.data.invoices != null && res.data.data.invoices != undefined){
             picBlob = res.data.data.invoices.split(',')
            for(var r=0;r<picBlob.length;r++){
              if (picBlob[r].slice(0,1)!='h'){
                picBlob[r] = app.globalData.url+picBlob[r]
                arr.push({ 'pic': picBlob[r] })
              }
            }
            that.setData({
              show:1,
              picBlob: arr,
              imglist: picBlob
            })
          }
          if (res.data.data.status==1){
            that.setData({
              navtitle:'未就诊'
            })
            wx.setNavigationBarTitle({
              title: '未就诊',
            })
          }else{
            that.setData({
              navtitle: '已就诊'
            })
            wx.setNavigationBarTitle({
              title: '已就诊',
            })
          }
          if (res.data.data.hospitalConfirmTime == '' || res.data.data.hospitalConfirmTime == null || res.data.data.hospitalConfirmTime==undefined){
            res.data.data.hospitalConfirmTime=''
          }else{
            res.data.data.hospitalConfirmTime = utils.formatTime(res.data.data.hospitalConfirmTime / 1000, 'Y-M-D h:m');
          }
          if (res.data.data.pushTime == '' || res.data.data.pushTime == null || res.data.data.pushTime == undefined) {
            res.data.data.pushTime = ''
          } else {
            res.data.data.pushTime = utils.formatTime(res.data.data.pushTime / 1000, 'Y-M-D h:m');
          }
        
          that.setData({
            detail:res.data.data
          })
        }else if(res.data.code==20){
          wx.navigateTo({
            url: '../../newLogin/newLogin',
          })
        }else{
          wx.showModal({
            title:'错误信息',
            showCancel: false,
            content: res.data.codeMsg,
          })
        }
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imglist // 需要预览的图片http链接列表
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