import Vue from "vue";
import moment from "moment";

Vue.filter("getDataFormat",function(date,format="YYYY-MM-DD hh:mm"){
    return moment(date).format(format); 
})