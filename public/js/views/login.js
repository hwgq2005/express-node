/*
 * author       : Richa
 * date         : 2016-11-03
 * description  : 用户登录注册模块脚本
 * 
 */


define([
	'jquery',
	'messageZH'
], function($) {
	
	/************************************************************************************************
	 * 登录模块初始化
	 *
	 ************************************************************************************************/
	function initLogin() {
		initValidate('login');
		bindEvent();
	}


	/************************************************************************************************
	 * 注册模块初始化
	 *
	 ************************************************************************************************/
	function initRegister() {
		initValidate('register');
		bindEvent();
	}


	/************************************************************************************************
	 * 表单验证初始化
	 *
	 ************************************************************************************************/
	function initValidate(type) {
		if (type === 'login') {
			$('#form-login').validate({
				rules: {
					account: {
						required: true,
						tel: true
					},
					password: {
						required: true
					},
					vcode: {
						required: true
					}
				},
				messages: {
					account: {
						required: '请输入手机号',
						tel: '手机号格式有误'
					},
					password: {
						required: '请输入密码'
					},
					vcode: {
						required: '请输入图片验证码'
					}
				}
			});
		} else if (type === 'login') {
			$('#form-register').validate({
				rules: {
					account: {
						required: true,
						tel: true
					},
					vcode: {
						required: true
					},
					smscode: {
						required: true
					},
					password: {
						required: true
					}
				},
				messages: {
					account: {
						required: '请输入手机号',
						tel: '手机号格式有误'
					},
					vcode: {
						required: '请输入图片验证码'
					},
					smscode: {
						required: '请输入短信验证码'
					},
					password: {
						required: '请输入密码'
					}
				}
			});
		}
	}


	/************************************************************************************************
	 * 事件定义
	 *
	 ************************************************************************************************/
	function bindEvent() {

		// 登录
		$('#submit-login').on('click', function() {
			if ($('#form-login').valid()) {
				$.ajax({
					url: '/user/login',
					type: 'POST',
					data: {
						user: $('#login-account').val(),
						pwd: $('#login-pwd').val()
					}
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		});


		// 注册
		$('#submit-register').on('click', function() {
			if ($('#form-register').valid()) {
				$.ajax({
					url: '/user/login',
					type: 'POST',
					data: {
						user: $('#register-account').val(),
						pwd: $('#register-pwd').val()
					}
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		});


		// 回车提交表单
		$(document).on('keyup', '.form-control', function(e) {
			if (e.keyCode == 13) {
				$(this).closest('form').find('.submit').click();
			}
		});

	}



	/************************************************************************************************
	 * 提交
	 *
	 ************************************************************************************************/
	function submit(formType) {

		// 登录
		$('#submit-login').on('click', function() {
			if ($('#form-login').valid()) {
				$.ajax({
					url: '/user/login',
					type: 'POST',
					data: {
						user: $('#login-account').val(),
						pwd: $('#login-pwd').val()
					}
				})
				.done(function(data) {
					console.log(data);
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		});

	}





	return {
		initLogin: initLogin,
		initRegister: initRegister
	};
});