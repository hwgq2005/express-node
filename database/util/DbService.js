/**
 * 
 * @authors H君
 * @date    2016-11-05 18:43:08
 * @version 1.0
 */

var ConstantStatus = require('../util/ConstantStatus');
var logger = require('../../common/log');
var Q = require('q');
var deferred = Q.defer();

module.exports = function()
{
    var service = {};

    var mongoose = require('mongoose');

    var config = require('./Config');
    var db = null;

    /*数据库连接*/
    service.connect = function ()
    {
        if(db == null){
            db  =   mongoose.createConnection(
                config.mongodbHost,
                {
                    //db: { native_parser: true },
                    //server: { poolSize: 10 },
                    //replset: { rs_name: 'myReplicaSetName' },
                    user: config.mongodbUser,
                    pass: config.mongodbPass
                });
        }
        return db;
    };

    service.close = function ()
    {
        db.close();
    };

    /**
     * 插入数据
     */
    service.insert = function(tableName, schema,  values, option, callback){
        var Model = this.connect(tableName ).model(tableName, schema, tableName);
        
        Model.collection.insert(values, option, function(error, result){
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);

                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            deferred.resolve(JSON.parse(jsonStr));
            //this.connect().close();
        });

        return deferred.promise;
    }

    /**
     * 新增数据
     */
    service.saveOrUpdate = function(tableName, schema, filter,fields, values, callback)
    {
        var MyModel = this.connect().model(tableName, schema, tableName);
            var entityobject = new MyModel( values );
            entityobject.save( function(error, result)
            {

                var code = ConstantStatus.SUCCESS;
                var message = ConstantStatus.SUCCESS_MSG;
                var jsonStr = "";
                if(error) {
                    logger.error(error);
                    code = ConstantStatus.DBERROR;
                    message = ConstantStatus.DBERROR_MSG;
                    var errStr = JSON.stringify(error);
                    jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
                } else if(result) {
                    var docStr = JSON.stringify(result);
                    jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}';
                } else {
                    jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';

                }

                callback( JSON.parse(jsonStr) );
            });
    };

    /**
     * 查询数据
     */
    service.findDatas = function (tableName, schema, filter, fields, options, callback)
    {
        var MyModel = this.connect().model(tableName, schema, tableName);

        MyModel.find(filter, fields, options, function(error, result){

            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);

                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            callback( JSON.parse(jsonStr) );

            //this.connect().close();
        });
    };

    /**根据ID查询记录*/
    service.findDataById = function(tableName, schema, id, fields, options, callback) {

        var model = this.connect().model(tableName, schema, tableName);

        model.findById(id, function (error, result) {

            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }

            callback( JSON.parse(jsonStr) );
        });
    };

    /**根据条件查询记录*/
    service.findDataByOne = function(tableName, schema, filter, fields, options, callback)
    {
        var model = this.connect().model(tableName, schema, tableName);
        model.findOne( filter, function (error, result) {
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}';
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }

            callback( JSON.parse(jsonStr) );
        });

    };

    /**根据ID删除记录*/
    service.deleteDataById = function(tableName, schema, id, options, callback) {

        var model = this.connect().model(tableName, schema, tableName);

        model.findByIdAndRemove(id, options, function(error,rs){
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else {

                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';

            }
            callback( JSON.parse(jsonStr) );
        });
    };

    /*删除记录*/
    service.deleteDataByFilter = function (tableName, schema, filter, callback)
    {
        var model = this.connect().model(tableName, schema, tableName);

        model.remove(filter, function(error){
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";
            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else {
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            callback( JSON.parse(jsonStr) );
        });
    };

    /*更新记录*/
    service.updateData = function (tableName, schema, filter, update, options, callback)
    {
        var model = this.connect().model(tableName, schema, tableName);

        model.update(filter, update, options, function(error,result){
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }

            callback( JSON.parse(jsonStr) );
            //db.close();
        });
    };

    /**
     * 鏌ヨ鏁版嵁
     */
    service.getDatas = function (tableName, schema, filter, fields, options)
    {
        var MyModel = this.connect().model(tableName, schema, tableName);
        
       
        MyModel.find(filter, fields, options, function(error, result){

            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            //callback( JSON.parse(jsonStr) );
            //console.log(jsonStr);
            deferred.resolve(JSON.parse(jsonStr));
            //this.connect().close();
        });
        return deferred.promise;
    };

    /*返回一条记录*/
    /**根据条件查询记录*/
    service.getDataByOne = function(tableName, schema, filter, fields, option)
    {
        var model = this.connect().model(tableName, schema, tableName);
       
        model.findOne( filter, function (error, result) {
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}';
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            deferred.resolve(JSON.parse(jsonStr));
            //callback( JSON.parse(jsonStr) );
        });
        return deferred.promise;
    };

    /**
     * count 方法
     */
    service.count = function(tableName, schema,  filter){
        var Model = this.connect(tableName ).model(tableName, schema, tableName);
      
        Model.count(filter, function(error, result){
            var code = ConstantStatus.SUCCESS;
            var message = ConstantStatus.SUCCESS_MSG;
            var jsonStr = "";

            if(error) {
                logger.error(error);
                code = ConstantStatus.DBERROR;
                message = ConstantStatus.DBERROR_MSG;
                var errStr = JSON.stringify(error);
                jsonStr = '{"status": "'+code+'", "message": "'+message+'", "error":'+errStr+'}';
            } else if(result) {
                var docStr = JSON.stringify(result);

                jsonStr = '{"status": "'+code+'", "message": "'+message+'","data":'+docStr+'}' ;
            } else {
                code = ConstantStatus.DBNULL;
                message = ConstantStatus.DBNULL_MSG;
                jsonStr = '{"status": "'+code+'", "message": "'+message+'"}';
            }
            deferred.resolve(JSON.parse(jsonStr));
            //this.connect().close();
        });
        return deferred.promise;
    }

    return service;
}();