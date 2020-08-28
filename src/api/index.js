
import instance from "./config.js";

export  function getLunBoData(){
    return  instance.get("./getlunbo")
}

export  function getGoodsData(limit){
    return  instance.get(`./recommend?limit=${limit}`)
}