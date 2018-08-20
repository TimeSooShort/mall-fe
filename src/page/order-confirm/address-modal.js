/*
* @Author: Miao
* @Date:   2018-08-20 13:07:47
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-20 19:28:51
*/
'use strict';

var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var city = require('util/cities/index.js');
var templateIndex = require('./address-modal.string');

var addressModal = {
    show : function(option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //省市二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var result = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            // 新增cart
            if (!isUpdate && result.status) {
                _address.create(result.data, function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            // 更新cart
            else if (isUpdate && result.status) {
                _address.update(result.data, function(res){
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else {
                _mm.errorTips(result.errMsg || '发生了某些错误，刷新下试试');
            }
        });
        //点击叉号或者弹框以外区域，关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
    },
    loadModal : function(){
        var html = _mm.renderHtml(templateIndex, {
            isUpdate : this.option.isUpdate,
            data : this.option.data
        });
        this.$modalWrap.html(html);
        //加载省份
        this.loadProvince();
    },
    loadProvince : function(){
        var provinces = city.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectedOption(provinces));
        //如果是更新信息，则将已有的省份信息回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    getSelectedOption : function(optionArray){
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
        }
        return html;
    },
    loadCities : function(provinceName){
        var cities = city.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectedOption(cities));
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取表单收件人信息，并进行验证
    getReceiverInfo : function(){
        var receiverInfo = {},
            result = {
                status : false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zipcode').val());
        
        // 验证
        if(this.option.isUpdate){
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择省份';
        }else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择城市';
        }else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入11位手机号';
        }else if (receiverInfo.receiverPhone.length !== 11) {
            result.errMsg = '请输入11位手机号';
        }else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入详细地址';
        }else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }, 
    hide : function(){
        this.$modalWrap.empty();
    }
};
module.exports = addressModal;
