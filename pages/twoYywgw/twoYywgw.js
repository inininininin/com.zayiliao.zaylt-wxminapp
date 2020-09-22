// pages/twoQhospitalDetail/twoQhospitalDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    hospital_name: '',
    dataItem: [],
    docList: [],
    doc: 0,
    navtitle:'',
  },
  click: function (e) {
    var that = this
    wx.openLocation({
      latitude: parseInt(that.data.latitude),
      longitude: parseInt(that.data.longitude),
      scale: 18,
      name: that.data.name,
      address: that.data.dataItem.provinceName + that.data.dataItem.cityName + that.data.dataItem.districtName
    })
  },
  phone: function (e) {
    var that = this;
    var phone = e.currentTarget.dataset.phone;
    console.log(phone)
    if (phone == '') {
      wx.showToast({
        title:  '当前医院尚未收录号码',
        icon:'none'
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
  },
  hospitalDetail: function (e) {
    var that = this
    wx.navigateTo({
      url: '../twoYyHosIndex/twoYyHosIndex',
    })
  },
  hosXm: function (e) {
    var that = this
    wx.navigateTo({
      url: '../twoYyXm/twoYyXm',
    })
  },
  tske: function (e) {
    var that = this
    wx.navigateTo({
      url: '../twoYyKsIntro/twoYyKsIntro',
    })
  },
  moredoc: function (e) {
    var that = this
    wx.navigateTo({
      url: '../twoYyMoreDoc/twoYyMoreDoc',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  backHistory:function(e){
   wx.navigateBack({
     
   }) 
  },
  onLoad: function (options) {
    var that = this;
    var hospital_name = options.hospital_name;
    var userToken = wx.getStorageSync("userToken")
    that.setData({
      hospital_name: hospital_name,
      navtitle: hospital_name
    })
    wx.setNavigationBarTitle({
      title: hospital_name
    })
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/hospitalinfo/wgw',
      method: 'post',
      data: {
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            dataItem: res.data.data,
            docList: res.data.data.doctors,
            latitude: res.data.data.latitude,
            longitude: res.data.data.longitude,
            name: res.data.data.name,
          })
          var hos = res.data.data.name;
          for (var i = 0; i < that.data.docList.length; i++) {
            that.data.docList[i].hos = hos
          }
          that.setData({
            docList: that.data.docList,
          })
          if (res.data.data.doctors != '' || res.data.data.doctors != undefined || res.data.data.doctors != null) {
            that.setData({
              doc: 1,
            })
          } else {
            that.setData({
              doc: 0,
            })
          }
        }
      }
    })

  // var   app = getApp();
  //   this.setData({ version: app.globalData.appName });
  //   common.myfunc();  //最后我们需要执行才能生效！
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
    console.log(vm.statusBarHeight)
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

  }
})