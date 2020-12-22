// pages/newActivity/newActivity.js
var app = getApp()
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '编辑活动',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    date: '开始时间', //默认起始时间  
    date2: '结束时间', //默认结束时间 
    topImg: '',
    bgColor: 'rgba(229,229,229,1)',
    color: '#E5E5E5',
    content: '',
    title: '',
    brief: '',
    address: '',
    tel: '',
    lookThis: true,
    contentBf: '',
    colorend:'#999',
    colorend2:'#999',
    clickMethod:'supply'
  },
  // 发布
  supply() {
    var that = this
    that.setData({
      clickMethod:''
    })
    var startTime = Date.parse(that.data.date)
    var endTime = Date.parse(that.data.date2)
    var topImg = that.data.topImg.split(app.globalData.domain)[1]
    wx.request({
      url: app.globalData.url + '/upload-stream?ext=html',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: that.data.content,
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.request({
            url: app.globalData.url + '/c2/activity/itemadd',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              contentBtId: res.data.data.url,
              startTime: startTime,
              endTime: endTime,
              cover: topImg,
              title: that.data.title,
              tel: that.data.tel,
              brief: that.data.brief,
              address: that.data.address,
              // shareCount: that.data.shareCount,
              // viewCount: that.data.viewCount,
              hospitalId: app.globalData.hospitalId,
            },
            method: 'post',
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                wx.showToast({
                  title: '发布成功',
                  icon: 'none',
                  duration: 2000,
                  mask: true,
                  complete: function complete(res) {
                    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                    let prevPage = pages[pages.length - 2];
                    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
                    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                      change: 1,
                    })
                    setTimeout(function(){
                      that.setData({
                        clickMethod:'supply'
                      })
                      wx.navigateBack({
                        delta: 1
                      })
                    },1000)
                    
                  }
                })

              } else {
                that.setData({
                  clickMethod:'supply'
                })
                wx.showToast({
                  title:  res.data.codeMsg,
                  icon:'none'
                })
              }
            }
          });
        } else {
          that.setData({
            clickMethod:'supply'
          })
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
    });

  },

  save() {
    if (this.data.color == '#E5E5E5') {
      wx.showToast({
        title: '填写完整信息',
        icon: 'none',
      })
    } else {
      this.setData({
        lookThis: false,
        navtitle: '预览'
      })
    }
  },
  end: function () {
    let that = this
    if (that.data.date2 != '结束时间' && that.data.content != '' && that.data.title != ''
      && that.data.brief != '' && that.data.address != '' && that.data.tel != '' && that.data.date != '开始时间' && that.data.topImg != 'https://zaylt.njshangka.com/ylt/resource/img/Group.png') {
      that.setData({
        bgColor: '#2B77EF',
        color: '#ffffff',
      })
    }
  },
  bindDateChange(e) {
    var colorend="#999"
    if(e.detail.value!='开始时间'){
      colorend="#333"
    }
    this.setData({
      date: e.detail.value,
      colorend:colorend
    })
    this.end()
  },
  bindDateChange2(e) {
    var colorend2="#999"
    if(e.detail.value!='结束时间'){
       colorend2="#333"
    }
    this.setData({
      date2: e.detail.value,
      colorend2:colorend2
    })
   
    this.end()
  },
  content(e) {
    this.setData({
      content: e.detail.value
    })
    this.end()
  },
  title(e) {
    this.setData({
      title: e.detail.value
    })
    this.end()
  },
  brief(e) {
    this.setData({
      brief: e.detail.value
    })
    this.end()
  },
  address(e) {
    this.setData({
      address: e.detail.value
    })
    this.end()
  },
  tel(e) {
    this.setData({
      tel: e.detail.value
    })
    this.end()
  },
  addPic: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var picBlob = that.data.picBlob
        for (var i in tempFilePaths) {

          wx.uploadFile({
            url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              var url = data.data.url
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  duration: 2000
                })
                that.setData({
                  topImg: app.globalData.domain + url,
                })
                that.end()
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
    var that = this
    var id = options.type
    this.setData({
      id: id
    })
    if (options.type == 'add') {
      that.setData({
        type: true,
        topImg:'https://zaylt.njshangka.com/ylt/resource/img/Group.png'
      })
    } else {
      that.setData({
        type: false,
        navtitle: '活动详情'
      })
      wx.request({
        url: app.globalData.url + '/c2/activity/item',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          // 'cookie': app.globalData.cookie
        },
        data: {
          itemId: that.data.id,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            res.data.data.cover = app.cover(res.data.data.cover)

            var contentBtId = res.data.data.contentBtId
            that.setData({
              date: app.dateChange(res.data.data.startTime),
              date2: app.dateChange(res.data.data.endTime),
              topImg: res.data.data.cover||'https://zaylt.njshangka.com/ylt/resource/img/Group.png',
              title: res.data.data.title,
              tel: res.data.data.tel,
              brief: res.data.data.brief,
              address: res.data.data.address,
              // content: res.data.data.content,
            })
            wx.request({
              url: app.globalData.domain + contentBtId,
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': app.globalData.cookie
              },
              success: function (res) {
                if (typeof (res.data) == 'number') {
                  console.log(typeof (res.data), res.data)
                  that.setData({
                    contentBf: res.data
                  })
                } else {
                  var article = res.data
                  article=article.replace(/&lt;/g, "< ").replace(/&gt;/g, " >").replace(/align="left"/g, "style='text-align:left'").replace(/align="center"/g, "style='text-align:center'").replace(/align="right"/g, "style='text-align:right'")
                  WxParse.wxParse('article', 'html', article, that, 5);
                }
              }
            })
          } else {
            wx.showToast({
              title:  res.data.codeMsg,
              icon:'none'
            })
          }
        }
      });
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
  backHistoryOnly: function (e) {
    this.setData({
      lookThis: true,
      navtitle: '编辑活动'
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
  onShareAppMessage: function (res) {
    if (app.globalData.lastClient == 1) {
      var path='pages/newActivityShare/newActivityShare?type='+this.data.id
      // var path = '/pages/index/index?shareId=' + this.data.id + "&isShare=3"
    } else {
      var path='pages/newActivityShare/newActivityShare?type='+this.data.id
      // var path = '/pagews/out/index/index?shareId=' + this.data.id + "&isShare=3"
    }
    wx.request({
      url: app.globalData.url + '/c2/share?activityId=' + this.data.id,
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
      }
    })
    return {
      title: this.data.title, //分享内容
      path: path, //分享地址
      imageUrl: this.data.topImg, //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  onShareTimeline: function () {
    console.log(this.data.list.title)
		return {
	      title: this.data.list.title,
	      query: {
	        id: this.data.id
	      },
	      imageUrl: this.data.list.cover
	    }
	},

})