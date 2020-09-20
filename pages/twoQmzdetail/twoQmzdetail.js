// pages/twoQmzdetail/twoQmzdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '门诊详情',
    statusBarHeight: '',
    titleBarHeight: '',
    schemeList:[],
    patients:[],
    long:0,
    clinicId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var clinicId = options.clinicId;
    var s = clinicId.split("'");
    clinicId = s[5];
   
    var that = this;
    that.setData({
      clinicId: clinicId,
    })
    var userToken = wx.getStorageSync("userToken");
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/clinic/clinichome',
      method: 'post',
      data: {
        id: clinicId,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,
          })
          var addTime;
          for (var i = 0; i < that.data.schemeList.length; i++) {
            addTime = that.data.schemeList[i].addTime
            that.data.schemeList[i].addTime = that.dateChange(addTime)
          }
          that.setData({
            schemeList: that.data.schemeList,
          })

          var patients = res.data.data.patients;
          if (res.data.data.patients.length>2){
            patients = patients.splice(0,2)
            that.setData({
              patients: patients,
              long: 1,
            })
          }else{
            that.setData({
              patients: patients,
              long: 0,
            })
          }
          
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
      }
    })
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
  },
  backHistory: function (e) {
    wx.navigateBack({

    })
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
  onPullDownRefresh: function () {
  
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   var that = this
  //   var toPageNo = that.data.toPageNo
  //   that.lastPage(toPageNo)
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})