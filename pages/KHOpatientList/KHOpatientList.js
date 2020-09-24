// pages/HospatientDetails/HospatientDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    navtitle: '病员信息',
    statusBarHeight: '',
    titleBarHeight: '',
    toPageNo: '',
    schemeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hospital_id = options.hospital_id;
    that.setData({
      hospital_id: hospital_id,
    })


    that.nextPage(0)
  },
  nextPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/hospital/patients',
      method: 'post',
      data: {
        page_no: toPageNo,
        page_size: pageSize,
        hospital_id: that.data.hospital_id,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {


          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.patients.items)



          if (res.data.data.patients.items.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            // console.log(res.data.data.doctors.items.length)
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }


        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
        var addTime, realname,tel
        for (var i = 0; i < that.data.schemeList.length; i++) {
          addTime = that.data.schemeList[i].addTime
          realname = that.data.schemeList[i].realname
          tel = that.data.schemeList[i].tel
          that.data.schemeList[i].tel = tel.slice(0, 11)
          that.data.schemeList[i].realname = realname.slice(0,4)
          that.data.schemeList[i].addTime = that.dateChange(addTime)
        }
        // console.log(that.data.schemeList)
        that.setData({
          schemeList: that.data.schemeList,
        })
      }
    })
  },


  // 到底加载
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.nextPage(toPageNo)
  },
  //下拉刷新
  onPullDownRefresh: function () {

    this.setData({ flag: false })
    wx.stopPullDownRefresh()
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