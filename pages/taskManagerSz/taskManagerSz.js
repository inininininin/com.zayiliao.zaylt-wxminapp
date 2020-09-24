// pages/taskManagerSz/taskManagerSz.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modifytypes:'',
    intro:'',
    exchangePoint:0,
    exchangePointUpperPerDay:0,
  },
  intro(e){
    this.setData({
      intro:e.detail.value
    })
  },
  exchangePoint(e) {
    this.setData({
      exchangePoint: e.detail.value
    })
  },
  exchangePointUpperPerDay(e) {
    this.setData({
      exchangePointUpperPerDay: e.detail.value
    })
  },
  modify(modifytypes){
    let that=this
    if (modifytypes==1){
      var params = ''
    }else{
      var params = '?exchangePointUpperPerDay=' + that.data.exchangePointUpperPerDay
    }
    wx.request({
      url: app.globalData.url + '/c2/task/taskalter' + params,
      method: 'post',
      data: {
        hospitalId: app.globalData.hospitalId,
        taskId: that.data.taskId,
        intro: that.data.intro,
        exchangePoint: that.data.exchangePoint,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateBack()
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none',
          })
        }
      }
    })
  },
  saveBack(e){
    let that=this
    wx.showModal({
      title: '保存修改',
      content: '需要保存修改的内容吗？',
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "保存",
      confirmColor: "#2B77EF",
      success: function (res) {
        if (res.confirm) {
          that.modify(that.data.modifytype)     
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000,
            mask: true,
            complete: function complete(res) {
              setTimeout(function () {
                that.setData({
                  showIs: true,
                })
              }, 500);
            }
          })    
        }   
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( options.titles,options.intro,options.point)
    wx.setNavigationBarTitle({
      title: options.titles,
    })
    this.setData({
      exchangePointUpperPerDay:options.point,
      taskId:options.id,
      intro:options.intro,
      title:options.name,
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

  }
})