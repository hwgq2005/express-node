
var express = require('express');
var router = express.Router();
var controls = require('./controllers');


//页面渲染
router.get('/', isLogin, controls.home.index);
router.get('/acticle', isLogin, controls.acticle.acticle);
router.get('/login', controls.account.login);
router.get('/register', controls.account.register);

// api

// 登录
router.post("/account/loginIn",controls.account.loginIn);

// 注册
router.post("/account/register",controls.account.registerUser);

// 退出登录
router.get("/account/logOut",controls.account.loginOut);

//发布文章
router.post('/acticle/add',controls.acticle.add);
router.post('/acticle/update/:id',controls.acticle.update);
router.post('/acticle/delete/:id',controls.acticle.delete);

// 判断是否登录
function isLogin(req,res,next){
	if (!req.session.user) {
		res.redirect("/login");
	}
	else {
		next();
	}	
}

module.exports = router;