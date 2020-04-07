// pages/clinicDetail/clinicDetail.js
var app = getApp()
var utils = require('../../utils/util.js');
var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '',
    statusBarHeight: getApp().globalData.statusBarHeight,
    titleBarHeight: getApp().globalData.titleBarHeight,
    count: 0, // 设置 计数器 初始为0
    countTimer: null ,// 设置 定时器 初始为null
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['全部', '未就诊', '已就诊'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    list1: [],
    clinicId:'',
    status:'',
    totalCount:0,
    totalCount1:0,
    totalCount2:0
  },
  edit(e){
    wx.navigateTo({
      url: '../addClinic/addClinic?typesName=修改门诊&id=' + this.data.clinicId,
    })
  },
  makesure(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认就诊',
      content: '请确认患者就诊',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/c2/patient/confirmjiuzhen',
            method: 'post',
            data: {
              patientId: id,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 0) {
                  for (var i = 0; i < that.data.list1.length; i++) {
                    if (that.data.list1[i].itemId == id) {
                      console.log(that.data.list1[i].itemId)
                      that.data.list1[i].status = 4
                    }
                  }
                  that.setData({
                    list1: that.data.list1
                  })                             
              } else {
                wx.showToast({
                  title: res.data.codeMsg,
                })
              }
            }
          })
        }
      }
    })
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    var status
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    if (Indexs == 0) {
      status = ''
    } else if (Indexs == 1) {
      status = '1'
    } else if (Indexs == 2) {
      status = '4'
    } 
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      status: status,
      list1:[]
    });
    this.lastPage(0, status, this.data.clinicId)
  },
  countInterval: function() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        /* 绘制彩色圆环进度条 
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / (60 / 2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "21"
        });
        clearInterval(this.countTimer);
      }
    }, 100)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    var toPageNo=0 
    that.setData({
      clinicId: options.clinicId,
      toPageNo: 1,
      navtitle:options.name
    })
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: 1,
        ps: 15,
        status: '',
        clinicId: options.clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
              },
      success: function (res) {
        if (res.data.code == 0) {
            that.setData({
              totalCount: res.data.data.sum.totalCount,
              clinicNumber: res.data.data.sum.totalCount
            })
          var totalCount= res.data.data.sum.totalCount
          var list1 = that.data.list1;
          var newlist1 = list1.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list1: list1,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'loading',
              duration: 500
            })
          } else {
            that.setData({
              list1: newlist1,
            });
          }
          wx.request({
            url: app.globalData.url + '/c2/patient/items',
            method: 'post',
            data: {
              pn: 1,
              ps: 15,
              status: 4,
              clinicId: that.data.clinicId,
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': app.globalData.cookie
            },
            success: function (res) {
              if (res.data.code == 0) {
                console.log(that.data.totalCount, res.data.data.sum.totalCount)
                var totalCount1 = parseInt(res.data.data.sum.totalCount) 
                that.setData({
                  totalCount1: res.data.data.sum.totalCount,
                  totalCount2: parseInt(that.data.totalCount) - parseInt(res.data.data.sum.totalCount)
                })
                console.log(totalCount1)
                if (totalCount1==0){
                  var time=0
                }else{
                  var time = (totalCount1 / totalCount) * 2
                }
                
                console.log(time)
                that.drawCircle(time)
              } else if (res.data.code == 20 || res.data.code == 26) {
                wx.hideToast()
                wx.navigateTo({
                  url: '../../login/login',
                })
              }
            }
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }

        var pushTime
        for (var i = 0; i < that.data.list1.length; i++) {
          pushTime = that.data.list1[i].pushTime
          that.data.list1[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list1: that.data.list1,
        })
      }
    })
    // that.lastPage(0,'', options.clinicId)
  
  },
  drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(9); // 设置圆环的宽度
    ctx.setStrokeStyle('#FF951B'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(120, 60, 40, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function(step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    
    // var gradient = context.createLinearGradient(200, 100, 100, 200);
    
    // gradient.addColorStop("0", "#2661DD");
    // gradient.addColorStop("0.5", "#40ED94");
    // gradient.addColorStop("1.0", "#5956CC");

    context.setLineWidth(9);
    context.setStrokeStyle('#2B77EF');
    // context.setStrokeStyle(gradient);
    // context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(120, 60, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },

  lastPage: function (toPageNo, status, clinicId) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 15;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: app.globalData.url + '/c2/patient/items',
      method: 'post',
      data: {
        pn: toPageNo,
        ps: pageSize,
        status: status,
        clinicId: clinicId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 0) {
          if (status==''){
            that.setData({
              totalCount: res.data.data.sum.totalCount
            })
          }
            var list1 = that.data.list1;
            var newlist1 = list1.concat(res.data.data.items)
            if (res.data.data.items.length == 0) {
              that.setData({
                list1: list1,
                // toPageNo: String(toPageNo)
              });
              wx.showToast({
                title: '数据已全部加载',
                // icon: 'loading',
                // duration: 1500
              })
            } else {
              that.setData({
                list1: newlist1,
                toPageNo: String(toPageNo)
              });
            }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
        }

        var pushTime
        for (var i = 0; i < that.data.list1.length; i++) {
          pushTime = that.data.list1[i].pushTime
          that.data.list1[i].pushTime = app.dateChange(pushTime)
        }
        that.setData({
          list1: that.data.list1,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    

    vm.drawProgressbg();
    

    // vm.countInterval()
  },

  backHistory: function(e) {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
      list1: [],
    })
    this.lastPage(0, that.data.status, that.data.clinicId)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo, that.data.status, that.data.clinicId)
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