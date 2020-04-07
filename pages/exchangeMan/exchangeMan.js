// pages/ exchangeMan/exchangeMan.js
var utils = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    navtitle: '兑换管理',
    list:[],
    toPageNo:'',
    showIs:1,
    payExchangepoint:'',
    name: '',
    intro: '',
    stock: '',
    bgColor:'rgba(229,229,229,1)',
    color:'#999999',
    imgUrl:'',
    cover:'',
    imgType:1,
    imgId:'',
  },
  addNew(e){
    this.setData({
      showIs:2,
      type:1,
      payExchangepoint: '',
      name: '',
      intro: '',
      stock: '',
      imgUrl:''
    })
  },
  exchangeItem(e) {
    var that=this
    wx.request({
      url: app.globalData.url + '/c2/commodity/item',
      method: 'post',
      data: {
        itemId: e.currentTarget.dataset.id,
       },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            showIs: 2,
            type: 2,
            name: res.data.data.name,
            payExchangepoint: res.data.data.payExchangepoint,
            intro: res.data.data.intro,
            stock: res.data.data.stock,
            itemId: e.currentTarget.dataset.id
          })
        }
      }
    })  
  },
  name(e){
    this.setData({
      name:e.detail.value
    })
  },
  intro(e) {
    this.setData({
      intro: e.detail.value
    })
  },
  stock(e) {
    this.setData({
      stock: e.detail.value
    })
  },
  payExchangepoint(e) {
    this.setData({
      payExchangepoint: e.detail.value
    })
  },
  nextPage(e){
    if (this.data.intro == '' || this.data.payExchangepoint == '' || this.data.stock == '' || this.data.name == '' ){
      wx.showToast({
        title: '请填写完整信息',
        icon:'loading',
      })
    }else{
      this.setData({
        showIs:3,
        imgType:''
      })
    }
  },
  imageModify(e){
    this.setData({
      showIs: 3,
      imgUrl: e.currentTarget.dataset.src,
      imgUrlBf: e.currentTarget.dataset.src,
      imgType:2,
      itemId:e.currentTarget.dataset.id,
    })
  },
  modify(e){
    var that=this
    wx.request({
      url: app.globalData.url + '/c2/commodity/itemalter',
      method: 'post',
      data: {
        hospitalId: app.globalData.hospitalId,
         name: that.data.name,
        stock: that.data.stock,
        payExchangepoint: that.data.payExchangepoint,
        intro: that.data.intro,
        cover: that.data.cover,
        itemId: that.data.itemId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          for(var i in that.data.list){
            if (that.data.itemId == that.data.list[i].itemId){
                that.data.list[i].payExchangepoint = that.data.payExchangepoint
                that.data.list[i].name = that.data.name
                that.data.list[i].stock = that.data.stock
                that.data.list[i].intro = that.data.intro
            }
          }
          that.setData({
            showIs: 1,
            list: that.data.list
          })
        }
      }
    })
  },
  save(e) {
    var that = this
    if (that.data.imgUrl == that.data.imgUrlBf){
      that.setData({
        showIs:1
      })
    }else{
      wx.request({
        url: app.globalData.url + '/c2/commodity/itemalter',
        method: 'post',
        data: {
          hospitalId: app.globalData.hospitalId,
           cover: that.data.cover,
          itemId: that.data.itemId,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        success: function (res) {
          if (res.data.code == 0) {
            for (var i in that.data.list) { 
              console.log(that.data.itemId, that.data.list[i].itemId)
              if (that.data.itemId == that.data.list[i].itemId) {  
                that.data.list[i].cover = that.data.imgUrl
                that.data.list[i].imgUrl = that.data.imgUrl
              }
            }
            console.log(that.data.cover, that.data.imgUrl,that.data.list)
            that.setData({
              list: that.data.list,
              showIs: 1
            })
          }
        }
      })
    }  
  },
  supply(e){
    var that=this
    if (this.data.color == '#999999') {
      wx.showToast({
        title: '填写完整信息',
      })
    } else {
      wx.request({
        url: app.globalData.url + '/c2/commodity/itemadd',
        method: 'post',
        data: {
          hospitalId: app.globalData.hospitalId,
           name: that.data.name,
          stock: that.data.stock,
          payExchangepoint: that.data.payExchangepoint,
          intro: that.data.intro,
          cover: that.data.cover,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': app.globalData.cookie
        },
        success: function (res) {
          if (res.data.code == 0) {
            
            that.setData({
              list:[],
              showIs:1
            })
            that.lastPage(0)
          }
        }
      })
    }
  
  },
  addPic: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var picBlob = that.data.picBlob
        for (var i in tempFilePaths) {
          wx.uploadFile({
            url: app.globalData.url + '/other/fileupload?cover&duration', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var data = JSON.parse(res.data);
              if (data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
              
                var cover = data.data.url
                if (data.data.url && data.data.url.slice(0,1)!='h'){
                  data.data.url = app.globalData.url + data.data.url
                }
                that.setData({
                  imgUrl: data.data.url,
                  bgColor:'rgba(43,119,239,1)',
                  color:'#fff',
                  cover: cover
                })
              }
            },
            fail: function (res) {
              console.log(res)
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
    this.lastPage(0)
  },
  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url +'/c2/commodity/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        hospitalId: app.globalData.hospitalId,
       },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          for (var i in res.data.data.items) {
            if (res.data.data.items[i].cover && res.data.data.items[i].cover.slice(0, 1) != 'h') {
              res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
            }
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: list,
            });
            wx.showToast({
              title: '数据已全部加载',
            })
          } else {
            that.setData({
              list: newlist,
              toPageNo: String(toPageNo)
            });
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }

        
        that.setData({
          list: that.data.list,
        })
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
  backHistory2(e){
    this.setData({
      showIs:1
    })
  },
  backHistory3(e) {
    this.setData({
      showIs: 2
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
    var that = this
    that.setData({
      list: [],
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