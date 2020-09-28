// pages/ZJCOrder/ZJCOrder.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '兑换列表',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    addressIf: '1',
    domain: '',
    token: '',
    showList: [],
    addressIf: '',
    addressList: [],
    id: '',
    cover: '',
    name: '',
    intro: '',
    commodityId: '',
    payExchangepoint: '',
    count: '1',
    stock: '',
    submitIf:true,
  },
  add: function (e) {
    var that = this
    var num = e.currentTarget.dataset.num;
    if (num < that.data.stock) {
      num++
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
      })

    }
    that.setData({
      count: num
    })
  },
  del: function (e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (1 < num && num <= that.data.stock) {
      num--
    } else if (1 >= num) {
      wx.showToast({
        title: '兑换数量最少为1',
        icon: 'none',
      })
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
      })
    }
    that.setData({
      count: num
    })

  },
  inputVal: function (e) {
    var that = this
    var val = e.detail.value
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (0 < val && val <= that.data.stock) {
      num--
    } else if (0 >= val) {
      wx.showToast({
        title: '兑换数量最少为1',
        icon: 'none',
      })
      that.setData({
        count: 1
      })
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
      })
      that.setData({
        count: that.data.stock
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  listNum: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/commoditydetail',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        commodityId: that.data.id,
        pn: 1,
        ps: 100,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          // if (res.data.data.cover.slice(0,1)!='h'){
          //   res.data.data.cover = app.globalData.url + res.data.data.cover
          // }
          res.data.data.cover = app.cover(res.data.data.cover)
          that.setData({
            cover: res.data.data.cover,
            name: res.data.data.name,
            intro: res.data.data.intro,
            commodityId: res.data.data.commodityId,
            payExchangepoint: res.data.data.payExchangepoint,
            stock: res.data.data.stock,
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id
    that.setData({
      id: id,
    })
    that.listNum();


  },
  submit: function (e) {
    var that = this
    that.setData({
      submitIf:false
    })
    var str = { commodities: [{ id: that.data.id, count: that.data.count }] }
    var param = JSON.stringify(str)
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/orderconfirm',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        param: param
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var receiverId = res.data.data.receiver.receiverId
          var strs = { receiverId: receiverId, commodities: [{ id: that.data.id, count: that.data.count }] }
          var params = JSON.stringify(strs)
          wx.request({
            url: app.globalData.url + '/clientend2/clinicend/pointexchange/order',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              param: params
            },
            method: 'post',
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                wx.showToast({
                  title: '兑换成功',
                  icon: 'none',
                  duration: 2000,
                  success: function (res) {
                    
                    setTimeout(function(){
                      wx.navigateBack({
                        delta: 1,
                      })
                      that.setData({
                        submitIf:true
                      })
                    },1000)
                   
                  }
                })

                // setTimeout(function () {
                //   wx.navigateBack({
                //     delta: 1,
                //   })
                // }, 1000)
              } else {
                that.setData({
                  submitIf:true
                })
                wx.showToast({
                  title: res.data.codeMsg,
                  icon: 'none'
                })
              }
            }
          });
        } else {
          that.setData({
            submitIf:true
          })
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    });
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
    var that = this
    wx.request({
      url: app.globalData.url + '/clientend2/clinicend/pointexchange/receivers',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        pn: 1,
        ps: 1,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            addressIf: res.data.data.totalCount,
          })
          if (res.data.data.items != '' && res.data.data.items != null && res.data.data.items != undefined) {
            var address1 = res.data.data.items[0].address.split('%$')[0]
            var address2 = res.data.data.items[0].address.split('%$')[1]
            res.data.data.items[0].address1 = address1
            res.data.data.items[0].address2 = address2
            that.setData({
              addressList: res.data.data.items[0]
            })

          }
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    });
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