// pages/KMZaddoutpatient/KMZaddoutpatient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toPageNo: '',
    hospitalSchemeList: [],
    hospitalId:'',
    iconSrc:'../img/down.png',
    remark:'',
    hospitalName: '',
    chargePeople: '',
    hospitalTel: '',
    address: '',
    phone:'',
    paddward:'',
    hospitalname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */

  hospitalName:function(e){
    this.setData({
      hospitalName: e.detail.value    
    })
  },
  chargePeople: function (e) {
    this.setData({
      chargePeople: e.detail.value
    })
  },
  hospitalTel: function (e) {
    this.setData({
      hospitalTel: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  passward: function (e) {
    this.setData({
      passward: e.detail.value
    })
  },

  lastPage: function (toPageNo) {
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    var pageSize = 300;
    var toPageNo = parseInt(toPageNo) + 1
    wx.request({
      url: 'https://www.njshangka.com/zaylt/c/d/e/clinic/add/hospitals',
      method: 'post',
      data: {
        page_no: toPageNo,
        page_size: pageSize,
        token: userToken,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            schemeList: res.data.data,

          })
          var hospitalSchemeList = that.data.hospitalSchemeList;
          var newHospitalSchemeList = hospitalSchemeList.concat(res.data.data.hospitals.items)
          if (res.data.data.hospitals.items.length == 0) {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
              // toPageNo: String(toPageNo)
            });
            wx.showToast({
              title: '数据已全部加载',
              icon: 'none',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              hospitalSchemeList: newHospitalSchemeList,
              toPageNo: String(toPageNo)
            });
          }
        }


        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../newLogin/newLogin',
          })
        }
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log(123)
    this.setData({ flag: false })
    wx.stopPullDownRefresh()
  },
  select:function(e){
    var that=this
    var hospitalId = e.currentTarget.dataset.hospitalid;
    var name = e.currentTarget.dataset.name;
    console.log(hospitalId)
    that.setData({
      hospitalId: hospitalId,
      hospitalSchemeList: [],
      iconSrc: '../img/down.png',
      hospitalname:name,
    })


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(123)
    var that = this
    var toPageNo = that.data.toPageNo
    that.lastPage(toPageNo)
  },
// 打开医院列表
  clickHos:function(e){
    var that=this;
    var src = e.currentTarget.dataset.src;
    console.log(src)
    if (src == '../img/down.png'){
      that.lastPage(0);
      that.setData({
        
        iconSrc: '../img/up.png'
      })
    }else{
      
      that.setData({
        hospitalSchemeList: [],
        iconSrc: '../img/down.png'
      })
    }
      
  },

  onLoad: function (options) {
    
  },
  submit:function(){
    var that=this;
    if (that.data.remark == '' || that.data.chargePeople == '' || that.data.hospitalName == ''
      || that.data.hospitalTel == ''
      || that.data.address == '' || that.data.passward == '' || that.data.phone==''){
      
      wx.showToast({
        title: '请将信息填写完整',
        icon:'none'
      })
      }else{


      var userToken = wx.getStorageSync("userToken")
      wx.request({
        url: 'https://www.njshangka.com/zaylt/c/d/e/clinic/add',
        header: {
          'Content-type': 'application/json'
        },
        data: {
          hospital_id: that.data.hospitalId,
          clinic_name: that.data.hospitalName,
          headman_name: that.data.chargePeople,
          contact_tel: that.data.hospitalTel,
          address: that.data.address,
          remark: that.data.remark,
          phone:that.data.phone,
          pwd:that.data.passward,
          token: userToken,
          // wxOpenId: openId
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
           wx.navigateBack({
             url: '../outpatientList/outpatientList',
           })
          }
          else {
            wx.showToast({
              title:  res.data.codeMsg,
              icon:'none'
            })
          }
        }
      })
      }
  },
  
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    var that = this
    return {
      title: '忠安医联体小程序',
      path: 'pages/logs/logs',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
    }
  },
})