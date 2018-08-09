/*
* @Author: Miao
* @Date:   2018-07-29 00:57:17
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-10 01:45:01
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function() {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一个与后一个箭头事件的绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});