// pages/hospitalList/hospitalList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '首页',
    statusBarHeight: '',
    titleBarHeight: '',

    toPageNo: '',
    hospitalSchemeList: [],
    hos:1,
  },
  kongadd:function(e){
      wx.navigateTo({
        url: '../addHospital/addHospital',
      })
  },
  qhzh: function (e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/hospital/hospitals',
      method: 'post',
      data: {
        page_no: toPageNo,
        page_size: pageSize,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          if (toPageNo == 1 && res.data.data.hospitals.items.length == 0){
            that.setData({
              hos: 1,
            });
          }else{
            that.setData({
              hos: 2,
            });
          }
          that.setData({
            schemeList: res.data.data,
          })
          var hospitalSchemeList = that.data.hospitalSchemeList;
          var newHospitalSchemeList = hospitalSchemeList.concat(res.data.data.hospitals.items)
          if (res.data.data.hospitals.items.length == 0) {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
              toPageNo: String(toPageNo)
            });
          }
        }


        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      hospitalSchemeList: [],
    })
    that.lastPage(0)
    wx.stopPullDownRefresh()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },



  onShow: function (options) {
    var that = this;
    that.setData({
      hospitalSchemeList:[]
    })
    that.lastPage(0);
  },
  edit:function(e){
    var hospitalId = e.currentTarget.dataset.hospitalid;
    console.log(hospitalId)
    wx.navigateTo({
      url: '../KedithospitalDetails/KedithospitalDetails?hospitalId=' + hospitalId,
    })
  },

  add:function(){
      wx.navigateTo({
        url: '../addHospital/addHospital',
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