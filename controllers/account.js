
var oauth = require('../common/OAuthHelp');
var api = require('../common/ApiHelp');

var user = require('../database/entity/user');
var dbService = require('../database/util/DbService');
var ConstantStatus = require('../database/util/ConstantStatus');

exports.login = function(req, res){
	res.render('account/login', {
		title: '登录'

	});
}


exports.register = function(req, res){
	res.render('account/register', {
		title: '注册'
	});
}

exports.loginOut = function(req, res){
	req.session.user = null;
	res.redirect("/login");
}

exports.loginIn = function(req, res){
	
	var filter  = {user: req.body.user };
	var pwd = req.body.password;

	dbService.findDataByOne(user.tableName, user.schema,filter,{}, {}, function( data) {
		console.log(data)
		var code = ConstantStatus.DBNULL;
        var message = ConstantStatus.DBNULL_MSG;
		if(data.status == code){
			code = ConstantStatus.USERNULL;
            message = ConstantStatus.USERNULL_MSG;
            msg = '{"status": "'+code+'", "message": "'+message+'"}';
            res.json(JSON.parse(msg));
		}else{
			
			if (pwd != data.data.password) {
				code = ConstantStatus.PASSWORK;
            	message = ConstantStatus.PASSWORK_MSG;
				msg = '{"status": "'+code+'", "message": "'+message+'"}';
            	res.json(JSON.parse(msg));
			}else{
				req.session.user = data.data;
				res.json(data);
			}
		}
	})
	// req.body.user = 'choi';
	// req.body.pwd = '1';
	// oauth.getAccessTokenByPassWord(req.body.user, req.body.pwd, function (chunk) {
	//     var obj = JSON.parse(chunk);
	//     console.log(obj);
	//     var access_token = obj["access_token"].toString();
	//     var refresh_token = obj["refresh_token"].toString();
	//     console.log(access_token);
		
	// 	api.Get('/api/User', access_token, function (data) {
	//     	req.session.user = JSON.parse(data);
	//     	res.json(JSON.parse(data)); 
	// 	});
	// });
}


exports.registerUser = function(req, res){
	
	var filter    = {user: req.body.user };
	var fields    = {user: req.body.user };
	var values    = req.body;
 
 	//查询账号是否存在
 	dbService.findDataByOne(user.tableName, user.schema,filter,{}, {}, function( data) {
 		var code = ConstantStatus.DBNULL;
        var message = ConstantStatus.DBNULL_MSG;

 		if(data.status == code){
 			dbService.saveOrUpdate(user.tableName, user.schema,{}, {},values, function(data){
 				req.session.user = data.data;
				res.json(data); 
			})
 		}else{
 			code = ConstantStatus.USEREXIT;
            message = ConstantStatus.USEREXIT_MSG;
            msg = '{"status": "'+code+'", "message": "'+message+'"}';
            res.json(JSON.parse(msg));
 		}

 	})
	
}