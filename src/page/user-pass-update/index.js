/*
* @Author: Miao
* @Date:   2018-08-09 13:32:33
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-09 14:52:55
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var naveSide = require('page/common/nav-side/index.js');

// page逻辑部分
var page = {
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        naveSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password         : $.trim($('#password').val()), 
                passwordNew      : $.trim($('#password-new').val()), 
                passwordConfirm  : $.trim($('#password-confirm').val())
            };
            var validateResult = _this.formValidate(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld  : userInfo.password,
                    passwordNew  : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg + '请重新登录');
                    _user.logout(function(res){
                        // do nothing
                    }, function(errMsg){
                        // do nothing
                    });
                    window.location.href = './user-login.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        // 验证原密码是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 验证密码格式
        if (!_mm.validate(formData.passwordNew, 'require') || formData.passwordNew.length < 6) {
            result.msg = '密码长度至少要6位';
            return result;
        }
        // 验证密码是否为空
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});
