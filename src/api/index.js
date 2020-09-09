
import instance from "./config.js";
//获取轮播图数据
export  function getLunBoData(){
    return  instance.get("./getlunbo")
}
//获取首页推荐商品数据
export  function getGoodsData(limit){
    return  instance.get(`./recommend?limit=${limit}`)
}
//获取新闻列表数据
export  function getNewsData(page=1,pagesize=5){
    return  instance.get(`./getnewslist?page=${page}&pagesize=${pagesize}`)
}
//获取商品列表信息
export function getGoodslistData(pageNum){
    return instance.get(`./getgoods?pageindex=${pageNum}`)
}

//获取商品详情页面轮播图
export function getdetaillunbo(goodId){
  return instance.get(`./getthumbimages/${goodId}`)
}

//获取商品详情文字描述
export function getdetailinfo(goodId){
  return instance.get(`./getgoodsinfo/${goodId}`)
}


//获取新闻详情数据
export function getnewdetail(newId){
  return instance.get(`./getnew/${newId}`)
}

//获取评论列表数据
export function getcommentdata(id,pageindex){
  return instance.get(`./getcomments/${id}?pageindex=${pageindex}`)
}
//添加评论
export function postcommentdata(id){
  return instance.post(`./postcomment/${id}`)
}

// 获取图片分享类型
export function getphotocategory(){
  return instance.get(`./getcategory`)
}

//获取指定类型进入列表数据
export function getcategorylisdata(id){
  return instance.get(`./getcatelist/${id}`);
}
//获取指定id的缩略图
export function getthumbdata(id){
  return instance.get(`./getthumbimages/${id}`);
}

//获取购物车商品数据
export function getshopcartdata(id){
  return instance.get(`./getshopcarlist/${id}`);
}

//请求登录接口
export function getLogin(data){
  return instance.post(`./login`,data);
}

//验证token 判断用户是否登录
export async function isLogin(){
  let token = localStorage.getItem("token")
  try {
    await instance.post(`./checktoken?token=${token}`);
  } catch (error) {
    
  }
}

//请求用户的所有地址
export function getAddressManager(userId){
  return instance.get(`./getaddress/${userId}?v=${Math.random()}`);
  // return instance.get(`./getaddress/${userId}`);
}

//添加地址接口
export function AddAddress(userId,addressData){
  return instance.post(`./addaddress/${userId}`,addressData);
}

// 更新用户地址
export function updateAddAddress(userId,addressData){
  return instance.post(`./updateaddress/${userId}`,addressData);
}

//删除用户指定的地址
export function deleteAddress(userId){
  return instance.post(`./deladdress/${userId}`);
}


//请求注册接口
export function getRegister(data){
  return instance.post(`./register`,data);
}