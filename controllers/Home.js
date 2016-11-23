var article = require('../database/entity/article');
var dbService = require('../database/util/DbService');
var ConstantStatus = require('../database/util/ConstantStatus');

exports.index=function(req,res){
	res.render("topic/index",{
		title:"首页",
		name: req.session.user.user
	});
}

exports.addTopic=function(req,res){
	
	res.render("topic/add",{
		title:"新增资讯",
		name: req.session.user.user
	});

}

exports.list=function(req,res){
	
	dbService.findDatas(article.tableName, article.schema, '', "","", function(data){
	   res.json(data); 
	} );

}


