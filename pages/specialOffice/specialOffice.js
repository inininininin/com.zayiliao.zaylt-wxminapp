// pages/specialOffice/specialOffice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    detail:'',
    imgList:[],
    items:[],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    showIs: false,
    current:1,
  },
  previewImage: function (e) {
    var currents = e.target.dataset.src;
    wx.previewImage({
      currents: currents, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  },
  lookDoctor(e){
    var that=this
    // this.setData({
    //   swiperCurrent: e.detail.current
    // })
    var id = e.currentTarget.dataset.id
    var items = that.data.items
    var link
    for (var i in items){
      if(id==items[i].itemId){
        link=i
      }
    }
    that.setData({
      showIs: true,
      current:link
    })
  },
  closeSwiper(e){
    this.setData({
      showIs:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.request({
      url: app.globalData.url + '/c2/office/item',
      method: 'post',
      data: {
        itemId: options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          var imgList=[];
          var shiYingZheng=[]
          if (res.data.data.shiYingZheng != '' && res.data.data.shiYingZheng != null && res.data.data.shiYingZheng != undefined){
            var shiYingZhengs = res.data.data.shiYingZheng.split(',')
            for (var i in shiYingZhengs) {
              shiYingZheng.push(shiYingZhengs[i])
            }
          }
          if (res.data.data.image != '' && res.data.data.image != null && res.data.data.image!=undefined){
            var image = res.data.data.image.split(',')
            
            for(var i in image){
              if (image[i].slice(0, 1) != 'h') {
                imgList.push(app.globalData.url + image[i])
              }else{
                imgList.push( image[i])
              }              
            }
            that.setData({
              imgList: imgList,
              shiYingZheng: shiYingZheng
            })
          }
          that.setData({
            detail: res.data.data,
            // license: res.data.data.license,
            navtitle: res.data.data.name
          })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../login/login',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })
    wx.request({
      url: app.globalData.url + '/c2/doctor/items',
      method: 'post',
      data: {
        hospitalId: app.globalData.hospitalId,
        officeId: options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
            var items = res.data.data.items
            for (var i in items) {
              if (items[i].headimg&&items[i].headimg.slice(0, 1) != 'h') {
                items[i].headimg = app.globalData.url + items[i].headimg
              } 
            }
            that.setData({
              items: items,
            })
        } else if (res.data.code == 20) {
          wx.navigateTo({
            url: '../../login/login',
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (app.globalData.lastClient == 1) {
      var path = '/pages/index/index'
    } else {
      var path = '/pages/out/index/index'
    }
    return {
      title: '欢迎使用共享医联体小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://zaylt.njshangka.com/favicon.ico', //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
})