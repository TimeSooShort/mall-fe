/*
* @Author: Miao
* @Date:   2018-08-05 14:13:10
* @Last Modified by:   Miao
* @Last Modified time: 2018-09-10 01:46:29
*/
/*
* @Author: Miao
* @Date:   2018-07-29 21:24:59
* @Last Modified by:   Miao
* @Last Modified time: 2018-08-05 02:32:09
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
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
    data : {
        username   : '',
        question   : '',
        answer     : '',
        token      : ''
    },
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 用户名输入后下一步按钮的点击
        $('#submit-username').click(function(){
            _this.submitUsername();
        });
        // 回车提交
        $('#username').keyup(function(e){
            if (e.keyCode === 13) {
                _this.submitUsername();
            }
        });
        // 输入答案后下一步按钮的点击
        $('#submit-question').click(function(){
            _this.submitQuestion();
        });
        // 回车提交
        $('#answer').keyup(function(e){
            if (e.keyCode === 13) {
                _this.submitQuestion();
            }
        });
        // 输入新密码后下一步按钮的点击
        $('#submit-password').click(function(){
            _this.submitPassword();
        });
        // 回车提交
        $('#password').keyup(function(e){
            if (e.keyCode === 13) {
                _this.submitPassword();
            }
        });
    },
    // 用户名输入后的提交逻辑
    submitUsername : function(){
        var _this = this;
        var username = $.trim($('#username').val());
        if (username) {
            _user.getQuestion(username, function(res){
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 用户名为空
        else {
            formError.show('请输入用户名');
        }
    },
    // 输入答案后的提交逻辑
    submitQuestion : function(){
        var _this = this;
        var answer = $.trim($('#answer').val());
        if (answer) {
            // 校队答案
            _user.checkAnswer({
                username : _this.data.username,
                question : _this.data.question,
                answer   : answer
            }, function(res){
                _this.data.answer  = answer;
                _this.data.token   = res;
                _this.loadStepPassword();
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 答案为空
        else {
            formError.show('请输入答案');
        }
    },
    // 新密码输入后的提交逻辑
    submitPassword : function(){
        var _this = this;
        var password = $.trim($('#password').val());
        if (password && password.length >= 6) {
            _user.resetPassword({
                // 重置密码
                username    : _this.data.username,
                newPassword : password,
                forgetToken : _this.data.token
            }, function(res){
                window.location.href = './result.html?type=pass-reset';
            }, function(errMsg){
                formError.show(errMsg);
            })
        }
        // 密码不符
        else{
            formError.show('请输入不少于6位的新密码');
        }
    },
    // 加载输入用户名的一步
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        // 容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入新密码的一步
    loadStepPassword : function(){
        // 清除错误提示
        formError.hide();
        // 容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};

$(function(){
    page.init();
});