/**
 * 
 * @authors H君
 * @date    2016-11-04 23:30:33
 * @version 1.0
 */

define([
	'common',
	'messageZH'
], function() {

	'use strict';

	
	var $loginBtn = $("#login-btn");
	var $loginForm= $('#login-form');
		
	var login={

		// 初始化
		init:function(){

			login.bindEvent();
			login.valid();

		},

		//事件绑定
		bindEvent:function(){

			// 登录
			$loginBtn.click(function(event) {
				login.sub();
			});

			// 回车登录
			$('#pass').on('keypress',  function(event) {
				if (!e) var e = window.event; 
				if (e.keyCode == 13) {
					login.sub();
				}
			});
			
			

		},

		// 登录
		sub:function(){
			if ($loginForm.valid()) {
				$.ajax({
				  method: "POST",
				  url: "/account/loginIn",
				  data: $('#login-form').serialize()
				}).done(function( data ) {
				   	if (data.status == 0 ) {
							window.location = "index.html";
						}
				});
			}
		},
		
		//表单验证
		valid:function(){
			
			$loginForm.validate({
				rules: {
					user: "required",
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					user: "不能为空",
					password: '密码至少6位数以上'
				}
			});
		}
		
	};


	return {
		init :login.init
	}
	
});

	

	
