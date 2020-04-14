// pages/selectRole/selectRole.js
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
  },
  hospital: function () {
    buttonDisabled: true
    this.setData({
      active1:'active',
      active2:'',
      active3:'',
      role:1,
    })
  },
  outpatient: function () {
    buttonDisabled: true
    this.setData({
      active1:'',
      active2:'active',
      active3:'',
      role:2,
    })
  },
  manage: function () {
    this.setData({
      active1:'',
      active2:'',
      active3:'active',
      role:3,
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
        wx.navigateTo({
          url: '../index/index',
        })
      // }
    }else if(this.data.role==2){
      wx.switchTab({
        url: '../out/index/index',
      })
    }else if(this.data.role==3){
      wx.navigateTo({
        url: '../manage/index/index',
      })
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