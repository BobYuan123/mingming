var json = require("../../data/Home_data.js")

var app = getApp()
Page({
  data: {
  },
onLoad: function (options) {
  var objectId = options.title;
  var cateId = options.cataid;
  var that = this;
  wx.request({
    url: json.api_Name.GetGoodsByCateGory + "?storeId=" + app.globalData.storeId + "&cateId=" + cateId,
    method: 'get',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      that.setData({
        goodsList: res.data.data,
      });
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常！',
        duration: 2000
      });
    },
  })
  //更改头部标题
  wx.setNavigationBarTitle({
      title: objectId,
      success: function() {
      },
    });
  },
  //详情页跳转
  lookdetail: function (e) {
    console.log(e)
    var lookid = e.currentTarget.dataset.procuctid;
    console.log(lookid);
    wx.navigateTo({
      url: "../index/detail?id=" + lookid.id
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
    this.setData({
      current: e.detail.current,
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})
