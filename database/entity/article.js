
/* 文章表 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    //标题
    title: {type : String, required:true},

    //摘要
    summary : {type : String},

    //内容
    content : {type:String, required:true,max:10000},

    
    create_at: {
        type: String
        // default: function() {
        //     let d = new Date();
        //     return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        // }
    },

    update_at: {
        type: String
        // default: function() {
        //     let d = new Date();
        //     return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        // }
    }
}, {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }
});

var article =
{
    schema : schema,
    tableName : "article"
};

module.exports = article;