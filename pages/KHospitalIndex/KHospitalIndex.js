// pages/hospitalDetails/hospitalDetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: '',
    titleBarHeight: '',

    hospital_id: '',
    hospital_name:'',
  },
  outpatient: function () {
    var that = this;
    wx.navigateTo({
      url: '../twoMzlist/twoMzlist?hospital_id=' + that.data.hospital_id,
    })
  },
  patient: function () {
    var that = this
    wx.navigateTo({
      url: '../KHOpatientList/KHOpatientList?hospital_id=' + that.data.hospital_id,
    })
  },
  hospital: function () {
    var that = this
    wx.navigateTo({
      url: '../twoQhospitalDetail/twoQhospitalDetail?hospital_id=' + that.data.hospital_id + "&hospital_name=" + that.data.hospital_name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hospital_id = options.hospital_id;
    var hospital_name = options.hospital_name
    // console.log(clinicId)
    // var s = clinicId.split("'");
    that.setData({
      hospital_id: hospital_id,
      hospital_name: hospital_name,
      navtitle: hospital_name
    })
    wx.setNavigationBarTitle({
      title: hospital_name
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
  
    wx.stopPullDownRefresh()
  },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {
  //   var that = this
  //   var toPageNo = that.data.toPageNo
  //   that.lastPage(toPageNo)
  // },

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