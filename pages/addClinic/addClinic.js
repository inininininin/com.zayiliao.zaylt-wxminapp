// pages/addClinic/addClinic.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '新增门诊',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    license: '',
    yyzzimg: '../img/touxiang@2x.png',
    array: [],
    index: 0,
    id: '',
    details: [],
    showIs: true,
    clinicPromoterId: '',
    pwd: '',
    headmanName: '',
    name: '',
    phone: '',
    contactTel: '',
    address: '',
    remark: '',
    hospitalId: '',
    license: '',
    itemId: '',
  },
  bindPickerChange: function (e) {
    var clinicPromoterId = ''
    for (var i in this.data.array) {
      if (i == e.detail.value) {
        clinicPromoterId = this.data.array[i].hospitalUserId
      }
    }
    this.setData({
      index: e.detail.value,
      clinicPromoterId: clinicPromoterId
    })
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

  saveThis(e) {
    var that = this
    // if (that.data.pwd == '' || that.data.pwd == undefined || that.data.pwd == null){
    //   wx.showToast({
    //     title: '请填写密码',
    //   })
    // }else{
    var clinicUserPassword = that.data.pwd
    if (clinicUserPassword) {
      var params = '?clinicUserPassword=' + clinicUserPassword + "&clinicUserPasswordConfirm=" + clinicUserPassword
    } else {
      var params = ''
    }
    wx.request({
      url: app.globalData.url + '/hospital/super-admin/hospital-clinic-alter' + params, //仅为示例，非真实的接口地址
      method: 'post',
      data: {
        hospitalClinicId: that.data.id || '',
        headman: that.data.headmanName || '',
        name: that.data.name || '',
        // pwd: that.data.pwd,
        clinicUserPhone: that.data.phone || '',
        tel: that.data.tel || '',
        address: that.data.address || '',
        remark: that.data.remark || '',
        hospitalUserId: that.data.clinicPromoterId || '',
        license: that.data.license || '',
        // itemId: that.data.id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000,
            success: function (res) {
              var pages = getCurrentPages();
              var currPage = pages[pages.length - 1];   //当前页面
              var prevPage = pages[pages.length - 2];  //上一个页面
              prevPage.setData({
                navtitle: that.data.name
              });
              wx.navigateBack({

              })
            }
          })

        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none',
          })
        }
      }
    })
    // }
  },
  save(e) {
    var that = this
    if(!that.data.name){
      wx.showToast({
        title: '请输入门诊名称',
        icon:'none',
      })
      return
    }
    if(!that.data.clinicPromoterId){
      wx.showToast({
        title: '请选择推广人',
        icon:'none',
      })
      return
    }
    if(!that.data.phone){
      wx.showToast({
        title: '请输入分配账号',
        icon:'none',
      })
      return
    }
    if(!that.data.pwd){
      wx.showToast({
        title: '请输入分配密码',
        icon:'none',
      })
      return
    }
    
    if(!that.data.headmanName){
      wx.showToast({
        title: '请输入负责人',
        icon:'none',
      })
      return
    }
    if(!that.data.tel){
      wx.showToast({
        title: '请输入联系方式',
        icon:'none',
      })
      return
    }
    if(!that.data.address){
      wx.showToast({
        title: '请输入门诊地址',
        icon:'none',
      })
      return
    }
    
    wx.request({
      url: app.globalData.url + '/c2/clinic/itemadd', //仅为示例，非真实的接口地址
      method: 'post',
      data: {
        // hospitalClinicId: that.data.hospitalClinicId,
        headmanName: that.data.headmanName,
        name: that.data.name,
        pwd: that.data.pwd,
        phone: that.data.phone,
        contactTel: that.data.tel,
        address: that.data.address,
        remark: that.data.remark,
        hospitalId: app.globalData.hospitalId,
        license: that.data.license,
        hospitalUserId: that.data.clinicPromoterId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '新增成功',
            icon: 'none',
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    var id = options.id
    var array = [{ 'name': '请选择', 'hospitalUserId': '' }]
    that.setData({
      navtitle: options.typesName,
      hospitalClinicId: id
    })
    wx.setNavigationBarTitle({
      title: options.typesName,
    })
    wx.request({
      url: app.globalData.url + '/hospital/def/hospital-operator-users', //仅为示例，非真实的接口地址
      method: 'get',
      data: {
        pn: 1,
        ps: 150,
        type: 1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          for (var i in res.data.data.rows) {
            array.push(res.data.data.rows[i])
          }
          that.setData({
            array: array,
            // clinicPromoterId: res.data.data.rows[0].hospitalUserId,
            id: id,
          })
          if (options.id != '' && options.id != undefined && options.id != null) {
            wx.request({
              url: app.globalData.url + '/hospital/super-admin/hospital-clinic/' + id, //仅为示例，非真实的接口地址
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': app.globalData.cookie
              },
              success: function (res) {
                if (res.data.code == 0) {
                  let yyzzimg = app.cover(res.data.data.license)

                  var clinicPromoterName = res.data.data.hospitalUserName
                  for (var i in array) {
                    console.log(array[i].name, i, clinicPromoterName)
                    if (array[i].name == clinicPromoterName) {
                      that.setData({
                        index: i
                      })
                    }
                  }
                  that.setData({
                    name: res.data.data.name,
                    headmanName: res.data.data.headman,
                    clinicPromoterName: res.data.data.hospitalUserName,
                    phone: res.data.data.clinicUserPhone,
                    tel: res.data.data.tel,
                    address: res.data.data.address,
                    remark: res.data.data.remark,
                    license: res.data.data.license,
                    yyzzimg: yyzzimg,
                    showIs: false,
                  })
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none',
                  })
                }
              }
            })
          }

        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none',
          })
        }
      }
    })

  },
  yyzzimg(e) {
    console.log(app.globalData.src)
    // if (app.globalData.src == '' || app.globalData.src == null || app.globalData.src == undefined) {

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
                icon: 'none',
                duration: 2000
              })
              if (url.slice(0, 1) != 'h') {
                url = app.globalData.domain + url
              }
              that.setData({
                license: data.data.url,
                yyzzimg: url
              })
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
    // } else {
    //   wx.navigateTo({
    //     url: '../cropper/cropper',
    //   })
    // }
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
    wx.stopPullDownRefresh({
      complete: (res) => { },
    })
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