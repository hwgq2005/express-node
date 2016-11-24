/**
 * 
 * @authors Hwg
 * @date    2016-11-23 14:01:32
 * @version 1.0
 */

define([
	'common',
	'baidueditor', 
	'zeroclipboard', 
	'bdlang',
	'messageZH'
], function(common,UE, zcl) {

	var topic = {} ,
		$topicForm = $('#topic-form');
	
	window.ZeroClipboard = zcl;	
	var ue = null ;
	// 初始化
	topic.init=function(){

   		topic.bindEvent();
   		topic.valid();

		ue = UE.getEditor(myeditor,common.UEConfig);
		
	};

	// 绑定事件
	topic.bindEvent=function(){

		$('#login-btn').click(function(event) {
			if ($topicForm.valid()) {
				$.ajax({
				  method: "POST",
				  url: "/topic/add",
				  data: $topicForm.serialize() + '&content='+ue.getContent()
				}).done(function( data ) {
					
				   	if (data.status == 0 ) {
						window.location = "index.html";
					}
				});
			}
		});

		var id = common.getQueryString('id');
		$('#edit-topic').click(function(event) {
			console.log($topicForm.serialize())
			if ($topicForm.valid()) {
				$.ajax({
				  method: "POST",
				  url: "/topic/update/"+id,
				  data: $topicForm.serialize() + '&content='+ue.getContent()
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
				summary: "required"
			},
			messages:{
				title: "不能为空",
				summary: '不能为空'
			}
		});
	}

	return {
		init:topic.init
	}
	
});

