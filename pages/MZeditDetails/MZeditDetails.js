// pages/MZeditDetails/MZeditDetails.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    navtitle: '编辑门诊',
    statusBarHeight: '',
    titleBarHeight: '',
    schemeList:[],
    name:'',
    headmanName:'',
    contactTel: '',
    address: '',
    remark: '',
    userToken:'',
  },
  name:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  headmanName: function (e) {
    this.setData({
      headmanName: e.detail.value
    })
  },
  contactTel: function (e) {
    this.setData({
      contactTel: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
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
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/clinicinfo/info',
      header: {
        'Content-type': 'application/json'
      },
      data: {
        token: userToken,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,
            userToken: userToken,
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

  edit:function(){
      var that=this;
      var userToken = that.data.userToken;
      var name = that.data.name;
      var headmanName = that.data.headmanName;
      var contactTel = that.data.contactTel;
      var address = that.data.address;
      var remark = that.data.remark;
      if (name == '') {
        name = that.data.schemeList.name
      }
      if (headmanName == '') {
        headmanName = that.data.schemeList.headmanName
      }
      if (contactTel == '') {
        contactTel = that.data.schemeList.contactTel
      }
      if (address == '') {
        address = that.data.schemeList.address
      }
      if (remark == '') {
        remark = that.data.schemeList.remark
      }


      wx.request({
        url: 'https://www.njshangka.com/zaylt/c/c/e/clinicinfo/alter',
        header: {
          'Content-type': 'application/json'
        },
        data: {
          remark: remark,
          name: name,
          headman_name: headmanName,
          contact_tel: contactTel,
          address: address,
          token: userToken,
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            wx.navigateBack({
              url: '../MZdetails/MZdetails',
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
})