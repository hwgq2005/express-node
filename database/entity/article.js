
/* 文章表 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    //标题
    title: {type : String},

    //摘要
    summary : {type : String},

    //内容
    content : {type:String},

    //角色
    time: {type : String}
    
});

var article =
{
    schema : schema,
    tableName : "article"
};

module.exports = article;