var article = require('../database/entity/article');
var dbService = require('../database/util/DbService');
var ConstantStatus = require('../database/util/ConstantStatus');

exports.index=function(req,res){
	res.render("topic/index",{
		title:"首页",
		name: req.session.user.user
	});
}

exports.detail=function(req,res){

	var id = req.query.id;
	if (id) {
		dbService.findDataById(article.tableName, article.schema, id, "", '', function(data){
			console.log(data)
			if (data.status == 0) {
				res.render("topic/topic-detail",{
					title:data.data.title,
					data:data.data,
					name: req.session.user.user
				});
			}else{
				res.redirect("/");
			}
			
		})
	}else{
		res.redirect("/");
		
	}
	
}

exports.updateSave=function(req,res){
	

	var id = req.query.id;
	if (id) {
		dbService.findDataById(article.tableName, article.schema, id, "", '', function(data){
			console.log(data)
			if (data.status == 0) {
				res.render("topic/topic-add",{
					title:"编辑资讯",
					data:data.data,
					name: req.session.user.user
				});
			}else{
				res.redirect("/");
			}
			
		})
	}else{
		res.render("topic/topic-add",{
			title:"新增资讯",
			data:'',
			name: req.session.user.user
		});
	}
	
	

}

// 列表
exports.list=function(req,res){
	
	dbService.findDatas(article.tableName, article.schema, '', "","", function(data){
	   res.json(data); 
	} );

}

// 添加文章
exports.save = function(req, res) {

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

