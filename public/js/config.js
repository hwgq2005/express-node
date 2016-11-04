/*
 * author       : Richa
 * date         : 2016-11-03
 * description  : 模块配置文件
 * 
 */

require.config({

	// 相对路径(可不配置)
	baseUrl : '',

	// 基于baseUrl路径配置
	paths: {
		jquery 				: 'js/plugins/jquery.min',
		global				: 'js/global',								// 函数库
		common				: 'js/common',								// 页面公用模块
		dialog 				: 'js/plugins/artDialog/dialog',			// 弹窗插件
		bxslider 			: 'js/plugins/jquery.bxslider',				// 幻灯片插件
		tPage				: 'js/plugins/t-paginator',					// 分页组件
		stateman	 		: 'js/plugins/stateman.min',				// 前端路由插件

		// 表单验证
		jqueryVdt			: 'js/plugins/jquery.validate.min',
		messageZH			: 'js/plugins/message_zh',

		// 滚动条
		tScroll 			: 'js/plugins/t-scroll',
		mousewheel			: 'js/plugins/jquery.mousewheel.min',

		// 前端模板引擎
		ejs	 				: 'js/plugins/ejs/ejs',
		text	 			: 'js/plugins/text',

		// 图片上传
		webuploader			: 'js/plugins/webuploader/webuploader.min',
		uploadImage			: 'js/plugins/uploadImage',

		// 日期选择插件
		datepicker 			: 'js/plugins/bootstrap-datepicker/js/bootstrap-datepicker',
		datepickerLang 		: 'js/plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN',
	},

	// 依赖关系
	shim: {
		jquery: {
			exports: '$',
		},
		dialog : {
			deps : ['jquery', 'css!../css/plugins/ui-dialog']
		},
		bxslider : {
			deps : ['jquery']
		},
		datepickerLang:{
			deps : ['datepicker','css!js/plugins/bootstrap-datepicker/css/datepicker']
		},
		tPage: {
			deps: ['jquery', 'css!../css/plugins/t-paginator']
		},
		tScroll :{
			deps : ['css!../css/plugins/t-scroll']
		},
		jqueryVdt : {
			deps : ['jquery']
		},
		ejs: {
			exports: 'ejs' 
		}
	},

	map: {
		'*': {
			css: 'js/plugins/require-css/css'
		}
	},

	// 避免加载超时
	waitSeconds: 0
});