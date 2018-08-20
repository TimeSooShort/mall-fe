/*
* @Author: Miao
* @Date:   2018-08-17 21:00:43
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-20 19:00:36
*/
'use strict';
var _mm = require('util/mm.js');
var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 创建新地址
    create : function(receiverInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject 
        });
    },
    // 更新地址
    update : function(receiverInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    getReceiverInfo : function(shippingId, resolve, reject){
        _mm.request({
            url      : _mm.getServerUrl('/shipping/select.do'),
            data     : {
                shippingId : shippingId
            },
            success  : resolve,
            error    : reject
        });
    }, 
    delete : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;