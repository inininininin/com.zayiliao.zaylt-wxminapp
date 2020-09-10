// pages/selectRole/selectRole.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userToken:'',
    // active1:'active',
    // role:1,
    active1:'',
    role:'',
    active2:'',
    active3:'',
    active4:'',
  },
  hospital: function () {
    buttonDisabled: true
    this.setData({
      active1:'active',
      active2:'',
      active3:'',
      active4:'',
      role:1,
      // hospitalIs:0,
      // clinicIs:0,
      // hospitalOperateIs:0,
      // operateIs:0
    })
  },
  outpatient: function () {
    buttonDisabled: true
    this.setData({
      active1:'',
      active2:'active',
      active3:'',
      active4:'',
      role:2,
    })
  },
  manage: function () {
    this.setData({
      active1:'',
      active2:'',
      active3:'active',
      active4:'',
      role:3,
    })
  },
  hosmanage: function () {
    this.setData({
      active1:'',
      active2:'',
      active3:'',
      active4:'active',
      role:4,
    })
  },
  goEnter:function(){
    // var that = this
    console.log(this.data.role)
    if(this.data.role==1){
      // if (res.data.data.type == 1) {
      //   wx.navigateTo({
      //     url: '../promoter/index/index',
      //   })
      // } else {
          wx.navigateTo({url: '../index/index', })
      // }
    }else if(this.data.role==2){
      wx.switchTab({
        url: '../out/index/index',
      })
    }else if(this.data.role==3){
      wx.navigateTo({
        url: '../manage/index/index',
      })
    }else if(this.data.role==4){
      wx.navigateTo({url: '../promoter/index/index',})
    }else{
      wx.showToast({
        title: '请选择登录端',
        icon:"none"
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userToken = wx.getStorageSync("userToken")
    this.setData({
      userToken: userToken,
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
    let that = this
    console.log(app.loginRefresh)
    that.setData({
      hospitalIs : app.loginRefresh.hospitalIs,
      clinicIs : app.loginRefresh.clinicIs,
      hospitalOperateIs : app.loginRefresh.hospitalOperateIs,
      operateIs : app.loginRefresh.operateIs,
    })
    that.hospitalIs = app.loginRefresh.hospitalIs;
    that.clinicIs = app.loginRefresh.clinicIs;
    that.hospitalOperateIs = app.loginRefresh.hospitalOperateIs;
    that.operateIs = app.loginRefresh.operateIs;
    console.log("sss")
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