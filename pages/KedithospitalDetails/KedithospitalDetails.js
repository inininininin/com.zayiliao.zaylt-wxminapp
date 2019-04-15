36036// pages/addHospital/addHospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '修改医院',
    statusBarHeight: '',
    titleBarHeight: '',
    userHeadImgPhoto: '',
    schemeList: [],
    introPic1: '',
    distributionNum: '',
    distributionPassword: '',
    hospitalName: '',
    hospitalTel: '',
    chargePeople: '',
    hospitalId: '',
    name: '',
    tel: '',
    headmanName: '',
    cover: '',
    phone: '',
  },
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  backHistory: function (e) {
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var hospitalId = options.hospitalId;
    console.log(hospitalId)
    var s = hospitalId.split("'");
    console.log(s)
    that.setData({
      hospitalId: s[0],
      name: s[1],
      tel: s[2],
      headmanName: s[3],
      cover: s[4],
      phone: s[5],
    })

  },
  distributionNum: function (e) {
    this.setData({
      distributionNum: e.detail.value
    })
  },
  distributionPassword: function (e) {
    this.setData({
      distributionPassword: e.detail.value
    })
  },
  hospitalName: function (e) {
    this.setData({
      hospitalName: e.detail.value
    })
  },
  hospitalTel: function (e) {
    this.setData({
      hospitalTel: e.detail.value
    })
  },
  chargePeople: function (e) {
    this.setData({
      chargePeople: e.detail.value
    })
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    var that = this
    return {
      title: '忠安医联体小程序',
      path: 'pages/logs/logs',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  choiceOne: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          textHidden: true,
          introPic1: tempFilePaths,
          photoHidden: false
        })
        wx.uploadFile({
          url: 'https://www.njshangka.com/oss/file/upload?path=zaylt/oss/', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            //do something
            if (data.code == 0) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({ introPic1: data.data.url })

              console.log(data.data.url)
            }
          }
        })
      }
    })
  },

  // 确定上传



  add: function () {
    buttonDisabled: true
    wx.showToast({
      title: '资料上传中',
      icon: 'loading',
      duration: 5000
    })

    var that = this
    var introPic1 = that.data.introPic1;
    var distributionNum = that.data.distributionNum;
    var distributionPassword = that.data.distributionPassword;
    var hospitalName = that.data.hospitalName;
    var hospitalTel = that.data.hospitalTel;
    var chargePeople = that.data.chargePeople;


    // if (distributionPassword=='') {

    //   wx.showModal({
    //     title: '请将资料填写完整'
    //   })
    // }

    if (distributionNum==''){
      distributionNum=that.data.phone
    }
    if (hospitalName == '') {
      hospitalName = that.data.name
    }
    if (introPic1 == '') {
      introPic1 = that.data.cover
    }
    if (hospitalTel == '') {
      hospitalTel = that.data.tel
    }
    if (chargePeople == '') {
      chargePeople = that.data.headmanName
    }

    var userToken = wx.getStorageSync("userToken")
    // var openId = that.data.openId
    // 网络请求
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/hospital/alter',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        hospital_id: that.data.hospitalId,
        phone: distributionNum,
        pwd: distributionPassword,
        name: hospitalName,
        cover: introPic1,
        tel: hospitalTel,
        headman_name: chargePeople,
        token: userToken,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.navigateBack({
            url: '../hospitalList/hospitalList',
          })

        }
        else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
})