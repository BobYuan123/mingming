var json = require("../../data/Home_data.js")
//获取应用实例  
var app = getApp();
Page({

  /* 页面的初始数据* /
  data: {
    
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    // app.onLogin();
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: json.api_Name.NewGoods + app.globalData.storeId + '&&threeSession=' + app.globalData.cookie,
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
  },
  // 跳转子页面 详情页面
  btn:function(e){
    var SpuId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/home-details/home-details?id=' + SpuId,
    })
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  
})