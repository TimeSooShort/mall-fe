/*
* @Author: Miao
* @Date:   2018-09-10 14:55:59
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-10 15:45:17
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var naveSide = require('page/common/nav-side/index.js');

var page = {
    init : function() {
        this.onLoad();
    },
    onLoad : function() {
        naveSide.init({
            name : 'about'
        });
    }
};
$(function(){
    page.init();
});