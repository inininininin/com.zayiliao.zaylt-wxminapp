// pages/twoMzbylist/twoMzbylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '病员信息',
    statusBarHeight: '',
    titleBarHeight: '',
    clinic_id: '',
    toPageNo: '',
    hospitalSchemeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var clinic_id = options.id;
    that.setData({
      clinic_id: clinic_id,
    })

    that.lastPage(0);
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/clinicinfo/patientlist',
      method: 'post',
      data: {
        page_no: toPageNo,
        page_size: pageSize,
        id: that.data.clinic_id,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data.items,
          })
          var hospitalSchemeList = that.data.hospitalSchemeList;
          var newHospitalSchemeList = hospitalSchemeList.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
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

        var addTime
        for (var i = 0; i < that.data.hospitalSchemeList.length; i++) {
          addTime = that.data.hospitalSchemeList[i].addTime
          that.data.hospitalSchemeList[i].addTime = that.dateChange(addTime)
        }
        that.setData({
          hospitalSchemeList: that.data.hospitalSchemeList,
        })
      }
    })
  },
  makesure:function(e){
    var that = this;
    var patient_id = e.currentTarget.dataset.id;
    var userToken = wx.getStorageSync("userToken")
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/h/e/patientinfo/confirm',
      method: 'post',
      data: {
        patient_id: patient_id,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {

          for (var i = 0; i < that.data.hospitalSchemeList.length; i++) {
            if (that.data.hospitalSchemeList[i].id == patient_id) {
              that.data.hospitalSchemeList[i].status = '4'
            }
          }
          that.setData({
            hospitalSchemeList: that.data.hospitalSchemeList,
          })
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
    var that = this
    that.setData({
      hospitalSchemeList: [],
    })
    that.lastPage(0)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  dateChange: function (data) {
    var date = new Date(data)
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
})