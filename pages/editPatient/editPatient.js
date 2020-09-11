// pages/out/seeAdoctor/seeAdoctor.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '未就诊',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    id: '',
    detail: '',
    imgBlob: '',
    imglist: [],
    sickness: '',
    remark: ''
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
    var id = options.id;
    var that = this
    that.setData({
      id: id,
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
        if (res.data.code == 0) {
          var arr = new Array(), picBlob;

          if (res.data.data.invoices != '' && res.data.data.invoices != null && res.data.data.invoices != undefined) {
            picBlob = res.data.data.invoices.split(',')
            var imgBlob = res.data.data.invoices.split(',')
            for (var r = 0; r < picBlob.length; r++) {
              picBlob[r]=app.cover(picBlob[r])
            }
            that.setData({
              show: 1,
              imglist: picBlob,
              imgBlob: imgBlob
            })
          }
          if (res.data.data.status == 1) {
            that.setData({
              navtitle: '未就诊'
            })
          } else {
            that.setData({
              navtitle: '已就诊'
            })
          }
          if (res.data.data.hospitalConfirmTime == '' || res.data.data.hospitalConfirmTime == null || res.data.data.hospitalConfirmTime == undefined) {
            res.data.data.hospitalConfirmTime = ''
          } else {
            res.data.data.hospitalConfirmTime = utils.formatTime(res.data.data.hospitalConfirmTime / 1000, 'Y-M-D h:m');
          }
          if (res.data.data.pushTime == '' || res.data.data.pushTime == null || res.data.data.pushTime == undefined) {
            res.data.data.pushTime = ''
          } else {
            res.data.data.pushTime = utils.formatTime(res.data.data.pushTime / 1000, 'Y-M-D h:m');
          }

          that.setData({
            detail: res.data.data,
            sickness: res.data.data.sickness,
            remark: res.data.data.remark,
          })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../login/login',
          })
        } else {
          wx.showModal({
            title: '错误信息',
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
  sickness(e) {
    this.setData({
      sickness: e.detail.value
    })
  },
  remark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  save: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/c2/patient/itemalter', //仅为示例，非真实的接口地址
      method: 'post',
      data: {
        invoices: that.data.imgBlob,
        sickness: that.data.sickness,
        remark: that.data.remark,
        patientId: that.data.id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000,
            mask: true,
            complete: function complete(res) {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 500);
            }
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
      delta: 1,
    })
  },

  addPic: function (e) {
    var that = this
    wx.chooseImage({
      count: 9,
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
              var imglist = that.data.imglist
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
                if (that.data.imgBlob == '') {
                  var imgBlob = url
                } else {
                  var imgBlob = that.data.imgBlob + ',' + url
                }
                console.log(imgBlob)
                imglist.push(app.globalData.domain + url)
                that.setData({
                  imglist: imglist,
                  imgBlob: imgBlob
                })
                console.log(imglist)

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
  deletThis(e) {
    var img = [], imgBlob = ''
    var src = e.target.dataset.src
    var pic = this.data.imglist
    for (var i in pic) {
      if (src == pic[i]) {
        // img = this.data.imgBlob[i] + ','
      } else {
        img.push(pic[i])
        imgBlob = imgBlob + ',' + pic[i].split('com')[1]
      }
      this.setData({
        imglist: img,
        imgBlob: imgBlob.substring(1, imgBlob.length)
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