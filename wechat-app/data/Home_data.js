var host = "more.easystore.shop"
var API_Name ={
  //获取规格
  GetSpec: `https://${host}/api/store/prodSpu/spec/`,
  //获取最新上架
  NewGoods: `https://${host}/api/store/prodSpu/newArrivalInStore?storeId=`,
  //根据分类ID获取产品列表
  GetGoodsByCateGory: `https://${host}/api/store/prodSpu/prodCateInStore`,
  //购物车接口
  ShopCart: `https://${host}/api/user/shopcart/myShopcart`,
  //清空购物车接口
  ShopCartAll: `https://${host}/api/user/shopcart/myShopcartAll`,
  //产品分类
  GetCateGory: `https://${host}/api/store/prodCate/prodCateTree`,
  //SPU模糊搜索
  SearchSPU: `https://${host}/api/store/prodSpu/seach?storeId=`,
  //地址删除
  DeleteAddress: `https://${host}/api/user/addr/`,
  //地址添加
  AddAddress: `https://${host}/api/user/addr/add`,
  //地址查询
  GetAddress: `https://${host}/api/user/addr/addrList?storeId=`,
  //地址默认
  SetAddress: `https://${host}/api/user/addr/`,
  //用户登录
  WxLogin: `https://${host}/api/user/userInfo/wxlogin`,
}
module.exports={
  api_Name:API_Name
}