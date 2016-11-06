
/* 文章表 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    //标题
    title: {type : String, required:true},

    //摘要
    summary : {type : String},

    //内容
    content : {type:String, required:true},

    //创建时间
    date: { type: Date, default: Date.now}
    
});

var article =
{
    schema : schema,
    tableName : "article"
};

module.exports = article;