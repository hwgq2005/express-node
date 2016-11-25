/**
 * 
 * @authors Hwg
 * @date    2016-11-23 14:01:32
 * @version 1.0
 */

define([
	'text!../../templates/topic.ejs',
	'common',
	'ejs'
], function(topicList) {

	var topic = {} ,
		$topicList = $('#topic-list');
		
	// 初始化
	topic.init=function(){
   		topic.bindEvent();

   		topic.template('',1,topicList);
	};

	// 渲染模板
	topic.template = function(url,thisPage,temp) {
		
		var _self = this;
			// limit = 10,
			// data  = {
			// 	offset : (thisPage - 1) * limit,
			// 	limit  : limit
			// };
		
	 	
	 	$.ajax({
	 		url: '/topic/list',
	 		type: 'get',
	 		dataType: 'json',
	 		data:'',
	 	})
	 	.done(function(data) {
	 		$topicList.html(ejs.render(temp,data));
	 	})
	 	.fail(function() {
	 		console.log("error");
	 	})
	 
	 	
	 	$('#page').page({
	 		current: thisPage,
			pageCount: 26,
			// showNum: 10,
			callback: function(tPage) {
				console.log(tPage)
				_self.template(url,tPage,temp);
			}
		});

	}

	// 绑定事件
	topic.bindEvent=function(){

		$topicList.on('click', 'a', function(event) {
			var $self = $(this),
			    _id = $self.data('id'),
			    _action = $self.data('action');

			if (_action === 'del') {

                $.ajax({
				  method: "POST",
				  url: "/topic/delete/"+_id
				}).done(function( data ) {
				   	if (data.status == 0 ) {
						$self.closest('li').remove();
					}
				});
			}
		});

      
	}

	return {
		init:topic.init
	}
	
});

