// component/uploadPhoto/uploadPhoto.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgPath:[
      "/images/cm.jpg",
      "/images/cm.jpg",
      "/images/cm.jpg"
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectImg: function () {
      var that = this;
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          //res.tempFilePaths 返回图片本地文件路径列表
          var tempFilePaths = res.tempFilePaths;
          that.setData({
            imgPath: tempFilePaths
          })
        }
      })
    },
    previewImg: function (e) {
      var imgs = this.data.imgPath;
      var index = e.currentTarget.dataset.index;
      // 设置预览图片路径
      wx.previewImage({
        current: imgs[index],
        urls: imgs
      })
    },
    loadImg: function () {
      console.log("文件上传。。。。。。。。。");
      var that = this;
      wx.uploadFile({
        url: "https://localhost:8080/upload/upload",
        filePath: that.data.imgPath[0],
        name: "upload_file",
        // 请求携带的额外form data
        /*formData: {
          "id": id
        },*/
        header: {
          'Content-Type': "multipart/form-data"
        },
        success: function (res) {
          wx.showToast({
            title: "图像上传成功！",
            icon: "",
            duration: 1500,
            mask: true
          });
        },
        fail: function (res) {
          wx.showToast({
            title: "上传失败，请检查网络或稍后重试。",
            icon: "none",
            duration: 1500,
            mask: true
          });
        }
      })
    },
    deleteImg:function(e){
      var that = this;
      var imgs = that.data.imgPath;
      var index = e.currentTarget.dataset.index;//获取当前长按图片下标
      console.log(index)
      wx.showModal({
        title: '提示',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('点击确定了');
            imgs.splice(index, 1);
          } else if (res.cancel) {
            console.log('点击取消了');
            return false;
          }
          that.setData({
            imgPath: imgs
          })
      }
      })
    },
  }
})
