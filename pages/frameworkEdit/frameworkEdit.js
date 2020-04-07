// pages/frameworkEdit/frameworkEdit.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '保存',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    videoBlob:'',
    picBlob:'',
    fileAll:'',
    audioAll:'',
    fileAllShow:[],
    content:'',
  },
  saveThis(e){
    var that=this
    wx.request({
      url: app.globalData.url + '/'+app.globalData.yyType+'/operating-manual-section-track-add',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        operatingManualSectionId: this.data.operatingManualSectionId,
        image: this.data.picBlob,
        video: this.data.videoBlob,
        audio: this.data.audioAll,
        content: this.data.content,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            changeIs: 1
          });
          wx.navigateBack({
            
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  bindTextAreaBlur(e){
    this.setData({
      content:e.detail.value
    })
  },
  delThis(e){
    var src=e.currentTarget.dataset.src
    var srcIs = src.split(app.globalData.url)[1]
    var fileAll = this.data.fileAll.split(srcIs)[0] + this.data.fileAll.split(srcIs)[1].slice(1, this.data.fileAll.split(srcIs)[1].length)
    for(var i in this.data.fileAllShow){
      if(src==this.data.fileAllShow[i].src){
        this.data.fileAllShow.splice(i, 1)
      }
    }
    this.setData({
      fileAllShow:this.data.fileAllShow,
      fileAll: fileAll
    })
  },
  video(e){
    var that=this 
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed:true,
      maxDuration: 60,
      camera: 'back',
      success(res) {
        var tempFilePath = res.tempFilePath
        var fileAll = that.data.fileAll
        var videoBlob = that.data.videoBlob
        var fileAllShow = that.data.fileAllShow
          wx.uploadFile({
            url: app.globalData.url + '/other/fileupload?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePath,
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
                videoBlob = videoBlob+','+ url
                fileAll = fileAll + ',' + url
                if (videoBlob.slice(0,1)==','){
                  videoBlob = videoBlob.slice(1, videoBlob.length)
                }
                if (fileAll.slice(0, 1) == ',') {
                  fileAll = fileAll.slice(1, fileAll.length )
                }
                fileAllShow.push({ 'type': 2, 'src': app.globalData.url +url })
                that.setData({
                  videoBlob: videoBlob,
                  fileAll: fileAll,
                  fileAllShow: fileAllShow,
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
      }
    })
  },
  camera: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        var fileAll = that.data.fileAll
        var fileAllShow = that.data.fileAllShow
        var picBlob = that.data.picBlob
        for (var i in tempFilePaths) {
          wx.uploadFile({
            url: app.globalData.url + '/other/fileupload?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
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
                picBlob = picBlob + ',' + url
                fileAll = fileAll + ',' + url
                if (picBlob.slice(0, 1) == ',') {
                  picBlob = picBlob.slice(1, picBlob.length )
                }
                if (fileAll.slice(0, 1) == ',') {
                  fileAll = fileAll.slice(1, fileAll.length )
                }
                fileAllShow.push({ 'type': 1,'src': app.globalData.url + url })
                that.setData({
                  picBlob: picBlob,
                  fileAll: fileAll,
                  fileAllShow: fileAllShow,
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operatingManualSectionId:options.id
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