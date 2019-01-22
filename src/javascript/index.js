import '../css/index.styl'
import "../css/swiper.min.css"
import $ from "jquery";
import Swiper from "swiper";


$(function () {
    let homePageSwiper=new Swiper('.swiper-container',{
        direction:'horizontal',
        autoplay:true,
        speed:1000,
        loop:true,
        pagination:{
            el:'.swiper-pagination',
            bulletElement : 'span',
            clickable:true,
            bulletClass:'my-bullet',
            bulletActiveClass:'my-bullet-active'
        },
    })
})
