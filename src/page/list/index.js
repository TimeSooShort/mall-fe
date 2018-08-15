/*
* @Author: Miao
* @Date:   2018-08-10 12:17:01
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-13 14:00:33
*/
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var templateIndex   = require('./index.string');
var Pagination      = require('util/pagination/index.js');

var page = {
    data : {
        listParam : {
            keyword    : _mm.getUrlParam('keyword')      || '',
            categoryId : _mm.getUrlParam('categoryId')   || '',
            orderBy    : _mm.getUrlParam('orderBy')      || 'default',
            pageNum    : _mm.getUrlParam('pageNum')      || 1,
            pageSize   : _mm.getUrlParam('pageSize')     || 5
        }
    },
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                }
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                if ($this.hasClass('asc')) {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }else {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
            }
            _this.loadList();
        });
    },
    loadList : function(){
        var listParam = this.data.listParam,
            _this     = this,
            listHtml  = '',
            $pListCon = $('.p-list-con');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        $pListCon.html('<div class="loading"></div>');
        _product.getProductList(
            listParam, 
            function(res){
                listHtml = _mm.renderHtml(templateIndex, {list : res.list});
                $pListCon.html(listHtml);
                _this.loadPagination({
                    hasPreviousPage  : res.hasPreviousPage,
                    prePage          : res.prePage,
                    hasNextPage      : res.hasNextPage,
                    nextPage         : res.nextPage,
                    pageNum          : res.pageNum,
                    pages            : res.pages
                });
            },
            function(errMsg){
                _mm.errorTips(errMsg);
            }
        );
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(
            $.extend(
                {}, 
                pageInfo, 
                {
                    container : $('.pagination'),
                    onSelectPage : function(pageNum){
                        _this.data.listParam.pageNum = pageNum;
                        _this.loadList();
                    }
                }
            )
        );
    }
};
$(function(){
    page.init();
});