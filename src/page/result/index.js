/*
* @Author: Miao
* @Date:   2018-08-03 19:48:20
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-03 20:28:00
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default';
    var $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})