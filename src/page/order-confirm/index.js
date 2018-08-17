/*
* @Author: Miao
* @Date:   2018-08-17 19:21:32
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-17 22:00:49
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _address        = require('service/address-service.js');
var _order          = require('service/order-service.js');
var templatePro     = require('./product.string');
var templateAds     = require('./address.string');

var page = {
    // 储存之前选中的地址cart的id，
    // 在每次loadAddress后都能保持之前cart的选中状态
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddress();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 收货地址的选中
        $(document).on('click', 'address-item', function(){
            var $this = $(this);
            $this.addClass('active').siblings('.address-item')
            .removeClass('active');
            _this.data.selectedAddressId = $this.data('id');
        });
    },
    // 加载地址
    loadAddress : function(){
        var _this = this;
        // 请求地址信息
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var html = _mm.renderHtml(templateAds, res);
            $('.address-con').html(html);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新试试</p>');
        });
    },
    // loadAddress前先找到之前选中的cart，使其保持选中状态
    // 若没找到,data.selectedAddressId就重置
    addressFilter : function(data){
        if (this.data.selectedAddressId) {
            var flag = false;
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    flag = true;
                }
            }
            if (!flag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品列表
    loadProductList : function(){
        _order.getProductList(function(res){
            var html = _mm.renderHtml(templatePro, res);
            $('.product-con').html(html);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">给你唱个歌吧！啦啦啦，啦啦啦，我是卖报的小行家</p>');
        });
    }
};
$(function(){
    page.init();
});