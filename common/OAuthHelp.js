var http = require('http');
var qs = require('querystring');

var appid = '111';
var secret = '222';
var redirect_uri = 'http://localhost:3000/';
var host='192.168.1.104';
var port='5001';

//跳转认证页面
exports.RedirectOAuth=function(res){
    res.redirect('http://'+host+':'+port+'/OAuth/Authorize?client_id='+appid+'&redirect_uri='+redirect_uri+'&response_type=code&scope=');
}

//密码模式
exports.getAccessTokenByPassWord = function (username, password, callback) {
    var str = appid + ":" + secret;
    var strBase64 = new Buffer(str).toString("base64");
    var Authorization = "Basic " + strBase64;
    var options = {
        host: host,
        port: port,
        path: '/OAuth/Token',
        method: 'POST',
        headers: {
            'Authorization': Authorization
        }
    };

    var reqData = {
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_id': appid
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

//授权码获取accesstoken
exports.getAccessTokenByCode = function (code,callback) {
    var str = appid + ":" + secret;
    var strBase64 = new Buffer(str).toString("base64");  
    var Authorization = "Basic " + strBase64;
    var options = {
        host: host,
        port:port,
        path: '/OAuth/Token',
        method: 'POST',
        headers: {
            'Authorization': Authorization
        }
    };

    var reqData = {
        'redirect_Uri': redirect_uri,
        'code': code,
        'grant_type': 'authorization_code'
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
 
};

//刷新refresh_token
exports.Refresh = function (RefreshToken,callback) {
    var str = appid + ":" + secret;
    var strBase64 = new Buffer(str).toString("base64");
    var Authorization = "Basic " + strBase64;
    var options = {
        host: host,
        port: port,
        path: '/OAuth/Token',
        method: 'POST',
        headers: {
            'Authorization': Authorization
        }
    };

    var reqData = {
        'refresh_token': RefreshToken,
        'grant_type': 'refresh_token'
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
