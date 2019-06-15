// pages/paymore/paymore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    hasAddress: false,
    addressInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var cartItems = wx.getStorageSync("cartItems") 
    this.setData({
      cartList: false,
      cartItems: cartItems
    })
  },
  goaddress: function () {
    wx.navigateTo({
      url: '../../pages/address/user-address/user-address',
    })
  },
  select: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    var addressItems = wx.getStorageSync("addressItems") || []
    for (let i = 0; i < addressItems.length; i++) {
      if (addressItems[i].is_default == "1") {
        _this.setData({
          addressInfo: addressItems[i]
        });
        break
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})