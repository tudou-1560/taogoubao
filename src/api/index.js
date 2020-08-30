
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