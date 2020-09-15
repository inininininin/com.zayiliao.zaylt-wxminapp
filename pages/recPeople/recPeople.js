// pages/recPeople/recPeople.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navtitle: '人员列表',
    schemeList: [],
    showIs: true,
    password: '',
    name: '',
    account: '',
    phone: '',
    remark: '',
    passwordConfirm: '',
    changeIs: ''
  },
  search() {
    wx.navigateTo({
      url: '../recPeopleSearch/recPeopleSearch',
    })
  },
  lookDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../recPeopleDetail/recPeopleDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  passwordConfirm(e) {
    this.setData({
      passwordConfirm: e.detail.value
    })
  },
  remark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  save(e) {
    var that = this
    if (that.data.name == '' || that.data.phone == '' || that.data.password == '' || that.data.passwordConfirm == '') {
      wx.showToast({
        title: '请填写完整表格',
        icon: 'loading'
      })
    } else if (that.data.passwordConfirm != that.data.password) {
      wx.showToast({
        title: '输入密码不一致',
        icon: 'loading'
      })
    } else {
      wx.request({
        url: app.globalData.url + '/hospital/def/hospital-operator-user-add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        data: {
          type: 1,
          password: that.data.password,
          name: that.data.name,
          phone: that.data.phone,
          // remark: that.data.remark,
          passwordConfirm: that.data.passwordConfirm
        },
        method: 'post',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '新增成功',
            })

            setTimeout(function () {
              that.setData({
                showIs: true,
                schemeList: []
              })
              that.lastPage(0);
            }, 500)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage(0)
  },
  lastPage: function (toPageNo) {
    var that = this
    toPageNo++
    wx.request({
      url: app.globalData.url + '/hospital/def/hospital-operator-users',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data: {
        pn: toPageNo,
        ps: 15,
        type: 1
      },
      method: 'get',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var schemeListArr = that.data.schemeList;
          var newSchemeListArr = schemeListArr.concat(res.data.data.rows)
          if (res.data.data.rows.length == 0) {
            that.setData({
              schemeList: newSchemeListArr,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              schemeList: newSchemeListArr,
              toPageNo: String(toPageNo)
            });
          }
          that.setData({
            schemeList: that.data.schemeList,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  backHistory: function (e) {
    wx.navigateBack({

    })
  },
  changeAdd(e) {
    var showIs = !this.data.showIs
    this.setData({
      showIs: showIs,
      name: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      remark: '',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.changeIs == 1) {
      this.setData({
        schemeList: [],
      })
      this.lastPage(0)
    }
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
    var that = this
    that.setData({
      schemeList: [],
    })
    that.lastPage(0)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})