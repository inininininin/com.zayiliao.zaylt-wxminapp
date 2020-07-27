// pages/out/mine/mine.js
var util=require('../../../utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    productInfo: '',
    tel:'',
    name: '',
    address:'',
    display:'',
    src:'../../img/logo@2x.png',
  },
  yyzz(e){
    if (app.globalData.src == '' || app.globalData.src == null || app.globalData.src==undefined){

      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0]
          var avatar = res.tempFilePaths[0]
          wx.uploadFile({
            url: app.globalData.url + '/other/fileupload?cover&duration', //仅为示例，非真实的接口地址
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
                wx.request({
                  url: app.globalData.url + '/c2/clinic/itemalter', //仅为示例，非真实的接口地址
                 method: 'post',
                  data: {
                     license: url,
                    itemId: app.globalData.clinicId,
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'cookie': app.globalData.cookie
                  },
                  success: function (res) {
    
                    if (url.slice(0, 1) != 'h') {
                      url = app.globalData.url + url
                    }
                    app.globalData.src = url
                    that.setData({
                      src: url
                    })
                   
                  }
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../../cropper/cropper',
      })
    }

  },
 
  bindChooiceProduct: function () {
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)
        that.setData({
          src: tempFilePaths
        })
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.url +'/other/fileupload?cover&duration', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            //do something
            console.log(data.data.url)
            if (data.code == 0) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({ introPic1: data.data.url })

              console.log(data.data.url)
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  userIndex:function(e){
    wx.navigateTo({
      url: '../../ZJCDesign/ZJCDesign',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.authenticationIs==0){
      this.setData({
        display:0
      })
    } else if (app.globalData.authenticationIs == 3){
      this.setData({
        display:2
      })
    }else{
      this.setData({
        display: 1
      })
    }

 
  
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var tel = app.globalData.phone;
    console.log(tel, tel.length, tel.slice(0, 3))
    if (tel.length==8){
      tel = tel.slice(0, 2) + '****' + tel.slice(6, 8)
    } else if (tel.length == 12){
      tel = tel.slice(0, 3) + '****' + tel.slice(7, 12)
    } else {
      tel = tel.slice(0, 3) + '****' + tel.slice(7, 11)
    }
   
    this.setData({
      hosName: app.globalData.hospitalName,
      name: app.globalData.clinicName,
      tel: tel,
    })
  },
  loginout(e) {
 
    var that = this
    wx.showModal({
      title: '退出',
         content: '确定要退出登录？',
         success: function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
               //点击确定
               wx.reLaunch({
                url: '../../loginClinic/loginClinic',
              })
            }
         },
         fail: function (res) { }, 
         complete: function (res) { },
    })
    
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