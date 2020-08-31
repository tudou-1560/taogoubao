
import instance from "./config.js";

export  function getLunBoData(){
    return  instance.get("./getlunbo")
}

export  function getGoodsData(limit){
    return  instance.get(`./recommend?limit=${limit}`)
}
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