var json = require("../../data/Home_data.js")
//获取应用实例  
var app = getApp();
Page({
    data: {
      typeTree: [], // 数据缓存
      detailTree: [],
      currType: 0,
      goodsList: [],
    },
    onShow: function () {
      this.onLoad();
    },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: json.api_Name.GetCateGory + "?storeId=" + app.globalData.storeId,
      method: 'get',
      data: { storeId: 1 },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          typeTree: res.data.data.rootProdCateInfoList,
          detailTree: res.data.data.allProdCateInfoList,
          currType: res.data.data.rootProdCateInfoList[0].id,
        });
        var detailTree = res.data.data.allProdCateInfoList;
        var currType = res.data.data.rootProdCateInfoList[0].id;
        var goods = [];
        for (let i = 0; i < detailTree.length; i++) {
          if(detailTree[i].pid === currType)
            goods.push(detailTree[i]);
        } 
        that.setData({
          goodsList: goods,
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
  tapType:function(e){
    var detailTree = this.data.detailTree;
    var currType = e.currentTarget.dataset.id;
    var goods = [];
    for (let i = 0; i < detailTree.length; i++) {
      if (detailTree[i].pid === currType)
        goods.push(detailTree[i]);
    }
    this.setData({
      currType: e.currentTarget.dataset.id,
      goodsList: goods,
    });
  }
})