// pages/frameworkDetail/frameworkDetail.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '服务内容',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    list: [],
    falseIs:false,
    trueIs:true,
    myVideoSrcIs:false,
    myVideoSrc:''
  },
  myVideoSrcClose(){
    this.setData({
      myVideoSrcIs: false,
      myVideoSrc: '',
    })
  },
  previewVideo(e){
    this.setData({
      myVideoSrcIs:true,
      myVideoSrc:e.currentTarget.dataset.src,
    })  
  },
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    var imageBlob=''
    for (var i in this.data.list){
      if (e.currentTarget.dataset.secid == this.data.list[i].operatingManualSectionTrackId){
        imageBlob = this.data.list[i].imageBlob
      }   
    }  

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imageBlob // 需要预览的图片http链接列表
    })
  },
  detail(e) {
    wx.navigateTo({
      url: '../frameworkIntro/frameworkIntro?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  edit(e) {
    wx.navigateTo({
      url: '../frameworkEdit/frameworkEdit?id=' + this.data.operatingManualSectionId,
    })
  },
  slideUp(e){
    for(var i in this.data.list){
      if (this.data.list[i].operatingManualSectionTrackId == e.currentTarget.dataset.secid){
        if (e.currentTarget.dataset.lineone=='lineOne'){
          this.data.list[i].lineOne=''
        }else{
          this.data.list[i].lineOne = 'lineOne'
        }     
      }
    }
    this.setData({
      list:this.data.list
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operatingManualId: options.id,
      operatingManualSectionId: options.id
    })
    this.lastPage(0)
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/' + app.globalData.yyType + '/operating-manual-section-tracks',
      method: 'get',
      data: {
        pn: toPageNo,
        ps: pageSize,
        operatingManualSectionId: that.data.operatingManualId,
        // operatingManualSectionId: that.data.operatingManualSectionId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          var addTime      
          for (var i = 0; i < res.data.data.rows.length; i++) {
            var fileAll=''
            addTime = res.data.data.rows[i].addTime
            res.data.data.rows[i].addTime = utils.formatTime(addTime / 1000, 'Y-M-D h:m');
            if (res.data.data.rows[i].content&&res.data.data.rows[i].content.length>22){
              res.data.data.rows[i].lineOne = 'lineOne'
            }else{
              res.data.data.rows[i].lineOne = 'without'
            }
           
            if (res.data.data.rows[i].video){
              fileAll = res.data.data.rows[i].video
              res.data.data.rows[i].fileAll = res.data.data.rows[i].video
              if (res.data.data.rows[i].image){
                res.data.data.rows[i].fileAll = (fileAll + ',' + res.data.data.rows[i].image)
              }
            }else{
              if (res.data.data.rows[i].image) {
                res.data.data.rows[i].fileAll = res.data.data.rows[i].image
              }
            }
            var imgArr = [], imageBlob=[],videoBlob=[]
            if (res.data.data.rows[i].fileAll ) {
              var image = res.data.data.rows[i].fileAll.split(',')
              for (var r in image) {
                if (image[r].slice(0, 1) != 'h') {
                  if (image[r].split('.')[1] == 'jpg' || image[r].split('.')[1] == 'png' || image[r].split('.')[1] == 'gif' || image[r].split('.')[1] == 'jpeg') {
                    imgArr.push({
                      'src': app.globalData.url + image[r],
                      'type': '1'
                    })
                    imageBlob.push(app.globalData.url + image[r])
                  } else {
                    imgArr.push({
                      'src': app.globalData.url + image[r],
                      'type': '2'
                    })
                    videoBlob.push(app.globalData.url + image[r])
                  }
                } else {
                  imgArr.push(image[r])
                }
              }
            }else{

            }
            res.data.data.rows[i].imgArr = imgArr
            res.data.data.rows[i].imageBlob = imageBlob
            res.data.data.rows[i].videoBlob = videoBlob            
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.rows)

          if (res.data.data.rows.length == 0) {
            that.setData({
              list: list,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              list: newlist,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }


      }
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
    if (this.data.changeIs == 1) {
      this.setData({
        list: [],
      })
      this.lastPage(0)
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
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index'
    } else {
      var path = '/pages/out/index/index'
    }
    return {
      title: '欢迎使用共享医联体小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://zaylt.njshangka.com/favicon.ico', //分享图片
      success: function (res) { },
      fail: function (res) { }
    }
  }
})