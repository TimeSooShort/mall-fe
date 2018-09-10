/*
* @Author: Miao
* @Date:   2018-09-06 18:52:30
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-07 16:24:34
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var naveSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

// page逻辑部分
var page = {
    data : {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        naveSide.init({
            name : 'order-list'
        });
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.order-cancel', function(){
            _order.cancelOrder(_this.data.orderNumber, function(res){
                _mm.successTips('取消订单成功');
                _this.loadDetail();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载订单详情
    loadDetail : function(){
        var orderDetailHtml = '',
            _this = this,
            $content = $('.content');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            // 渲染
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    //数据校验
    dataFilter : function(data){
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
        console.log(data.isCancelable);
    }
};
$(function(){
    page.init();
});