// pages/canvas/canvas.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    url:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var qrCodePath
    var img2 = app.globalData.url + '/wxminqrcode?path=pages/articleDetail/articleDetail?id=1' + '&width=200'
    that.setData({
      img1:'https://zaylt.njshangka.com/resource/img/bj@2x.png',
      img2: img2,
      title:'阿凡達的數量阿凡達的數量阿凡達的數量阿凡達的數量阿凡達的數量阿凡達的數量'
    })
    let promise1 = new Promise(function (resolve, reject) {    
      wx.getImageInfo({
        src: that.data.img1,
        success: function (res) {
          resolve(res);
        
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.img2,
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../img/logos.png',
        success: function (res) {
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2, promise3
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')
      var that = this
      //主要就是计算好各个图文的位置
      console.log(res[0].path, res[1].path, res[2].path)
      ctx.drawImage(res[1].path, 481, 374, 200, 200)
      ctx.drawImage(res[0].path, 0, 0, 705, 350)
      ctx.drawImage('../../'+res[2].path, 24, 530, 71, 61)
      ctx.setFontSize(30)
      ctx.lineWidth = 1
      var str = "假如生活欺骗了你，请不要悲伤！thank假如生活欺骗了你，请不要悲伤！thank you!"
      that.dealWords({
        ctx: ctx,//画布上下文
        fontSize: 30,//字体大小
        word: that.data.title,//需要处理的文字
        maxWidth: 400,//一行文字最大宽度
        x: 24,//文字在x轴要显示的位置
        y: 406,//文字在y轴要显示的位置
        maxLine: 2,//文字最多显示的行数
        lineHeight: 30
      })
      ctx.setTextAlign('left')
      ctx.setFillStyle('rgb(51,51,51)')
      // ctx.setLineWidth(2)
      // ctx.setFontSize(24)
      // ctx.fillText('分享文字描述1分享文字描述1分享文字描述1分享文字描述1', 24, 406, 420)
      var strs = '北京第二中医院北京第二中医院'
      that.dealWords({
        ctx: ctx,//画布上下文
        fontSize: 24,//字体大小
        word: strs,//需要处理的文字
        maxWidth: 300,//一行文字最大宽度
        x: 95,//文字在x轴要显示的位置
        y: 544,//文字在y轴要显示的位置
        maxLine: 1,//文字最多显示的行数
        lineHeight: 24
      })
      // ctx.fillText('北京第二中医院', 24, 610)
      ctx.setTextAlign('center')
      ctx.setFillStyle('rgb(153,153,153)')
      ctx.setFontSize(24)
      ctx.fillText('使用微信扫一扫', 575, 610)
      ctx.setTextAlign('left')
      ctx.setFillStyle('rgb(102,102,102)')
      ctx.fillText('浏览量：12500', 32, 615)
      ctx.stroke()
      ctx.draw()
    })
  },


  /**
   * 生成分享图
   */
  share: function () {
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
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 保存到相册
   */
  save: function () {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
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
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth, lineHeight, lineMax) {
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
  dealWords: function (options) {
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度    
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * options.lineHeight);    //(j+1)*18这是每一行的高度        
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 18);
      }
    }
  },
})