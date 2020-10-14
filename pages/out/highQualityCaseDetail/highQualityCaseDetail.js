// pages/out/newsDetail/newsDetail.js
var app = getApp()
var utils = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    close: 'none',
    fontSize: 24,
    list: [],
    res: '',
    id: '',
    display:'none',
  },
  changefont:function(e){
    this.setData({
      display: 'block'
    })
  },
  closeFont: function (e) {
    this.setData({
      display: 'none'
    })
  },
  slider4change(event){
    var val = event.detail.value
    this.setData({
      fontSize:val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    that.sys();

    if (app.globalData.lastClient==1){
      var param = encodeURIComponent('pages/out/articleDetail/articleDetail?id=' + id + '&ids=1')
    }else{
      var param = encodeURIComponent('pages/out/articleDetail/articleDetail?id=' + id + '&ids=2')
    }
    // var param = encodeURIComponent('pages/out/articleDetail/articleDetail?id=' + id+'&isfrom=1' )
    wx.getImageInfo({
      src: app.globalData.url + '/wxminqrcode?path=' + param + '&width=200',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        var imglist = []
        imglist.push(res.path)
        that.setData({
          tcode: res.path,
          imglist: imglist,
        })
        console.log(that.data.imglist)
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.request({
      url: app.globalData.url + '/c2/project/item',
      method: 'post',
      data: {
         itemId: id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.cover&&res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cover = app.globalData.url + res.data.data.cover;
          }
    
          res.data.data.addTime = utils.formatTime(res.data.data.addTime / 1000, 'Y-M-D h:m');
          that.setData({
            list: res.data.data,
            id: id,
          });
          var contentBtId = res.data.data.contentBtId
          wx.request({
            url: app.globalData.url + '/other/bigtxt/' + contentBtId + '/' + contentBtId,
            method: 'get',
            data: {
               itemId: id,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              // console.log(res.data)
              var article = res.data
              WxParse.wxParse('article', 'html', article, that, 5);
              // that.setData({
                // res: res.data,
              // })
            }
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }
      }
    })
  },
  sharewx: function (e) {
    onShareAppMessage()
  },
  // 方法
  share: function (e) {
    this.setData({
      close: 'block'
    })
  },
  close: function (e) {
    this.setData({
      close: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  backHistory: function (e) {
    // wx.navigateBack({
    //   url: '../newsLIst/newsLIst',
    // })
    if (this.data.ids == '' || this.data.ids == null || this.data.ids ==undefined){
      wx.navigateBack({
        delta: 1
      })
    } else if (this.data.ids == 1){
      wx.navigateTo({
        url: '../../index/index',
      })
    }else{
      wx.switchTab({
        url: '../index/index',
      })
    }
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
  sharepyq(e) {
    var that = this
    if(that.data.imglist){
      wx.showToast({
        title: '请稍等',
        icon:'none'
      })
      wx.request({
        url: app.globalData.url +'/c2/share?projectId=' + that.data.id,
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        success: function (res) {
        }
      })
      // that.setData({
      //   pyqewm: app.globalData.url + '/wxminqrcode?path=pages/articleDetail/articleDetail?id=' + that.data.id + '&width=200'
      // })
      // if(!that.data.avatorShare){
        that.setData({
          canvasShow:true
        })
        that.lookCode()
      // }else{
      //   wx.previewImage({
      //     urls: [that.data.urls],
      //   })
      // }
    
    }else{
      wx.showToast({
        title: '请稍等',
        icon:'none'
      })
      setTimeout(function(){
        if(that.data.imglist){
          wx.request({
            url: app.globalData.url +'/c2/share?articleId=' + that.data.id,
            method: 'get',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              wx.hideToast({})
            }
          })
            that.setData({
              canvasShow:true
            })
            that.lookCode()
        }else{
          wx.showToast({
            title: '生成失败,请稍后重试',
            icon:'none'
          })
        }
      },1500)
    }
  },
  /**
   * 保存到相册
   */
  saveIs: function() {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    console.log( that.data.urls)
    wx.saveImageToPhotosAlbum({
      filePath: that.data.urls,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  },
// canvas绘图部分
sys: function () {
  var that = this;
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        windowW: res.windowWidth,
        windowH:res.windowHeight,
        windowTop:(res.windowHeight-res.windowWidth)/2
      })
    },
  })
},
getImageInfo() {
  var  that=this
  wx.getImageInfo({
    src: this.data.avatorShare,
    complete: (res) => {
      console.log(res)
      var windowW = that.data.windowW;
      var nbei=res.width/windowW
      var avatorShareHeight=parseInt(res.height/nbei)
      that.setData({
        avatorShareHeight:avatorShareHeight,
        avatorShareWidth: windowW
      })
      console.log(that.data.avatorShareHeight)
    }
  })
},
  canvasdraw: function (canvas) {
    var that = this;
   
    // console.log(that.data.testImg)
    that.setData({
      canvasShow:true
    })
    wx.downloadFile({
      url: that.data.list.cover,//注意公众平台是否配置相应的域名
      success: function (res) {
        console.log( res.tempFilePath)
        that.setData({
          avatorShare: res.tempFilePath
        })
        var leftW=(that.data.windowW-140)
        var windowW = that.data.windowW;
        var windowH = that.data.windowH;
        console.log(windowW,windowH)
        // that.getImageInfo()
        wx.getImageInfo({
          src: that.data.avatorShare,
          complete: (res) => {
            console.log(res)
            var windowW = that.data.windowW;
            var nbei=res.height/200
            var avatorShareHeight=parseInt(windowW/nbei)

            that.setData({
              avatorShareHeight:res.height,
              avatorShareWidth: res.width
            })
            console.log(that.data.avatorShareHeight)
            console.log(windowW,that.data.avatorShareHeight)
            canvas.drawImage('../../img/fang.png', 0, 0, windowW, windowW);
            canvas.drawImage(that.data.avatorShare, 0, 0,  that.data.avatorShareWidth, that.data.avatorShareHeight,0, 0, windowW, 200);
            canvas.drawImage(that.data.imglist[0], leftW,230, 120, 120);
            // canvas.setFontSize(50)
            canvas.font="18px Georgia";
            canvas.width=windowW-100
            // if(that.data.detail.type2NurseName){
            //   canvas.fillText('护士：'+that.data.detail.type1DoctorName, 70, 50)
            // }else if(that.data.detail.type1DoctorName){
              if(that.data.list.name.length>16){
                var titles=that.data.list.name.substring(0,16)+'...'
              }else{
                var titles=that.data.list.name
              }
              console.log(titles)
              canvas.fillText(titles, 20, 230,200)
            // }
            canvas.font="16px Georgia";
            canvas.fillText( that.data.list.hosptialName, 20, 260)
            canvas.font="14px Georgia";
            canvas.fillText('浏览量：'+ that.data.list.viewCount, 20, 290)
            canvas.font="14px Georgia";
            canvas.fillText('分享数：'+ that.data.list.shareCount, 20, 320)
            canvas.draw(true,setTimeout(function(){
              
              that.saveCanvas()
             
              // setTimeout(function(){
                
              // },200)
            },100));

          }
        })
        
      }
    })
   
    console.log(that.data.avatorShare,that.data.imglist[0])
  
   
   
    // canvas.draw();
  },
  saveCanvas: function () {
    console.log('a');
  
    var that = this;
   
    var windowW = that.data.windowW;
    var windowH = that.data.windowH;
    console.log(windowW,windowH);
    that.setData({
      canvasShow:true
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowW,
      height: windowW,
      destWidth: windowW,
      destHeight: windowW,
      canvasId: 'canvas',
      success: function (res) {
        wx.hideToast({})
        console.log(res.tempFilePath)
        that.setData({
          // canvasShow:false
        })
        that.setData({
          urls:res.tempFilePath
        })
      },
      error:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  lookCode: function () {
    var that = this;
    var canvas = wx.createCanvasContext('canvas');
    that.canvasdraw(canvas);
    // that.setData({
    //   canvasShow:true
    // })
  },
  lookCodeShow(){
    var that=this
    console.log(that.data.urls)
    wx.previewImage({
      urls: [that.data.urls],
    })
    // that.saveCanvas()
  },
  closeCanvas: function () {
    var that = this;
    that.setData({
      canvasShow:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.url +'/c2/share?projectId=' + this.data.id,
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
      }
    })
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index?shareId=' + this.data.id + "&isShare=2"
    } else {
      var path = '/pages/out/index/index?shareId=' + this.data.id + "&isShare=2"
    }
    return {
      title: this.data.list.name,//分享内容
      path: path, //分享地址
      // path: '/pages/out/highQualityCaseDetail/highQualityCaseDetail?id=' + this.data.id,//分享地址
      imageUrl: this.data.list.cover,//分享图片
    }
  }
})