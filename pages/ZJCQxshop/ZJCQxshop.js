// pages/ZJCQxshop/ZJCQxshop.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qixienum: '0',
    showList: [],
    token: '',
    navtitle: '器械采购',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    scrollHeight:'',
    movies: [
      // 'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
      // 'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
      // 'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
    ],
    swiperCurrent: 0,
    leftborder: '',
    rootcateList: '',
    showIs:false,
  },
  searchBox(e){
    wx.navigateTo({
      url: '../ZJCQxshopSearch/ZJCQxshopSearch',
    })
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  lastpage: function() {
    var that = this
    wx.request({
      url: app.globalData.url + '/c/procurement/devicetypes',
      // url: app.globalData.url +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn:1,
        ps:1000,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {

          for (var i = 0; i < res.data.data.items.length; i++) {
            if (i == 0) {
              res.data.data.items[i].color = 'rgb(0,183,238)'
              res.data.data.items[i].colors = 'rgb(0,183,238)'
              res.data.data.items[i].bgcolor = '#fff'
            } else {
              res.data.data.items[i].color = 'rgb(51,51,51)'
              res.data.data.items[i].colors = '#f8f8f8'
              res.data.data.items[i].bgcolor = '#f8f8f8'
            }
          }
          that.setData({
            rootcateList: res.data.data.items,
          })
          var name = res.data.data.items[0].name;
          wx.request({
            url: app.globalData.url + '/c/procurement/devicelist',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            data: {
              token: app.globalData.token,
              pn: 1,
              ps: 1000,
              typeName: name,
            },
            method: 'post',
            success: function(res) {
              wx.hideToast()
              if (res.data.code == 0) {
                for (var i = 0; i < res.data.data.items.length; i++) {
                  if (res.data.data.items[i].cover.slice(0, 1) != 'h') {
                    res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
                  }
                }
                that.setData({
                  showList: res.data.data.items,
                })
                var showList = that.data.showList
              } else {
                wx.showModal({
                  showCancel: false,
                  title: res.data.codeMsg
                })
              }
            }
          });
        } else {
          wx.showModal({
            title: res.data.codeMsg,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../login/login',
                })
              } else if (res.cancel) {
                
              }
            }
          })
        }
      }
    });
  },
  listNum: function() {
    var that = this
    wx.request({
      url: app.globalData.url + '/c/procurement/shoppingcart/list',
      // url: app.globalData.url +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: 1,
        ps: 1000,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            qixienum: res.data.data.totalCount
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    
    // wx.setStorageSync('token', '220703828955')
    var domain = 'https://www.njshangka.com'
    var token = wx.getStorageSync('token')
    that.setData({
      token: token,
      domain: 'https://www.njshangka.com'
    })
    wx.setStorageSync('domain', domain)
    wx.request({
      url: app.globalData.url + '/c/procurement/entpg',
      // url: app.globalData.url +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.ads.length; i++) {
            if (res.data.data.ads[i].cover.slice(0, 1) != 'h') {
              res.data.data.ads[i].cover = app.globalData.url + res.data.data.ads[i].cover
              
            }
          }
          that.setData({
            movies: res.data.data.ads
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });
   
    
  },
  changeCate: function(e) {
    var country = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var that = this;
    for (var i = 0; i < that.data.rootcateList.length; i++) {
      if (that.data.rootcateList[i].typeId == id) {
        that.data.rootcateList[i].color = 'rgb(0,183,238)'
        that.data.rootcateList[i].colors = 'rgb(0,183,238)'
        that.data.rootcateList[i].bgcolor = '#fff'
      } else {
        that.data.rootcateList[i].color = 'rgb(51,51,51)'
        that.data.rootcateList[i].colors = '#f8f8f8'
        that.data.rootcateList[i].bgcolor = '#f8f8f8'
      }
    }
    var rootcateList = that.data.rootcateList
    that.setData({
      rootcateList: rootcateList,
    })
    wx.request({
      url: app.globalData.url + '/c/procurement/devicelist',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        pn: 1,
        ps: 1000,
        typeName: name,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length;i++){
            if (res.data.data.items[i].cover.slice(0,1)!='h'){
              res.data.data.items[i].cover = app.globalData.url+res.data.data.items[i].cover
            }
          }
          that.setData({
            showList: res.data.data.items,
          })
          var showList = that.data.showList
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });

  },
  add: function(e) {
    var that = this
    var num = e.currentTarget.dataset.num;
    if(num==0){
      that.setData({
        qixienum: that.data.qixienum+1
      })
    }
    var deviceId = e.currentTarget.dataset.id;
    num++;
    wx.request({
      url: app.globalData.url + '/c/procurement/shoppingcart/move',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        token: app.globalData.token,
        count: 1,
        deviceId: deviceId,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for (var i = 0; i < that.data.showList.length; i++) {
            if (that.data.showList[i].deviceId == deviceId) {
              that.data.showList[i].countInShoppingcart++;
            }
          }
          that.setData({
            showList: that.data.showList,
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.codeMsg
          })
        }
      }
    });

  },
  del: function(e) {

    var that = this
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    num--;
    if (num == 0) {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart--;
              }
            }
            that.setData({
              showList: that.data.showList,
              qixienum: that.data.qixienum -1
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    } else {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: 1,
          deviceId: deviceId,
        },
        method: 'post',
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart--;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    }


  },
  inputVal: function(e) {
    var that = this
    var val = e.detail.value
    var num = e.currentTarget.dataset.num;
    var deviceId = e.currentTarget.dataset.id;
    if (val > num) {
      var count = val - num
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: count,
          deviceId: deviceId,
        },
        method: 'post',
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val < num && val > 0) {
      var count = num - val
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          count: count,
          deviceId: deviceId,
        },
        method: 'post',
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val == 0) {
      wx.request({
        url: app.globalData.url + '/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          token: app.globalData.token,
          deviceId: deviceId,
        },
        method: 'post',
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            for (var i = 0; i < that.data.showList.length; i++) {
              if (that.data.showList[i].deviceId == deviceId) {
                that.data.showList[i].countInShoppingcart = val;
              }
            }
            that.setData({
              showList: that.data.showList,
              qixienum: that.data.qixienum - 1
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: res.data.codeMsg
            })
          }
        }
      });
    }
  },
  shoppingCartList:function(e){
    wx.navigateTo({
      url: '../ZJCOrder/ZJCOrder',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    const vm = this
    // console.log(wx.getSystemInfoSync().windowHeight - getApp().globalData.statusBarHeight - getApp().globalData.titleBarHeight-150)
    vm.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - getApp().globalData.statusBarHeight - getApp().globalData.titleBarHeight - 150,
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },

  backHistory: function(e) {
    wx.navigateBack({

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this
    that.lastpage();
    that.listNum();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    that.setData({
      rootcateList: [],
    })
    that.lastpage()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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