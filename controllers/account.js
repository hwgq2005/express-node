var oauth = require('../common/OAuthHelp');
var api = require('../common/ApiHelp');

exports.login = function(req, res){
	res.render('account/login', {
		title: '用户登录'
	});
}


exports.register = function(req, res){
	res.render('account/register', {
		title: '用户注册'
	});
}


exports.loginIn = function(req, res){
	
	// console.log(req.query)
	// console.log(req.body)
	// console.log(req.params)
	req.body.user = 'choi';
	req.body.pwd = '1';
	oauth.getAccessTokenByPassWord(req.body.user, req.body.pwd, function (chunk) {
	    var obj = JSON.parse(chunk);
	    console.log(obj);
	    var access_token = obj["access_token"].toString();
	    var refresh_token = obj["refresh_token"].toString();
	    console.log(access_token);
		
		api.Get('/api/User', access_token, function (data) {
	    	req.session.user = JSON.parse(data);
	    	res.json(JSON.parse(data)); 
		});
	});
}


exports.loginOut = function(req, res){
	req.session.user = null;
	res.redirect("/login");
}


