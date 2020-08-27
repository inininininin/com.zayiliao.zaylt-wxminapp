// pages/hospitalDetails/hospitalDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinicIds:'',
    name: '',
    headmanName: '',
    contactTel: '',
    address: '',
    remark: '',
    clinicId:'',
  },
  outpatient: function () {
    var that=this;
    // wx.setStorageSync(clinicId, that.data.clinicId)
    var sss = that.data.clinicIds;
    // console.log(sss)
    wx.navigateTo({
      url: '../AllMzdetails/MZdetails?clinicId=' + sss,
    })
  },
  patient: function () {
    var that = this
    wx.navigateTo({
      url: '../KMZpatientList/KMZpatientList?clinicId=' + that.data.clinicId,
    })
  },
  hospital: function () {
    var that=this
    wx.navigateTo({
      url: '../KMZhospitalDetails/KMZhospitalDetails?clinicId=' + that.data.clinicId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var clinicId = options.clinicId;
    
    console.log(clinicId)
    var s = clinicId.split("'");
    wx.setNavigationBarTitle({
      title: s[0]+'首页'
    })

    that.setData({
      clinicIds:clinicId,
      
      name: s[0],
      headmanName: s[1],
      contactTel: s[2],
      address: s[3],
      remark: s[4],
      clinicId: s[5],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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