
var article = require('../database/entity/article');
var dbService = require('../database/util/DbService');
var ConstantStatus = require('../database/util/ConstantStatus');

// 渲染页面
exports.acticle=function(req,res){
	
	dbService.findDatas(article.tableName, article.schema, '', "","", function(data){
	   res.render("acticle/index",{
	   		title:"MongoDB实例",
	   		data:data.data,
	   		name: req.session.user.user
	   });
	} );

}

// 添加文章
exports.add = function(req, res) {

	var values    = req.body;
	if (values.title != '' && values.content != '') {
		dbService.saveOrUpdate(article.tableName, article.schema,{}, {},values, function(data){
			res.json(data); 
		})
	}

}

// 更新文字
exports.update = function(req, res) {

	var id = req.params.id;
	var values = req.body;
	if (values.title != '' && values.content != '') {
		dbService.updateData(article.tableName,article.schema,{_id:id}, values,{}, function(data){
			res.json(data); 
		})
	}

}

// 删除文章
exports.delete = function(req, res) {

	var id = req.params.id;
	if (id) {
		dbService.deleteDataById(article.tableName, article.schema, id, "", function(data){
			res.json(data); 
		})
	}

}
