var http = require('http');
var qs = require('querystring');

var host='192.168.1.104';
var port='6001';

//Get
//path : 请求路径
//token : access_token
//callback : 回调方法
exports.Get = function (path, token, callback) {
    var Authorization = "Bearer " + token;
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'Get',
        headers: {
            'Authorization': Authorization
        }
    };

    http.get(options, function (res) {
        
        res.on("data", function (data) {
            console.log(data);
            callback(data);
        });
        res.on("end", function () {
            //callback(null, JSON.parse(resData));
        });
    });
}


//Post
//path : 请求路径
//token : access_token
//reqData : post data
//callback : 回调方法
exports.Post = function (path, token, reqData, callback) {
    var Authorization = "Bearer " + token;
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        headers: {
            'Authorization': Authorization
        }
    };

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
   
        res.on('data', function (chunk) {
            callback(chunk);
        });
    });
 
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(qs.stringify(reqData));
    req.end();
}
