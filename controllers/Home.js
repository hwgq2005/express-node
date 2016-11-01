var common = require('../common/common');

exports.index=function(req,res){
	res.render("index",{title:"首页"});
}