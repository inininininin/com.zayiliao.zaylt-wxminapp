// pages/MZeditHospitalInfo/MZeditHospitalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userHeadImgUrl: '../img/addPic.png',
    schemeList: [],
    introPic1: '',
    introPic2: '',
    paragraphOne: '',
    paragraphTwo: '',
    paragraphThree: '',
    hospitalNameWrt: '',
    outpatientName: '',
    linkName: '',
    linkPhone: '',
    linkAddress: '',

    hospitalId:'',
    name: '',
    // tel: '',
    // headmanName: '',
    cover: '',
  },

  paragraphOne: function (e) {
    this.setData({
      paragraphOne: e.detail.value
    })
  },
  paragraphTwo: function (e) {
    this.setData({
      paragraphTwo: e.detail.value
    })
  },
  paragraphThree: function (e) {
    this.setData({
      paragraphThree: e.detail.value
    })
  },
  hospitalNameWrt: function (e) {
    this.setData({
      hospitalNameWrt: e.detail.value
    })
  },
  outpatientName: function (e) {
    this.setData({
      outpatientName: e.detail.value
    })
  },
  linkName: function (e) {
    this.setData({
      linkName: e.detail.value
    })
  },
  linkPhone: function (e) {
    this.setData({
      linkPhone: e.detail.value
    })
  },
  linkAddress: function (e) {
    this.setData({
      linkAddress: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var hospitalId = options.hospitalId;
   that.setData({
     hospitalId: hospitalId,
   })
    
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/hospital/info',
      method: 'post',
      data: {
        // page_no: toPageNo,
        // page_size: pageSize,
        hospital_id: hospitalId,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,
          })
        }
      }
    })
  },

  makeSure: function () {
    buttonDisabled: true
    wx.showToast({
      title: '资料上传中',
      icon: 'none',
      duration: 5000
    })
    var that = this
    var introPic1 = that.data.introPic1;
    var introPic2 = that.data.introPic2;

    var paragraphOne = that.data.paragraphOne;
    var paragraphTwo = that.data.paragraphTwo;
    var paragraphThree = that.data.paragraphThree;
    var hospitalNameWrt = that.data.hospitalNameWrt;
    var outpatientName = that.data.outpatientName;
    var linkName = that.data.linkName;
    var linkPhone = that.data.linkPhone;
    var linkAddress = that.data.linkAddress;

    if (introPic1 == '') {
      introPic1 = that.data.schemeList.introPic1
    }
    if (introPic2 == '') {
      introPic2 = that.data.schemeList.introPic2
    }
    if (paragraphOne == '') {
      paragraphOne = that.data.schemeList.intro1

    }
    if (paragraphTwo == '') {
      paragraphTwo = that.data.schemeList.intro2
    }
    if (paragraphThree == '') {
      paragraphThree = that.data.schemeList.intro3
    }
    if (hospitalNameWrt == '') {
      hospitalNameWrt = that.data.name
    }
    if (outpatientName == '') {
      outpatientName = that.data.schemeList.name
    }
    if (linkName == '') {
      linkName = that.data.schemeList.headmanName
    }
    if (linkPhone == '') {
      linkPhone = that.data.schemeList.tel
    }
    if (linkAddress == '') {
      linkAddress = that.data.schemeList.address
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
        intro1: paragraphOne,
        intro2: paragraphTwo,
        intro3: paragraphThree,
        intro_pic1: introPic1,
        intro_pic2: introPic2,
        name: hospitalNameWrt,
        headman_name: linkName,
        tel: linkPhone,
        address: linkAddress,
        token: userToken,

      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../hospitalList/hospitalList',
          })

        }
        else {
          wx.showToast({
            title:  res.data.codeMsg,
            icon:'none'
          })
        }
      }
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
          // introPic1: tempFilePaths,
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
                icon: 'none',
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
  choiceTwo: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths, tempFilePaths[0])
        that.setData({
          textHidden: true,
          // introPic2: tempFilePaths,
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
                icon: 'none',
                duration: 2000
              })
              that.setData({ introPic2: data.data.url })

              console.log(data.data.url)
            }
          }
        })
      }
    })
  },
})