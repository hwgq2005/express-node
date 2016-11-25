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
		
	var login={

		// 初始化
		init:function(){

			login.bindEvent();
			login.valid();

		},

		//事件绑定
		bindEvent:function(){


			$loginBtn.click(function(event) {
				if ($('#login-form').valid()) {
					$.ajax({
					  method: "POST",
					  url: "/account/register",
					  data: $('#login-form').serialize(),
					  dataType: "json"
					}).done(function(data ) {
 						if (data.status == 0 ) {
 							window.location = "index.html";
 						}
					});
					// console.log($('#login-form').serialize())
				}
			});


		},
		
		//表单验证
		valid:function(){
			
			$("#login-form").validate({
				rules: {
					user: "required",
					password: {
						required: true,
						minlength: 6
					},
					replyPassword: {
						required: true,
						equalTo: '#password',
						minlength :6
					}
				},
				messages: {
					user: "不能为空",
					password: '密码至少6位数以上',
					replyPassword: {
						required: '请再次输入密码',
						equalTo: '两次密码输入不一致'
					}
				}
			});
		}
		
	};


	return {
		init :login.init
	}
	
});
	
