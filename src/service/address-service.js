/*
* @Author: Miao
* @Date:   2018-08-17 21:00:43
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-17 22:05:37
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
    }
}
module.exports = _address;