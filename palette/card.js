export default class LastMayday {
   _image(url, index, rotate, borderRadius) {
  return (
    {
      type: 'image',
      url: url,
      css: {
        bottom: '40rpx',
        right: '24rpx',
        top: '24rpx',
        width: '200rpx',
        height: '200rpx',
        // top: `${startTop + 8.5 * gapSize}rpx`,
        // left: `${startLeft + 160 * index}rpx`,
        // width: '120rpx',
        // height: '120rpx',
        // shadow: '10rpx 10rpx 5rpx #888888',
        // rotate: rotate,
        borderRadius: borderRadius,
      },
    }
  );
};
  palette() {
    return ({
      width: '705rpx',
      height: '639rpx',
      top: '200rpx',
      background: '#eee',
      views: [
        // _textDecoration('overline', 0),
        // _textDecoration('underline', 1),
        // _textDecoration('line-through', 2),
        // _textDecoration('overline underline line-through', 3, 'red'),
        {
          type: 'rect',
          css: {
              width: '705rpx',
              right: '0;',
              top: '0',
              height: '350rpx',
              // shadow: '10rpx 10rpx 5rpx #888888',
              color: 'linear-gradient(-135deg, #fedcba 0%, rgba(18, 52, 86, 1) 20%, #987 80%)',
          }
        },
        {
          type: 'text',
          text: "这是一个标题标题这是一个标题标题这是一个标题标题这是一个标题标题",
          css: [{
            maxLines: 2,
            width:'400rpx',
            top: `${startTop + 5 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
            fontSize:'30',
          }, common],
        },
        // {
        //   type: 'text',
        //   text: '我是把width设置为400rpx后，我就换行了xx行了',
        //   css: [{
        //     top: `${startTop + 5 * gapSize}rpx`,
        //     align: 'center',
        //     width: '400rpx',
        //     background: '#538e60',
        //     padding: '10rpx',
        //   }, common, { left: '300rpx' }],
        // },
        {
          type: 'text',
          text: '北京第二中医院',
          css: [{
            // top: `${startTop + 7 * gapSize}rpx`,
            bottom:'80rpx',
            width: '300rpx',
            maxLines: 1,
            fontSize: '24rpx',
            color:'rgb(51,51,51)'
          }, common, { left: '105rpx' }],
        },
        // _image(0),
        // _des(0, '普通'),
        // _image(1, 30),
        // _des(1, 'rotate: 30'),
        // _image(2, 30, '20rpx'),
        // _des(2, 'borderRadius: 30rpx'),
        // _image(3, 0, '60rpx'),
        // _des(3, '圆形'),
        {
          type: 'image',
          url: '/palette/avatar.jpg',
          css: {
            bottom: '40rpx',
            right: '24rpx',
            top:'24rpx',
            borderRadius: '100rpx',
            // borderWidth: '10rpx',
            // borderColor: 'yellow',
            width: '200rpx',
            height: '200rpx',
          },
        },
        {
          type: 'image',
          url: '/palette/logos.png',
          css: {
            bottom: '60rpx',
            left: '24rpx',
            top: '24rpx',
            borderRadius: '100rpx',
            // borderWidth: '10rpx',
            // borderColor: 'yellow',
            width: '71rpx',
            height: '61rpx',
          },
        },
        // {
        //   type: 'qrcode',
        //   content: 'https://github.com/Kujiale-Mobile/Painter',
        //   css: {
        //     bottom: '40rpx',
        //     left: '180rpx',
        //     color: 'red',
        //     borderWidth: '10rpx',
        //     borderColor: 'blue',
        //     width: '200rpx',
        //     align:'center',
        //     height: '120rpx',
        //   },
        // },
        // {
        //   type: 'rect',
        //   css: {
        //     bottom: '40rpx',
        //     right: '40rpx',
        //     color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)',
        //     borderRadius: '20rpx',
        //     borderWidth: '10rpx',
        //     width: '120rpx',
        //     height: '120rpx',
        //   },
        // },
        {
          type: 'text',
          text: '浏览量：15800',
          css: {
            bottom: '40rpx',
            left: '24rpx',
            color: 'rgb(102,102,102)',
            fontSize:'24rpx',
            // borderWidth: '2rpx',
          },
        },
      ],
    });
  }
}

const startTop = 50;
const startLeft = 20;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
  
  fontSize: '40rpx',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(url,index, rotate, borderRadius) {
  return (
    {
      type: 'image',
      url: url,
      css: {
        bottom: '40rpx',
        right: '24rpx',
        top: '24rpx',
        width: '200rpx',
        height: '200rpx',
        // top: `${startTop + 8.5 * gapSize}rpx`,
        // left: `${startLeft + 160 * index}rpx`,
        // width: '120rpx',
        // height: '120rpx',
        // shadow: '10rpx 10rpx 5rpx #888888',
        // rotate: rotate,
        borderRadius: borderRadius,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
