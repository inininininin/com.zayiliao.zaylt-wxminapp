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
    videoBlobShow:[],
    content:'',
	picBlobShow:[],
	falseIs:false,
	trueIs:true
  },
  myVideoSrcClose(){
      this.setData({
        myVideoSrcIs: false,
        myVideoSrc: '',
      })
    },
	  previewImage: function (e) {
	    var current = e.currentTarget.dataset.src;
	    var imageBlob=[]
	    for (var i in this.data.picBlobShow){
	        imageBlob .push(this.data.picBlobShow[i].src)
	    }  
	    wx.previewImage({
	      current: current, // 当前显示图片的http链接
	      urls: imageBlob // 需要预览的图片http链接列表
	    })
	  },
  previewVideo(e){
     this.setData({
       myVideoSrcIs:true,
       myVideoSrc:e.currentTarget.dataset.src,
     })  
   },
  saveThis(e){
    var that=this
    wx.request({
      url: app.globalData.url + '/operating-manual/section-track-add',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        operatingManualSectionId: that.data.operatingManualSectionId,
        image: that.data.picBlob,
        video: that.data.videoBlob,
        audio: that.data.audioAll,
        content: that.data.content,
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
    console.log(src)
    var srcIs = src.split(app.globalData.url)[1]
    console.log(srcIs)
    var picBlob = this.data.picBlob.split(srcIs)[0] + this.data.picBlob.split(srcIs)[1].slice(1, this.data.picBlob.split(srcIs)[1].length)
    console.log(picBlob)
    for(var i in this.data.picBlobShow){
      if(src==this.data.picBlobShow[i].src){
        this.data.picBlobShow.splice(i, 1)
      }
    }
    this.setData({
      picBlobShow:this.data.picBlobShow,
      picBlob: picBlob
    })
  },
  delThisVideo(e){
    var src=e.currentTarget.dataset.src
    var srcIs = src.split(app.globalData.url)[1]
    var videoBlob = this.data.videoBlob.split(srcIs)[0] + this.data.videoBlob.split(srcIs)[1].slice(1, this.data.videoBlob.split(srcIs)[1].length)
    for(var i in this.data.videoBlobShow){
      if(src==this.data.videoBlobShow[i].src){
        this.data.videoBlobShow.splice(i, 1)
      }
    }
    this.setData({
      videoBlobShow:this.data.videoBlobShow,
      videoBlob: videoBlob
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
        
        var videoBlob = that.data.videoBlob
        var videoBlobShow = that.data.videoBlobShow
          wx.uploadFile({
            url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePath,
            name: 'file',
            success: function (res) {
              console.log(res)
              var data = JSON.parse(res.data);
              var url = data.data.url
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
                videoBlob = videoBlob+','+ url
                if (videoBlob.slice(0,1)==','){
                  videoBlob = videoBlob.slice(1, videoBlob.length)
                }
				videoBlobShow.push({'src': app.globalData.domain +url})
                that.setData({
                  videoBlob: videoBlob,
				  videoBlobShow:videoBlobShow
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
        var picBlobShow = that.data.picBlobShow
        var picBlob = that.data.picBlob
        for (var i in tempFilePaths) {
          wx.uploadFile({
            url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              console.log(res)
              var data = JSON.parse(res.data);
              var url = data.data.url
             
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
                picBlob = picBlob + ',' + url
                if (picBlob.slice(0, 1) == ',') {
                  picBlob = picBlob.slice(1, picBlob.length )
                }
                picBlobShow.push({ 'src': app.globalData.domain + url })
                that.setData({
                  picBlob: picBlob,
                  picBlobShow: picBlobShow,
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