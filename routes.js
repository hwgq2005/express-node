var express = require('express');
var router = express.Router();
var controls = require('./controllers');
var api=require('./database/example');


//页面渲染
router.get('/', controls.home.index);
router.get('/login',  controls.account.login);
router.get('/register',  controls.account.register);
router.get('/example', controls.example.example);

// api

// 登录
router.post("/account/loginIn",controls.account.loginIn);

// 退出登录
router.get("/account/logOut",controls.account.loginOut);

//发布文章
router.get('/acticle/getData',api.post);
router.post('/acticle/insert',api.addPost);
router.post('/acticle/update/:id',api.updatePost);
router.post('/acticle/delete/:id',api.deletePost);

// 判断是否登录
function isLogin(req,res,next){
	console.log(req.session.user);
	if (!req.session.user) {
		res.redirect("/login");
	}
	else {
		next();
	}	
}

module.exports = router;