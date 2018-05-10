
var express = require('express');
var router = express.Router();
var controls = require('./controllers');


//页面渲染
router.get('/', isLogin, controls.topic.index);
router.get('/topic/updateSave', isLogin, controls.topic.updateSave);
router.get('/topic/detail', isLogin, controls.topic.detail);
router.get('/project', isLogin, controls.project.index);
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
router.get('/topic/list',controls.topic.list);
router.post('/topic/save',controls.topic.save);
router.post('/topic/update/:id',controls.topic.update);
router.post('/topic/delete/:id',controls.topic.delete);

// 支付回调
router.get('/notify_url',controls.topic.notify);
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