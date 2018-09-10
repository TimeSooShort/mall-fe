/*
* @Author: Miao
* @Date:   2018-08-20 20:30:42
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-05 19:31:48
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var naveSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

// page逻辑部分
var page = {
    data : {
        listParam : {
            pageNum : 1,
            pageSize : 5
        }
    },
    init : function() {
        this.onLoad();
        this.loadOrderList();
    },
    onLoad : function(){
        // 初始化左侧菜单
        naveSide.init({
            name : 'order-list'
        });
    },
    loadOrderList : function(){
        var orderListHtml = "",
            _this = this,
            $listCon = $('.order-list-con');
        _order.getOrderList(this.data.listParam, function(res){
            _this.dataFilter(res);
            // 渲染
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败</p>');
        });
    },
    dataFilter : function(data){
        data.isEmpty = !data.list.length;
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.Pagination ? '' : (this.Pagination = new Pagination());
        this.Pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
});