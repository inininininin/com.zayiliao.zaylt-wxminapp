// pages/manage/addHos/addHos.js
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新增医院',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    license:'',
    yyzzimg:'../../img/touxiang@2x.png'
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
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  pwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  headmanName: function (e) {
    this.setData({
      headmanName: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  save(e){
    var that=this
    wx.request({
      url: app.globalData.url + '/clientend2/manageend/hospitaladd', //仅为示例，非真实的接口地址
      method: 'post',
      data: {
        license: that.data.license,
        headmanName: that.data.headmanName,
        name: that.data.name,
        pwd: that.data.pwd,
        phone: that.data.phone,
        tel: that.data.tel,
        address: that.data.address,
        remark: that.data.remark,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if(res.data.code==0){
            wx.showToast({
              title: '新增成功',
            })
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            changeIs: 1
          });
            setTimeout(function(){
              wx.navigateBack({
                
              })
            },1000)
        }else{
          wx.showToast({
            title: res.data.codeMsg,
          })
        }
      }
    })
    
  },
  yyzzimg(e){
    if (app.globalData.src == '' || app.globalData.src == null || app.globalData.src == undefined) {

      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0]
          var avatar = res.tempFilePaths[0]
          wx.uploadFile({
            url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
            filePath: avatar,
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              var url = data.data.url
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
                if (url.slice(0,1)!='h'){
                  url = app.globalData.domain +  url
                }
                that.setData({
                  license: url,
                  yyzzimg:url
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../../cropper/cropper',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.src=''
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