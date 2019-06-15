var json = require('../../data/Home_data.js')
var app = getApp()
Page({
  data: {
    cartItems:[],
    total:0,
    CheckAll:false,
    userId: 1
  },
  onLoad:function(e){
    
  },
   onShow: function () {
     var that = this
     //查询购物车
     wx.request({
       url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
       method: 'get',
       header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       success: function (res) {
         var cartItems = res.data.data || []
         for (var index in cartItems)
         {
           cartItems[index].selected = false;
         }
         that.setData({
           cartItems: cartItems,
           total: 0,
         });
       },
       fail: function (e) {
         wx.showToast({
           title: '网络异常！',
           duration: 2000
         });
       },
     })
     this.getsumTotal()  
   },

  //选择
   select:function(e){
    var CheckAll = this.data.CheckAll;
    CheckAll = !CheckAll
    var cartItems = this.data.cartItems

    for(var i=0;i<cartItems.length;i++){
      cartItems[i].selected = CheckAll
    }

    this.setData({
      cartItems: cartItems,
      CheckAll: CheckAll
    })
    this.getsumTotal()
   },
   //加
   add:function (e) {
     var that = this
     var cartItems = this.data.cartItems   //获取购物车列表
     var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引

     //更新购物车
     wx.request({
       url: json.api_Name.ShopCart,
       method: 'put',
       data: {
         "cartId": cartItems[index].cartId,
         "skuNum": cartItems[index].skuNm + 1,
         "userId": that.data.userId
       },
       header: {
         'Content-Type': 'application/json'
       },
       success: function (res) {
         //查询购物车
         wx.request({
           url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
           method: 'get',
           header: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           success: function (res) {
             var cartItems = res.data.data || []
             for (var index in cartItems) {
               cartItems[index].selected = false;
             }
             that.setData({
               cartItems: cartItems,
             });
             that.getsumTotal()
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
   }, 
    //减
   reduce: function (e){
     var cartItems = this.data.cartItems  //获取购物车列表
     var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
     var value = cartItems[index].skuNm  //获取购物车里面的value值

     var that = this
      if(value==1){
        wx.showModal({
          title: '提示',
          content: '确认删除该商品？',
          success(res) {
            if (res.confirm) {
              //删除
              wx.request({
                url: json.api_Name.ShopCart,
                data: {
                  "cartIdList": [that.data.cartItems[index].cartId],
                  "userId": that.data.userId
                },
                method: 'delete',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  //查询购物车
                  wx.request({
                    url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
                    method: 'get',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      var cartItems = res.data.data || []
                      for (var index in cartItems) {
                        cartItems[index].selected = false;
                      }
                      that.setData({
                        cartItems: cartItems,
                      });
                      that.getsumTotal()
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
          },
        })
      }else{
        //更新购物车
        wx.request({
          url: json.api_Name.ShopCart,
          method: 'put',
          data: {
            "cartId": cartItems[index].cartId,
            "skuNum": cartItems[index].skuNm - 1,
            "userId": that.data.userId
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            //查询购物车
            wx.request({
              url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
              method: 'get',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                var cartItems = res.data.data || []
                for (var index in cartItems) {
                  cartItems[index].selected = false;
                }
                that.setData({
                  cartItems: cartItems,
                });
                that.getsumTotal()
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
   },
    // 选择
   selectedCart:function(e){  
    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
    var selected = cartItems[index].selected;    //获取购物车里面的value值

    //取反
    cartItems[index].selected =! selected;
    this.setData({
      cartItems: cartItems
    })
    this.getsumTotal();   
   },
    goPay: function (e) {
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/pay/pay'
    })
  },
   //删除
   shanchu:function(e){
     var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
     var that = this
     wx.showModal({
       title: '提示',
       content: '确认删除该商品？',
       success(res) {
         if (res.confirm) {
           //删除
           wx.request({
             url: json.api_Name.ShopCart,
             data: {
               "cartIdList": [that.data.cartItems[index].cartId],
               "userId": that.data.userId
             },
             method: 'delete',
             header: {
               'Content-Type': 'application/json'
             },
             success: function (res) {
               //查询购物车
               wx.request({
                 url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
                 method: 'get',
                 header: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 success: function (res) {
                   var cartItems = res.data.data || []
                   for (var index in cartItems) {
                     cartItems[index].selected = false;
                   }
                   that.setData({
                     cartItems: cartItems,
                   });
                   that.getsumTotal()
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
         } else if (res.cancel) {
           
         }
       }
     })
   },
  goPay: function (e) {
    wx.navigateTo({
      url: '../../pages/paymore/paymore'
    })
  },
   //合计
   getsumTotal: function () {
     var sum = 0
     for (var i = 0; i < this.data.cartItems.length; i++) {
       if (this.data.cartItems[i].selected) {
         sum += this.data.cartItems[i].skuPrice * this.data.cartItems[i].skuNm
       }
     }
     //更新数据
     this.setData({
       total: sum
     })
   },
})