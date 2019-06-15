var json = require('../../data/Home_data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:0,
    hasAddress: false,
    addressInfo: null
  },

  goaddress:function(){
    wx.navigateTo({
      url: '../../pages/address/user-address/user-address',
    })
  },

  onShow:function(){
    var _this = this
    var addressItems = wx.getStorageSync("addressItems") || []
    for (let i = 0; i < addressItems.length; i++) {
      if (addressItems[i].is_default == "1")
      {
        _this.setData({
          addressInfo: addressItems[i]
        });
        break
      }
    }
  },

  pay:function(e){
    wx.showModal({
      title: '支付提示',
      content: '本程序仅用于演示，支付接口API已屏蔽！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var payId = options.id
    var data = json.homeIndex[payId]
    data.value = wx.getStorageSync("justAmount")
    var _amount = data.price * data.value
    this.setData({
      data:data,
      amount:_amount,
    })
  }
})