/**
 * 
 * @authors H君
 * @date    2016-11-04 23:30:33
 * @version 1.0
 */
!function(window){

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
					console.log($('#login-form').serialize())
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
					}
				},
				messages: {
					user: "不能为空",
					password: '密码至少6位数以上'
				}
			});
		}
		
	};

	login.init();

}(this);
	
