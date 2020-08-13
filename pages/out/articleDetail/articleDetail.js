// pages/out/newsDetail/newsDetail.js
var app = getApp()
var utils = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    template: {},
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    close: 'none',
    fontSize: 24,
    list: [],
    res: '',
    id: '',
    display: 'none',
    pyqewm: '',
    ids:'',
    canvasShow:false,
  },
  changefont: function(e) {
    this.setData({
      display: 'block'
    })
  },
  closeFont: function(e) {
    this.setData({
      display: 'none'
    })
  },
  slider4change(event) {
    var val = event.detail.value
    this.setData({
      fontSize: val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    that.setData({
      ids: options.ids,
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
    })
    wx.request({
      url: app.globalData.url + '/c2/article/item',
      method: 'post',
      data: {
        itemId: id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      async: true,
      success: function(res) {
        if (res.data.code == 0) {

          if (res.data.data.cover != '' && res.data.data.cover != null && res.data.data.cover != undefined && res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cover = app.globalData.url + res.data.data.cover;
          }
          if (res.data.data.hospitalCover != '' && res.data.data.hospitalCover != null && res.data.data.hospitalCover != undefined && res.data.data.hospitalCover.slice(0, 1) != 'h') {
            res.data.data.hospitalCover = app.globalData.url + res.data.data.hospitalCover;
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
            success: function(res) {
              var article = res.data

              WxParse.wxParse('article', 'html', article, that, 5);

              // that.setData({
              //   res: res.data,
              // })
            }
          })

          // var qrCodePath
          //  var img2 = app.globalData.url + '/wxminqrcode?path=pages/articleDetail/articleDetail?id=' + options.id + '&width=200'
          // // console.log(that.data.list.cover)
          // let promise1 = new Promise(function(resolve, reject) {
          //   wx.getImageInfo({
          //     src: that.data.list.cover,
          //     success: function(res) {
          //       resolve(res);

          //     }
          //   })
          // });
          // let promise2 = new Promise(function(resolve, reject) {
            // wx.getImageInfo({
            //   src: app.globalData.url + '/wxminqrcode?path=pages/articleDetail/articleDetail?id=' + that.data.id + '&width=200',
            //   success: function(res) {
            //     resolve(res);
            //   }
            // })
          // });
          // let promise3 = new Promise(function(resolve, reject) {
          //   wx.getImageInfo({
          //     src: '../../img/logos.png',
          //     success: function(res) {
          //       resolve(res);
          //     }
          //   })
          // });
          // Promise.all([
          //   promise1, promise2, promise3
          // ]).then(res => {
          //   const ctx = wx.createCanvasContext('shareImg')

          //   //主要就是计算好各个图文的位置
          //   ctx.drawImage(res[1].path, 481, 374, 200, 200)
          //   ctx.drawImage(res[0].path, 0, 0, 705, 350)
          //   ctx.drawImage('../../../' + res[2].path, 24, 530, 71, 61)
          //   ctx.setFontSize(30)
          //   ctx.lineWidth = 1
          //   that.dealWords({
          //     ctx: ctx, //画布上下文
          //     fontSize: 30, //字体大小
          //     word: that.data.list.title, //需要处理的文字
          //     maxWidth: 400, //一行文字最大宽度
          //     x: 24, //文字在x轴要显示的位置
          //     y: 406, //文字在y轴要显示的位置
          //     maxLine: 2, //文字最多显示的行数
          //     lineHeight: 30
          //   })
          //   ctx.setTextAlign('left')
          //   ctx.setFillStyle('rgb(51,51,51)')
          //   that.dealWords({
          //     ctx: ctx, //画布上下文
          //     fontSize: 24, //字体大小
          //     word: that.data.list.hosptialName, //需要处理的文字
          //     maxWidth: 300, //一行文字最大宽度
          //     x: 95, //文字在x轴要显示的位置
          //     y: 544, //文字在y轴要显示的位置
          //     maxLine: 1, //文字最多显示的行数
          //     lineHeight: 24
          //   })
          //   ctx.setTextAlign('center')
          //   ctx.setFillStyle('rgb(153,153,153)')
          //   ctx.setFontSize(24)
          //   ctx.fillText('使用微信扫一扫', 575, 610)
          //   ctx.setTextAlign('left')
          //   ctx.setFillStyle('rgb(102,102,102)')
          //   ctx.fillText('浏览量：' + that.data.list.viewCount, 32, 615)
          //   ctx.stroke()
          //   ctx.draw()
          // })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }
      }
    })



  },

  // 方法
  share: function(e) {
    this.setData({
      close: 'block'
    })
  },
  close: function(e) {
    this.setData({
      close: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    

  },
  backHistory: function(e) {
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
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  sharepyq(e) {
    var that = this
    if(that.data.imglist){
      wx.showToast({
        title: '请稍等',
        icon:'none'
      })
      wx.request({
        url: app.globalData.url +'/c2/share?articleId=' + that.data.id,
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
   
    // var param = encodeURIComponent('pages/evaNowShare/evaNowShare?type=' + app.globalData.userInfoDetail.type + '&isfrom=1&id=' + (app.globalData.userInfoDetail.type1DoctorId || app.globalData.userInfoDetail.type2NurseId)+'&hospitalid='+(wx.getStorageSync('loginHospitalId')||''))
    // imglist.push(res.path)
    //     that.setData({
    //       tcode: res.path,
    //       imglist: imglist,
    //     })
    // if(!that.data.avatorShare){
    //   that.lookCode()
    // }
    
    // console.log(that.data.pyqewm)
    // wx.request({
    //   url: app.globalData.url + '/wxminqrcode?path=pages/articleDetail/articleDetail?id=' + that.data.id+'&width=200',
    //   method: 'get',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    // 'token': app.globalData.token,
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

    // https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN

  },
  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function (res) { 
    wx.request({
      url: app.globalData.url +'/c2/share?articleId=' + this.data.id,
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
      }
    })
    if (app.globalData.lastClient==1){
      var path = 'pages/out/articleDetail/articleDetail?id=' + this.data.id + "&ids=1"
    }else{
      var path = 'pages/out/articleDetail/articleDetail?id=' + this.data.id + "&ids=2"
    }
    // var path = 'pages/out/articleDetail/articleDetail?id=' + this.data.id+"&ids=1"
    return {     
      title: this.data.list.title, //分享内容
      path: path, //分享地址
      imageUrl: this.data.list.cover, //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
    // if (app.globalData.lastClient==1){
    //   var path = '/pages/index/index?shareId=' + this.data.id + "&isShare=1"
    // }else{
    //   var path = '/pages/out/index/index?shareId=' + this.data.id + "&isShare=1"
    // }
    // return {
    //   title: this.data.list.title, //分享内容
    //   path: path, //分享地址
    //   imageUrl: this.data.list.cover, //分享图片
    //   success: function(res) {   
    //   },
    //   fail: function (res) {
    //   }
    // }
  },


  shareIs: function() {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 705,
      height: 639,
      fileType: 'jpg',
      quality: 1,
      backgroundColor: '#fff',
      destWidth: 705,
      destHeight: 639,
      canvasId: 'canvas',
      success: function(res) {
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function(res) {
        console.log(res)
      }
    })
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
  drawText: function(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, lineHeight, lineMax) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += lineHeight; //lineHeight为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 50;
      }
      if (i == str.length - 2) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },
  dealWords: function(options) {
    options.ctx.setFontSize(options.fontSize); //设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

    var endPos = 0; //当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos); //当前剩余的字符串
      var rowWid = 0; //每一行当前宽度    
      if (options.ctx.measureText(nowStr).width > options.maxWidth) { //如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * options.lineHeight); //(j+1)*18这是每一行的高度        
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
            }
            endPos += m; //下次截断点
            break;
          }
        }
      } else { //如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 18);
      }
    }
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
              if(that.data.list.title.length>16){
                var titles=that.data.list.title.substring(0,16)+'...'
              }else{
                var titles=that.data.list.title
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
})