/*
* @Author: Miao
* @Date:   2018-07-29 21:24:59
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-09 14:46:54
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 根据验证结果来决定是否显示错误提示
var formError = {
    show : function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
    init : function() {
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 回车提交
        $('.user-content').keyup(function(e){
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        // 验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './indexs.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else {
            formError.show(validateResult.msg);
        }
    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});