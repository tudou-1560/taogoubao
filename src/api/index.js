
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