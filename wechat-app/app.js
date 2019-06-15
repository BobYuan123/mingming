App({
  onLaunch: function () {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          var code = res.code
          wx.request({
            url: 'https://more.easystore.shop/api/user/userInfo/wxlogin',
            method: 'get',
            data: {
              appid: that.globalData.AppId,
              appsecret: that.globalData.AppSecret,
              code: code
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res1) {
              that.globalData.cookie = res1.data.data
            },
            fail: function (e) {
              wx.showToast({
                title: '网络异常！',
                duration: 2000
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // wx.request({
    //   url: 'https://more.easystore.shop/api/store/storeInfo/1',
    //   method: 'get',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     that.globalData.storeId = res.data.data.storeId
    //     that.globalData.storeName = res.data.data.storeName
    //     that.globalData.storeMajoyBus = res.data.data.storeMajoyBus
    //   },
    //   fail: function (e) {
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000
    //     });
    //   },
    // })
  },
  /* 登录 */
  onLogin: function (options) {
    var that = this
  },

  globalData: {
    storeId:1,
    AppId:"wx173a981e79bb0654",
    AppSecret:"51a1698f326337d94913c33dbbd3de6a"
  },
})