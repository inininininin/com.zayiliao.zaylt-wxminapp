// pages/MZdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    headmanName:'',
    contactTel:'',
    address:'',
    remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var clinicId = options.clinicId;
    // console.log(clinicId)
    var s = clinicId.split("'");
    that.setData({
      name: s[0],
      headmanName: s[1],
      contactTel: s[2],
      address: s[3],
      remark: s[4],
    })
   
    // console.log(s[0])
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