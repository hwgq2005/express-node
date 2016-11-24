/**
 * 
 * @authors Hwg
 * @date    2016-11-23 14:01:32
 * @version 1.0
 */

require.config({

	// 相对路径(可不配置)
	baseUrl : 'js/',

	// 基于baseUrl路径配置
	paths: {

		// 库
		jquery 				: 'plugins/jquery/dist/jquery.min',
		hbook 				: 'plugins/hbook/dist/js/hbook.min',
		
		// 表单验证
		jqueryValidate		: 'plugins/jquery.validate',
		messageZH			: 'plugins/message',

		// 前端模板引擎
		ejs	 				: 'plugins/ejs/ejs',
		text	 			: 'plugins/text',

		// 图片上传
		webuploader			: 'plugins/ueditor/third-party/webuploader/webuploader.min',

		// 复文本框
		baidueditor			: 'plugins/ueditor/ueditor',
    	bdlang				: 'plugins/ueditor/lang/zh-cn/zh-cn',
    	ZeroClipboard       : 'plugins/ueditor/third-party/zeroclipboard/ZeroClipboard.min',

		// 日期选择插件
		datepicker 			: 'plugins/bootstrap-datepicker/js/bootstrap-datepicker',
		datepickerLang 		: 'plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN',

		// 公共方法
		common				: 'common'

	},

	// 依赖关系
	shim: {

		jquery: {
			exports: '$'
		},
		
		hbook: {
			deps : ['jquery']
		},

		ejs: {
			exports: 'ejs' 
		},

		jqueryValidate : {
			deps : ['jquery']
		},

		messageZH:{
			deps : ['jqueryValidate']
		},

		baidueditor: {
	   		deps: ['plugins/ueditor/ueditor.config','css!plugins/ueditor/themes/default/css/ueditor']
	    },
	    bdlang:{
	    	deps: ['baidueditor']
	    },
		datepickerLang:{
			deps : ['datepicker','css!plugins/bootstrap-datepicker/css/datepicker']
		}
		
	},

	map: {
		'*': {
			css: 'plugins/require-css/css'
		}
	},

	// 避免加载超时
	waitSeconds: 0
});