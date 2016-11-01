/**
 *
 * @authors H君 (262281610@qq.com)
 * @date    2015-05-25 20:09:45
 * @version $Id$
 */

(function() {
	"use strict";
	var mongodb = require('mongodb');
	var server = new mongodb.Server('localhost', 27017, {
		auto_reconnect: true
	});
	var db = new mongodb.Db('hwg', server, {
		safe: true
	});
	//数据库：hello-world 
	// 可选参数{safe:true},如果加上了这个参数，那么当collection不存在的时候则报错
	/* GET main page. */
	var ObjectID = require('mongodb').ObjectID;


	var getData = function(cball){
		db.open(function(err, db ) {
			if (!err) {
					// db.collection('person').find(function(error, db) {
					// 	db.each(function(error,doc){
					// 	    if(doc){
					// 	       data.push(doc);
					// 	       console.log(doc)
					// 	    }
					// 	});
					// 	db.toArray(function(error, bars) {
					// 		data.push(doc);
					// 	});
					// 			res.json({
					// 			'data': data
					// 		});
					// });
				db.collection('article', function(err, collection) {
					collection.find().toArray(function(err, docs) {
						if (err) {
							console.log("to Array Error");
						} else {
							cball(docs);
						}
					});
				});
			}
		});
	};
	exports.getCBData = getData;
	exports.post = function(req, res) {
		getData(function(data){
			res.json(data)
		});
	}
	
	exports.addPost = function(req, res) {
		var title = req.body.title,
			content = req.body.content,
			time = CurentTime();
		console.log('-------')
		if (title != '' && content != '') {
			db.open(function(err, db) {
				if (!err) {
					//插入表
					db.collection('article', function(err, collection) {
						var data = {
							title: title,
							content: content,
							time: time
						};
						collection.insert(data);
						// collection.insert(doc2, function(err, result) {});
						// collection.insert(docs,  function(err, result) {});
						
						res.redirect('back'); //跳转
					});
				} else {
					console.log(err);
				}
			});


		}
	}
	exports.updatePost = function(req, res) {
		var title = req.body.title,
			content = req.body.content;
		
		var id = req.params.id;
		console.log(id)
		if (title != '' && content != '') {
			db.open(function(err, db) {
				if (!err) {
					//更新字段
					db.collection('article', function(err, collection) {
						var data = {
							title: title,
							content: content
						};
						collection.update({_id: new ObjectID(id)}, {$set: data}, function(error, bars){});
					
						res.json({
							msg: 'success'
						});

						
					});
				} else {
					console.log(err);
				}
			});
			// res.json(req.body);

		}
	}
	exports.deletePost = function(req, res) {
		var id = req.params.id;
		
		if (id) {
			db.open(function(err, db) {
				if (!err) {
					//删除某条数据
					db.collection('article', function(err, collection) {
						//根据id要用这个
						collection.remove({
							_id: new ObjectID(id)
						})
						//根据其他字段可用下面这个
						// collection.remove({_id:ObjectId(id)}, {safe:true}, function(error, count){
						//    console.log(id)
						// });
						res.json({
							msg: 'success'
						});
					});
				} else {
					console.log(err);
				}
			});
		}
	}
	function CurentTime() {
		var now = new Date();
		var year = now.getFullYear(); //年
		var month = now.getMonth() + 1; //月
		var day = now.getDate(); //日
		var hh = now.getHours(); //时
		var mm = now.getMinutes(); //分
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10) clock += '0';
		clock += mm;
		return (clock);
	}
})()