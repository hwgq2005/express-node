
define([
	'jquery',
	'hbook'
], function($) {


	// 导航下拉
	$('.navbar-toggle').click(function(event) {
		$(this).toggleClass('collapsed');
		$('#navbar').toggleClass('in');
	});
	
	// 百度编辑器菜单配置
	var UEConfig= {
		toolbars: [
		    ['fontfamily','fontsize','bold','italic',
		    'underline','strikethrough','forecolor',
		    'insertorderedlist','insertunorderedlist',
		    'simpleupload','insertimage','cleardoc']
		],
		zIndex : 0,
		elementPathEnabled: false,
		wordCount: false
	};

	function getQueryString(name) {

		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    // if (r != null) return unescape(r[2]);
	    // 编码中文乱码
	    if (r != null) return decodeURI(r[2]); 

	    return null;
	}

	return {
		getQueryString:getQueryString,
		UEConfig:UEConfig
	}
});