
var common = require('../common/common');
var api=require('../database/example');


exports.index=function(req,res){
	
	api.getCBData(function(data){

	   res.render("example",{title:"MongoDB实例",data:data});
	});
}

