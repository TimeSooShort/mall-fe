/*
* @Author: Miao
* @Date:   2018-07-31 18:57:56
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-07 19:36:20
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
// 通用页面头部
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮后做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit : function() {
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候由keyword，正常跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword='+keyword;
        }
        // 如果keyword为空,直接返回首页
        else{
            _mm.goHome();
        }
    }
};
header.init();