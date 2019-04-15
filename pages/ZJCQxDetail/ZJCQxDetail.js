// pages/ZJCQxDetail/ZJCQxDetail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: '',
    titleBarHeight: '',
    totalCountInShoppingcart:'',
    movies: [
      'https://www.njshangka.com/oss/zaylt/20181212151130574920504.png',
      'https://www.njshangka.com/oss/zaylt/20181212151130574920504.png',
      'https://www.njshangka.com/oss/zaylt/20181212151130574920504.png',
      'https://www.njshangka.com/oss/zaylt/20181212151130574920504.png'
    ],
    token: '',
    domain: '',
    title:'',
    qxdetails:'',
    pop:0,
    qxData:[],
    count:0,
  },
  addCg:function(e){
    this.setData({
      pop:1,
    })
  },
  close: function (e) {
    this.setData({
      pop: 0,
    })
  },
  add: function (e) {
    var that = this
    var num = e.currentTarget.dataset.num;
   
    var deviceId = e.currentTarget.dataset.id;
    num++;
    that.data.qxData.count++
    that.setData({
      qxData: that.data.qxData,
    })
  },
  del: function (e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    num--;
    that.data.qxData.count--
    that.setData({
      qxData: that.data.qxData,
    })
  },
  inputVal: function (e) {
    var that = this
    var val = e.detail.value
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (val > num) {
      var count = val - num
      that.data.qxData.count = that.data.qxData.count + count
      that.setData({
        qxData: that.data.qxData,
      })
    } else if (val < num && val > 0) {
      var count = num - val
      that.data.qxData.count = that.data.qxData.count - count
      that.setData({
        qxData: that.data.qxData,
      })
    } else if (val == 0) {
      that.data.qxData.count = 0
      that.setData({
        qxData: that.data.qxData,
      })
    }
  },
  makesureAdd:function(e){

    var that=this
   var num = e.currentTarget.dataset.num;
    var count = that.data.count;
    console.log(num)
    if (count <=num){
      if(count==0){
        that.setData({
          count: num,
          totalCountInShoppingcart: that.data.totalCountInShoppingcart + 1
        })
      }
      var val=num-count
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/move',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
          count: val,
          deviceId: that.data.qxData.deviceId,
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
          
          } else {
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      });
    }else if(count==0&&num==0){
    }else if(count!=0&&num<count){
      if(num!=0){
        wx.request({
          url: that.data.domain + '/zaylt/c/procurement/shoppingcart/sub',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            token: that.data.token,
            count: val,
            deviceId: that.data.qxData.deviceId,
          },
          method: 'post',
          success: function (res) {
            wx.hideToast()
            if (res.data.code == 0) {
            } else {
              wx.showModal({
                title: res.data.codeMsg
              })
            }
          }
        });
      }else{
        wx.request({
          url: that.data.domain + '/zaylt/c/procurement/shoppingcart/remove',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            token: that.data.token,
            deviceId: that.data.qxData.deviceId,
          },
          method: 'post',
          success: function (res) {
            wx.hideToast()
            if (res.data.code == 0) {
              that.setData({
                count:0,
                totalCountInShoppingcart: that.data.totalCountInShoppingcart - 1
              })
            } else {
              wx.showModal({
                title: res.data.codeMsg
              })
            }
          }
        });
      }
    }
    that.setData({
      pop:0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count=options.count;
    var that = this;
    var deviceId = options.deviceId
    var token = wx.getStorageSync('token')
    var domain = wx.getStorageSync('domain')
    console.log(domain)
    
    that.setData({
      token: token,
      domain: domain,
      count: count,
    })
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/deviceinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
        deviceId: deviceId,
      }, 
      async:true,
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var detailBdId = res.data.data.detailBdId
          res.data.data.count=count
          that.setData({
            qxData:res.data.data,
            title: res.data.data.name,
            movies: res.data.data.leadPics.split(','),
            totalCountInShoppingcart: res.data.data.totalCountInShoppingcart
          })
          wx.request({
            url: that.data.domain + '/zaylt/other/bigdata/' + detailBdId + '/' + detailBdId,
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
              token: that.data.token,
              deviceId: deviceId,
            },
            async: true,
            method: 'post',
            success: function (res) {
              console.log(res.data)
              // that.setData({
              //   qxdetails: res.data
              // })
              var info = res.data;
              WxParse.wxParse('info', 'html', info, that, 5);
            }
          });
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    });  
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