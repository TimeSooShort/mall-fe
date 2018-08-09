/*
* @Author: Miao
* @Date:   2018-08-05 23:15:08
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-09 11:14:28
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var naveSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

// page逻辑部分
var page = {
    init : function() {
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        naveSide.init({
            name : 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});