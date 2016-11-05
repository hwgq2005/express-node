
/* 用户表 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    //账号
    user: {type : String},

    //密码
    password : {type : String},

    //手机
    molibe : {type:String},

    //角色
    role: {type : Number, default: 0},

    // 状态
    status: {type : Number, default: 0},

    // 验证码
    token : {type : String}
   
});

var user =
{
    schema : schema,
    tableName : "user"
};

module.exports = user;