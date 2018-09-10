/*
* @Author: Miao
* @Date:   2018-08-17 19:05:48
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-10 02:59:02
*/
'use strict';

var _mm = require('util/mm.js');
var _order = {
    //创建订单
    createOrderNum : function(shippingId, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        });
    },
    //获取订单的商品信息
    getProductList  : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    //订单List
    getOrderList  : function(pageInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : pageInfo,
            success : resolve,
            error   : reject
        });
    },
    //订单详情detail
    getOrderDetail  : function(orderNo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNum : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取支付状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;