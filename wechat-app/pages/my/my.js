Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName:null,
    userImage:null
  },
  onShow() {
    var _this = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              _this.setData({
                userImage: res.userInfo.avatarUrl,
                userName: res.userInfo.nickName
              })
            }
          })
        }
        else
        {
          wx.showModal({
            title: '提示',
            content: '你还未授权，授权后可获得完整体验 ',
            confirmText: '一键授权',
            success(res) {
              // 点击一键登录，去授权页面
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../pages/authsetting/authsetting',
                })
              }
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  about:function(){
    wx.navigateTo({
      url: '../../pages/address/user-address/user-address',
    })
  }
})