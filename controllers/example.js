
var api=require('../database/example');


exports.example=function(req,res){
	
	api.getCBData(function(data){

	   res.render("example/example",{title:"MongoDB实例",data:data});
	});
}

