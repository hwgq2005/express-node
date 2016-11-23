/**
 * 
 * @authors Hwg
 * @date    2016-11-23 14:01:32
 * @version 1.0
 */

define([
	'common',
	'messageZH'
], function() {

	var topic = {} ,
		$topicForm = $('#topic-form');
		
	// 初始化
	topic.init=function(){
   		topic.bindEvent();
   		topic.valid();

	};

	// 绑定事件
	topic.bindEvent=function(){


		$('#login-btn').click(function(event) {
			if ($topicForm.valid()) {
				$.ajax({
				  method: "POST",
				  url: "/acticle/add",
				  data: $topicForm.serialize()
				}).done(function( data ) {
				   	if (data.status == 0 ) {
						window.location = "index.html";
					}
				});
			}
		});
		

      
	}

	topic.valid=function(){
		$("#topic-form").validate({
			rules: {
				title: "required",
				content: "required"
			},
			messages:{
				title: "不能为空",
				content: '不能为空'
			}
		});
	}

	return {
		init:topic.init
	}
	
});

