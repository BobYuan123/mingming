// pages/address/user-address/user-address.js
var json = require("../../../data/Home_data.js")
var app = getApp();
Page({
  data: {
    addressItems:[],
    hiddenAddress:false,
    userId: 1
  },
  onLoad: function (options) {

  },

  onShow: function () {
    var that = this;
    wx.request({
      url: json.api_Name.GetAddress + app.globalData.storeId + '&&threeSession=' + app.globalData.cookie,
      
      method: 'get',
      header:  {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].is_default = "0";
        }
        that.setData({
          addressItems: res.data.data,
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
  setDefault: function(e) {
    var addressItems = this.data.addressItems
    var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
    addressItems[index].defaultAddr = 1;
    for(let i = 0;i<addressItems.length;i++)
    {
      if (i != index && addressItems[i].defaultAddr == 1)
        addressItems[i].defaultAddr = "0";
    }
    wx.showModal({
      title: "提示",
      content: "默认地址设置成功！",
      showCancel: false,
      duration: 1000
    })
    wx.request({
      url: json.api_Name.GetAddress + app.globalData.storeId + "&userId=" + that.data.userId,
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].is_default = "0";
        }
        that.setData({
          addressItems: res.data.data,
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
  saveAddress: function (e) {
    wx.navigateTo({
      url: '../address?id=' + e.currentTarget.dataset.id 
    })
  },
  delAddress: function (e) {
    var addressItems = this.data.addressItems  //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该地址？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: json.api_Name.DeleteAddress + addressItems[index].receiveAddrId,
            method: 'delete',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.showToast({
                title: '删除成功！',
                duration: 2000
              });
              wx.request({
                url: json.api_Name.GetAddress + app.globalData.storeId + "&userId=" + that.data.userId,
                method: 'get',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  that.setData({
                    addressItems: res.data.data,
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
            fail: function (e) {
              wx.showToast({
                title: '网络异常！',
                duration: 2000
              });
            },
          })
        }
        else {
        }
      }
    })
  },
})