/* 用户表 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    //账号
    user: { type: String, required: true },

    //密码
    password: { type: String, required: true },

    //手机
    molibe: { type: String },

    //角色
    role: { type: Number, default: 0 },

    // 状态
    status: { type: Number, default: 0 },

    // 验证码
    token: { type: String },

    create_at: {
        type: String,
        default: function() {
            let d = new Date();
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        }
    },

    update_at: {
        type: String,
        default: function() {
            let d = new Date();
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        }
    }
}, {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }
});
var user = {
    schema: schema,
    tableName: "user"
};

module.exports = user;