// pages/ZJCQxshop/ZJCQxshop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qixienum: '0',
    showList: [],
    token: '',
    navtitle: '器械采购',
    statusBarHeight: '',
    titleBarHeight: '',
    movies: [
      'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
      'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
      'https://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
    ],
    swiperCurrent: 0,
    leftborder: '',
    rootcateList: '',
  },

  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  lastpage: function() {
    var that = this
    wx.request({
      url: that.data.domain + '/zaylt/c/procurement/devicetypes',
      // url: that.data.domain +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
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
            url: that.data.domain + '/zaylt/c/procurement/devicelist',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
              token: that.data.token,
              pn: 1,
              ps: 100,
              typeName: name,
            },
            method: 'post',
            success: function(res) {
              wx.hideToast()
              if (res.data.code == 0) {
                that.setData({
                  showList: res.data.data.items,
                })
              } else {
                wx.showModal({
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
      url: that.data.domain + '/zaylt/c/procurement/shoppingcart/list',
      // url: that.data.domain +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
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
      url: that.data.domain + '/zaylt/c/procurement/entpg',
      // url: that.data.domain +'/zasellaid/adminarea/provinces',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            movies: res.data.data.ads
          })
        } else {
          wx.showModal({
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
      url: that.data.domain + '/zaylt/c/procurement/devicelist',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
        pn: 1,
        ps: 100,
        typeName: name,
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            showList: res.data.data.items,
          })
        } else {
          wx.showModal({
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
      url: that.data.domain + '/zaylt/c/procurement/shoppingcart/move',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        token: that.data.token,
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
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
              title: res.data.codeMsg
            })
          }
        }
      });
    } else {
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val < num && val > 0) {
      var count = num - val
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/sub',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
              title: res.data.codeMsg
            })
          }
        }
      });
    } else if (val == 0) {
      wx.request({
        url: that.data.domain + '/zaylt/c/procurement/shoppingcart/remove',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: that.data.token,
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
    vm.setData({
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

  }
})