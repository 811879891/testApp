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
    }
  },
  loadImg: function () {
    var that = this;
    wx.uploadFile({
      url: "http://localhost:8080/upload/upload",
      filePath: that.data.imgPath,
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
  }
})
