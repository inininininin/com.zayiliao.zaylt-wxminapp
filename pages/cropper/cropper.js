// pages/cropper/cropper.js
var app=getApp()
Page({
  data: {
    src: '',
    navtitle: '营业执照',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    avatar: '',
    imgwidth: 0,
    imgheight: 0,  
    screenWidth: 0,
    screenHeight: 0,  
  },
  upload() {
    var that=this
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success(res) {
    //     const src = res.tempFilePaths[0]
    //     var avatar = res.tempFilePaths[0]
    //     wx.uploadFile({
    //       url: app.globalData.url + '/zaylt/upload-file?cover&duration', //仅为示例，非真实的接口地址
    //       filePath: avatar,
    //       name: 'file',
    //       success: function (res) {
    //         var data = JSON.parse(res.data);
    //         var url = data.data.url
    //         if (data.code == 0) {
    //           wx.showToast({
    //             title: '上传成功',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //           wx.request({
    //             url: app.globalData.url + '/zaylt/c2/clinic/itemalter', //仅为示例，非真实的接口地址
    //             method: 'post',
    //             data: {
    //               license: url,
    //               itemId: app.globalData.clinicId,
    //             },
    //             header: {
    //               "Content-Type": "application/x-www-form-urlencoded",
    //               'cookie': app.globalData.cookie
    //             },
    //             success: function (res) {
    //               that.setData({
    //                 src: app.globalData.domain + url
    //               })
    //             }
    //           })




    //         }
    //       },
    //       fail: function (res) {
    //         console.log(res)
    //       }
    //     })
       


       
    //   }
    // })
  },
  onLoad(option) {
    var that=this
    debugger
    that.setData({
      src: app.globalData.src
    })
    // wx.request({
    //   url: app.globalData.url + '/clinic/login-refresh',
    //   header: {
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'cookie': app.globalData.cookie
    //   },
    //   method:'post', 
    //   success: function (res) {
    //     app.globalData.phone = res.data.data.phone;
    //     app.globalData.userId = res.data.data.userId;
    //     // if (res.data.data.type == '3') {

    //     // } else if (res.data.data.type == '2') {
    //       app.globalData.clinicId = res.data.data.clinic.clinicId;
    //       app.globalData.hospitalId = res.data.data.hospital.hospitalId;
    //       app.globalData.hospitalName = res.data.data.hospital.name;
    //       app.globalData.clinicName = res.data.data.clinic.name;
    //       app.globalData.clinicaddress = res.data.data.clinic.address;
    //       app.globalData.authenticationIs = res.data.data.clinic.authenticationIs;
    //       app.globalData.src = app.globalData.url + res.data.data.clinic.license
    //       console.log(res.data.data.clinic.license)
    //       that.setData({
    //         src: app.globalData.url + res.data.data.clinic.license
    //       })
    //     // } else {
    //     //   app.globalData.hospitalId = res.data.data.hospital.hospitalId;
    //     //   app.globalData.hospitalName = res.data.data.hospital.name;
    //     //   app.globalData.hospitaladdress = res.data.data.hospital.address;
    //     //   app.globalData.license = res.data.data.hospital.license;
    //     //   app.globalData.cover = res.data.data.hospital.cover;
    //     //   app.globalData.authenticationIs = res.data.data.hospital.authenticationIs;
    //     //   app.globalData.authenticationIs = res.data.data.hospital.authenticationIs;
    //     //   app.globalData.src = app.globalData.url + res.data.data.hospital.license
         

    //     //   if (res.data.data.hospital.license == '' || res.data.data.hospital.license == null || res.data.data.hospital.license == undefined) {
    //     //     that.setData({
    //     //       src: ''
    //     //     })
    //     //   } else {
    //     //     that.setData({
    //     //       src: app.globalData.url + res.data.data.hospital.license
    //     //     })
    //     //   }

    //     // }
    //   }
    // })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });

  },
  imageLoad: function (e) {
    var that = this;
    var $width = e.detail.width,    //获取图片真实宽度  
      $height = e.detail.height,
      ratio = $width / $height;   //图片的真实宽高比例  
    var viewWidth = 500,           //设置图片显示宽度，  
      viewHeight = 500 / ratio;    //计算的高度值     
    that.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  }  ,

  onReady: function () {
    
  },
  backHistory: function (e) {
    wx.navigateBack({

    })
  },
})