var json = require('../../data/Home_data.js')
var app = getApp()
Page({
  data:{
    status: '',
    amount: 1,
    rootSpecList: [], // 数据缓存
    specList: [],
    skuMap: [],
    properties: [],  
    HomeIndex:0,
    userId:1,
    specdesc:''
  },
  boxtwo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index) 
    this.setData({
      HomeIndex: index
     })
  },
  clickMenu: function (e) {
    var id = e.currentTarget.dataset.id
    var pid = e.currentTarget.dataset.pid
    var index = e.currentTarget.dataset.index
    var pindex = e.currentTarget.dataset.pindex
    var speclist = this.data.properties
    var childstyle = e.currentTarget.dataset.style
    var map = this.data.skuMap
    var mapkey = this.data.mapkey
    var cmapkey = []
    var checkmap = []
    var specdesclist = ''
    if (childstyle === 'noactive' || childstyle === 'active')
      return;
    for (let i = 0; i < speclist[pindex].childList.length; i++) {
      if (i === index) {
        speclist[pindex].childList[i].isSelect = true;
        speclist[pindex].childList[i].childstyle = "active";
        this.setData({
          amount: 1
        })
        for (let z = 0; z < mapkey.length; z++) {
          if (mapkey[z].indexOf("{"+speclist[pindex].childList[i].id+"}") >= 0) {
            cmapkey.push(mapkey[z]);
            checkmap = cmapkey;
          }
        }
      }
      else {
        if (speclist[pindex].childList[i].childstyle == "active") {
          speclist[pindex].childList[i].isSelect = false;
          speclist[pindex].childList[i].childstyle = "";
        }
      }
    }
    for (let j = 0; j < speclist.length; j++)
    {
      if (j != pindex)
      {
        for (let i = 0; i < speclist[j].childList.length; i++) {
          var containFlag = false;
          var checkmapkey = []
          for (let z = 0; z < cmapkey.length; z++) {
            if (cmapkey[z].indexOf("{" + speclist[j].childList[i].id + "}") >= 0) {
              containFlag = true
              if (speclist[j].childList[i].childstyle === "active") {
                checkmapkey.push(cmapkey[z])
              }
              break;
            }  
          }
          if (!containFlag)
          {
            speclist[j].childList[i].isSelect = false;
            speclist[j].childList[i].childstyle = "noactive";
          }
          if (checkmapkey.length > 0)
          {
            checkmap = checkmapkey;
          }
        }
      }
    }
    var allChecked = true;
    for (let j = 0; j < speclist.length; j++) {
      var isChecked = false;
      for (let i = 0; i < speclist[j].childList.length; i++) {
        if (speclist[j].childList[i].isSelect) {
          specdesclist += (speclist[j].childList[i].name + "，" );
          isChecked = true;
        }
      }
      if (!isChecked) {
        allChecked = false;
        break;
      }
    }
    if(allChecked)
    {
      this.setData({
        sku: map[checkmap[0]],
        skuname: map[checkmap[0]].skuName,
        showSku:true,
        showSpu:false,
        specdesc: specdesclist
      })
    }
    else
    {
      this.setData({
        skuname: ''
      })
    }
    this.setData({
      properties: speclist
    })
  },
  goPay: function (e) {
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/pay/pay?id=' + Id
    })
  },
  // 弹窗
  setModalStatus: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation
    animation.translateY(300).step();
    this.setData({
      skuname: '',
      animationData: animation.export()
    })

    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true,
          buys: '立即购买',
          status: '1'
        }
      );
    } else {
      this.setData(
        {
          showModalStatus: true,
          buys: '加入购物车',
          status: '2'
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
      else
      {
        var that = this;
        wx.request({
          url: json.api_Name.GetSpec + that.data.spuID + '&&threeSession=' + app.globalData.cookie,
          method: 'get',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              rootSpecList: res.data.data.rootSpecList,
              specList: res.data.data.specList,
              skuMap: res.data.data.skuMap,
            });
            var spec = []
            var childspec = []
            var rootlist = res.data.data.rootSpecList
            var allspeclist = res.data.data.specList
            var map = res.data.data.skuMap
            var mapkey = []
            for (let key in map) {
              mapkey.push(key)
            }
            that.setData({
              mapkey: mapkey,
            });
            for (let i = 0; i < rootlist.length; i++) {
              var childspec = []
              for (let j = 0; j < rootlist[i].childIndexList.length; j++) {
                var containFlag = false;
                for (let z = 0; z < mapkey.length; z++) {
                  if (mapkey[z].indexOf("{" + allspeclist[rootlist[i].childIndexList[j]].id + "}") >= 0) {
                    containFlag = true;
                    break;
                  }                   
                }
                var childstyleFlag = '';
                if (!containFlag) {
                  childstyleFlag = 'noactive';
                }
                childspec.push({
                  id: allspeclist[rootlist[i].childIndexList[j]].id,
                  pid: allspeclist[rootlist[i].childIndexList[j]].pid,
                  name: allspeclist[rootlist[i].childIndexList[j]].specName,
                  isSelect: false,
                  childstyle: childstyleFlag,
                })
              }
              spec.push({
                id: rootlist[i].id,
                name: rootlist[i].specName,
                childList: childspec,
              });
            }
            if(that.data.showSku)
            {
              var skukey = "";
              for (let key in map) {
                if (that.data.sku.skuId == map[key].skuId)
                {
                  skukey = key;
                  break;
                }
              }
              for (let j = 0; j < spec.length; j++) {
                  for (let i = 0; i < spec[j].childList.length; i++) {
                    if (skukey.indexOf("{" + spec[j].childList[i].id + "}") >= 0) {
                        spec[j].childList[i].childstyle = "active";
                        spec[j].childList[i].isSelect = true;
                        break;
                      }
                    }
                }
            }
            that.setData({
              properties: spec,
            }); 
          },
          fail: function (e) {
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          },
        })
      }
    }.bind(this), 200)
  },
  // 加减
  changeNum: function (e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.amount <= 1) {
        amount: 1
      } else {
        this.setData({
          amount: this.data.amount - 1
        })
      };
    } else {
      this.setData({
        amount: this.data.amount + 1
      })
    };
  },
  addShopCart: function (e) { 
    var that = this
    var _data = this.data
    var speclist = this.data.properties
    for (let j = 0; j < speclist.length; j++) {
      var isChecked = false;
      for (let i = 0; i < speclist[j].childList.length; i++) {
        if (speclist[j].childList[i].isSelect)
        {
          isChecked = true;
        }
      }
      if (!isChecked)
      {
        wx.showToast({
          title: "请选择" + speclist[j].name,
          duration: 1000
        })
        return;
      }
    }
    //添加到购物车
    // 弹窗
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation
    animation.translateY(300).step();

    this.setData({
      animationData1: animation.export()
    })

    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          addShopCart: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            addShopCart: false
          }
        );
      }
    }.bind(this), 200)

    this.setData(
      {
        showModalStatus: false
      })

    if (e.currentTarget.dataset.status == 1) {
      var Id = e.currentTarget.dataset.id
      var cartItems = wx.getStorageSync("justAmount") || 1
      //更新缓存数据
      wx.setStorageSync("justAmount", _data.amount)
      wx.navigateTo({
        url: '../../pages/pay/pay?id=' + Id
      })
    }
    else
    {
      var cartGoodsList = []
      //查询购物车
      wx.request({
        url: json.api_Name.ShopCart + "?storeId=" + app.globalData.storeId + "&userId=" + that.data.userId,
        method: 'get',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            cartGoodsList: res.data.data,
          });
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      })
      var cartGoodsList = that.data.cartGoodsList
      if (cartGoodsList == null || cartGoodsList == [])
      {
          //添加购物车
          wx.request({
            url: json.api_Name.ShopCart,
            method: 'post',
            data: {
              "skuId": that.data.sku.skuId,
              "skuNum": that.data.amount,
              "storeId": app.globalData.storeId,
              "userId": that.data.userId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: "加入购物车成功！",
                duration: 1000
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
      else
      {
        var exist = cartGoodsList.find(function (el) {
          return el.skuId == that.data.sku.skuId
        })
        //如果购物车里面有该商品那么他的数量每次加一
        if (exist) {
          exist.skuNum = exist.skuNum + that.data.amount
          //更新购物车
          wx.request({
            url: json.api_Name.ShopCart,
            method: 'put',
            data: {
              "cartId": exist.cartId,
              "skuNum": exist.skuNum + that.data.amount,
              "userId": that.data.userId
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: "加入购物车成功！",
                duration: 1000
              })
            },
            fail: function (e) {
              wx.showToast({
                title: '网络异常！',
                duration: 2000
              });
            },
          })
        } else {
          //添加购物车
          wx.request({
            url: json.api_Name.ShopCart,
            method: 'post',
            data: {
              "skuId": that.data.sku.skuId,
              "skuNum": that.data.amount,
              "storeId": 1,
              "userId": 1
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: "加入购物车成功！",
                duration: 1000
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
      }
    }
  },
  gohome:function(){
    wx.switchTab({
      url: '../../pages/home/home'
    })
  },
  gocart: function () {
    wx.switchTab({
      url: '../../pages/cart/cart'
    })
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  onLoad: function (option){
    var spuid = option.id;
    var that = this;
    wx.request({
      url: json.api_Name.NewGoods + app.globalData.storeId + '&&threeSession=' + app.globalData.cookie,
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var spugoodlist = res.data.data;
        for (let i = 0; i < spugoodlist.length;i++)
        {
          if (spugoodlist[i].spuId == spuid)
          {
            that.setData({
              spu: spugoodlist[i],
              spuID: spuid,
              showSku: false,
              showSpu: true
            });
            break;
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  }

})