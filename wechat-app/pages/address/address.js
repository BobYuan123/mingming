var json = require("../../data/Home_data.js")
var app = getApp();
Page({
  data: {
    id:"",
    name:"",
    mobile:"",
    detailaddress:"",
    region: ['四川省', '成都市', '成华区'],
    is_default:0,
    userId:1
  },
  getname:function(e)
  {
    this.setData({
       name:e.detail.value,
    });
  },
  getmobile: function (e) {
    this.setData({
      mobile: e.detail.value,
    });
  },
  getaddress: function (e) {
    this.setData({
      detailaddress: e.detail.value,
    });
  },
  saveaddress: function (e) {
    var _data = this.data
    if (_data.name == "") {
      wx.showModal({
        title: "提示",
        content: "姓名不能为空！",
        showCancel:false,
        duration: 1000
      })
      return;
    }
    if (_data.mobile == "" || _data.mobile.length!=11) {
      wx.showModal({
        title: "提示",
        content: "手机号码不能为空或格式不正确！",
        showCancel: false,
        duration: 1000
      })
      return;
    }
    if (_data.detailaddress == "") {
      wx.showModal({
        title: "提示",
        content:"详细地址不能为空！",
        showCancel: false,
        duration: 1000
      })
      return;
    }
    var that = this;
    wx.request({
      url: json.api_Name.AddAddress,
      method: 'post',
      data:{
        receivePostCode:"000000",
        receiveAddr: _data.region[0] + _data.region[1] + _data.region[2] + _data.detailaddress,
        receiveUserMobile: _data.mobile,
        receiveUserName: _data.name,
        storeId: 1,
        //userId: _data.userId,
        receiveAddrType:1,
        defaultAddr:0,
      },
      cookie: { threeSession: app.globalData.cookie},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.success == "false") {
          wx.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
            duration: 1000
          })
        }
        else {
          wx.navigateBack({
            url: '../../pages/address/user-address/user-address',
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })    
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },

  bindPickerChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
})