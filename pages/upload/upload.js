import weCropper from '../../we-cropper/dist/weCropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50


Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        //  获取到裁剪后的图片
        
        let pages = getCurrentPages();//当前页面
        let prevPage = pages[pages.length - 2];//上一页面
        console.log(avatar)
        prevPage.setData({//直接给上移页面赋值
          avatar: avatar,
          introPic1: avatar
        });
        wx.navigateBack({//返回
          delta: 1
        })

        // wx.redirectTo({
        //   url: '../cropper/cropper?avatar=' + avatar
        // })
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        console.log(src)
        self.wecropper.pushOrign(src)
       
      }
    })
  },
  onLoad(option) {
    // do something
    console.log(option)
    const {
      cropperOpt
    } = this.data
    const {
      src
    } = option
    if (src) {
      console.log(src)
      Object.assign(cropperOpt, {
        src
      })

      new weCropper(cropperOpt)
        .on('ready', function(ctx) {})
        .on('beforeImageLoad', (ctx) => {
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 3000
          })
        })
        .on('imageLoad', (ctx) => {
          wx.hideToast()
        })
    }
  },

 
})