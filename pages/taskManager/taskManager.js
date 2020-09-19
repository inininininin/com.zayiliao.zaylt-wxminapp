// pages/out/taskCenter/taskCenter.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '任务管理',
    navtitle1:'设置首次任务',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    dis: 'none',
    list1: [],
    list2: [],
    showIs:true,
    showPerIs:false,
    title:'',
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
  firstIncome(e){
    let that=this
    wx.navigateTo({
      url: '../taskManagerSz/taskManagerSz?point='+e.currentTarget.dataset.point+'&id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name+'&intro='+e.currentTarget.dataset.intro+'&titles=设置首次任务',
    })
    // that.setData({
    //   showIs: false,
    //   taskId:e.currentTarget.dataset.id,
    //   modifytypes:1,
    //   title:e.currentTarget.dataset.name,
    //   showPerIs:false,
    // })
    // wx.request({
    //   url: app.globalData.url + '/c2/task/tasks',
    //   method: 'post',
    //   data: {
    //      hospitalId: app.globalData.hospitalId
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     'cookie': app.globalData.cookie
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       for (var i = 0; i < res.data.data.items.length; i++) {
    //         if (e.currentTarget.dataset.id == res.data.data.items[i].taskId){
    //           that.setData({
    //             intro: res.data.data.items[i].intro,
    //             exchangePoint: res.data.data.items[i].exchangePoint,
    //             exchangePointUpperPerDay: res.data.data.items[i].exchangePointUpperPerDay,
    //           })
    //         }
    //       }
    //     } else if (res.data.code == 20) {
    //       wx.navigateTo({
    //         url: '../../login/login',
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.codeMsg
    //       })
    //     }
    //   }
    // })
  },
  secondIncome(e) {
    let that = this
    wx.navigateTo({
      url: '../taskManagerSz/taskManagerSz?point='+e.currentTarget.dataset.point+'&id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name+'&intro='+e.currentTarget.dataset.intro+'&titles=设置每日任务',
    })
    // that.setData({
    //   showIs: false,
    //   taskId: e.currentTarget.dataset.id,
    //   modifytypes:2,
    //   title: e.currentTarget.dataset.name,
    //   showPerIs:true,
    // })
    // wx.request({
    //   url: app.globalData.url + '/c2/task/tasks',
    //   method: 'post',
    //   data: {
    //      hospitalId: app.globalData.hospitalId
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     'cookie': app.globalData.cookie
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       for (var i = 0; i < res.data.data.items.length; i++) {
    //         if (e.currentTarget.dataset.id == res.data.data.items[i].taskId) {
    //           that.setData({
    //             intro: res.data.data.items[i].intro,
    //             exchangePoint: res.data.data.items[i].exchangePoint,
    //             exchangePointUpperPerDay: res.data.data.items[i].exchangePointUpperPerDay,
    //           })
    //         }
    //       }
    //     } else if (res.data.code == 20) {
    //       wx.navigateTo({
    //         url: '../../login/login',
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.codeMsg
    //       })
    //     }
    //   }
    // })
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
        } else{
          wx.showToast({
            title: '已取消',
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
  add(id, type){  
    let that=this 
    wx.request({
      url: app.globalData.url + '/c2/task/taskissue',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId,
        taskId:id,
        // exchangePoint: that.data.exchangePoint,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (type==1){
            for (var i in that.data.list1) {
              if (id == that.data.list1[i].taskId) {
                that.data.list1[i].issueIs = 1
              }
            }
          }else{
            for (var i in that.data.list2) {
              if (id == that.data.list2[i].taskId) {
                that.data.list2[i].issueIs = 1
              }
            }
          }
          that.setData({
            list1: that.data.list1,
            list2: that.data.list2,
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
  
  refuse(id,type) {
    let that=this
    wx.request({
      url: app.globalData.url + '/c2/task/taskunissue',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId,
        taskId: id,
        // exchangePoint: that.data.exchangePoint,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (type == 1) {
            for (var i in that.data.list1) {
              if (id == that.data.list1[i].taskId) {
                that.data.list1[i].issueIs = 0
              }
            }
          } else {
            for (var i in that.data.list2) {
              if (id == that.data.list2[i].taskId) {
                that.data.list2[i].issueIs = 0
              }
            }
          }
          that.setData({
            list1: that.data.list1,
            list2: that.data.list2,
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
  selectThis(e){
    if (e.currentTarget.dataset.issueis==1){
      this.refuse(e.currentTarget.dataset.id, 1)
    }else{
      this.add(e.currentTarget.dataset.id, 1)
    }
  },
  selectThis1(e) {
    if (e.currentTarget.dataset.issueis == 1) {
      this.refuse(e.currentTarget.dataset.id, 2)
    } else {
      this.add(e.currentTarget.dataset.id, 2)
    }
  },
  look: function (e) {
    this.setData({
      dis: 'block',
    })
  },
  close: function (e) {
    this.setData({
      dis: 'none',
    })
  },
  gofinish: function (e) {
    var url = e.currentTarget.dataset.url
    if (url == 1 || url == 5) {
      wx.navigateTo({
        url: '../../login/login',
      })
    } else if (url == 3 || url == 4 || url == 7 || url == 8 || url == 10) {
      wx.switchTab({
        url: '../hospital/hospital',
      })
    } else if (url == 6 || url == 9 || url == 12 || url == 11) {
      wx.switchTab({
        url: '../index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let that = this
    that.setData({
      list1: [],
      list2: []
    })
    
    wx.request({
      url: app.globalData.url + '/c2/task/tasks',
      method: 'post',
      data: {
         hospitalId: app.globalData.hospitalId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {

        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].oneTimeIs == 1) {
              var  list1 = that.data.list1.concat(res.data.data.items[i])
              that.setData({
                list1: list1
              })
            } else if (res.data.data.items[i].everyDayIs==1) {
              var list2 = that.data.list2.concat(res.data.data.items[i])
              that.setData({
                list2: list2
              })
            }
          }


          that.setData({
            list1: list1,
            list2: list2
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