// pages/HosoutpatientList/HosoutpatientList.js
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '病员列表',
    statusBarHeight: '',
    titleBarHeight: '',
    toPageNo: '',
    hospitalSchemeList: [],

  },
  // 一键拨号
  phoneNow:function(e){
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone ,
    })
  },
  remarkUrl:function(e){
    var patientId = e.currentTarget.dataset.patientid;
    wx.navigateTo({
      url: "../remarks/remarks?patientId="+patientId,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/patientinfo/patients',
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

          var hospitalSchemeList = that.data.hospitalSchemeList;
          var newHospitalSchemeList = hospitalSchemeList.concat(res.data.data.patients.items)
          if (res.data.data.patients.items.length == 0) {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
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
        var addTime, realname, tel
        for (var i = 0; i < that.data.hospitalSchemeList.length; i++) {
          addTime = that.data.hospitalSchemeList[i].addTime
          realname = that.data.hospitalSchemeList[i].realname
          tel = that.data.hospitalSchemeList[i].tel
          that.data.hospitalSchemeList[i].tel = tel.slice(0, 11)
          that.data.hospitalSchemeList[i].realname = realname.slice(0, 4)
          that.data.hospitalSchemeList[i].addTime = that.dateChange(addTime)
        }

       
        // console.log(that.data.hospitalSchemeList)
        that.setData({
          hospitalSchemeList: that.data.hospitalSchemeList,
        })
      }
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.setData({ flag: false })
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
    console.log(123)
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },



  onShow: function (options) {
    var that = this;
    that.setData({
      hospitalSchemeList:[],
    })
    that.lastPage(0);
    // console.log(that.data.hospitalSchemeList)
    // wx.setNavigationBarTitle({
    //   title: that.data.hospitalSchemeList[0].hospitalName
    // })

  },

  add: function () {
    wx.navigateTo({
      url: '../MZaddpatient/MZaddpatient',
    })
  },
  referral: function (e) {
    var that = this;
    var patientId = e.currentTarget.dataset.patientid;
    var userToken = wx.getStorageSync("userToken")
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/c/e/patientinfo/transferdiagnose',
      method: 'post',
      data: {
        patient_id: patientId,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
           
          for (var i = 0; i < that.data.hospitalSchemeList.length; i++) {
            if (that.data.hospitalSchemeList[i].patientId == patientId){
              that.data.hospitalSchemeList[i].status = '3'
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
  dateChange: function (data) {
    var date = new Date(data)
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
})