
var https = require('https');
var article = require('../database/entity/article');
var user = require('../database/entity/user');
var dbService = require('../database/util/DbService');
var ConstantStatus = require('../database/util/ConstantStatus');

var AliayOrder =require('./AliayOrder');
AliayOrder  = new AliayOrder();
exports.index = function(req, res) {
    res.render("topic/index", {
        title: "首页",
        name: req.session.user.user
    });
}

exports.detail = function(req, res) {

    var id = req.query.id;
    if (id) {
        dbService.findDataById(article.tableName, article.schema, id, "", '', function(data) {
            console.log(data)
            if (data.status == 0) {
                res.render("topic/topic-detail", {
                    title: data.data.title,
                    data: data.data,
                    name: req.session.user.user
                });
            } else {
                res.redirect("/");
            }

        })
    } else {
        res.redirect("/");

    }

}

exports.updateSave = function(req, res) {


    var id = req.query.id;
    if (id) {
        dbService.findDataById(article.tableName, article.schema, id, "", '', function(data) {
            console.log(data)
            if (data.status == 0) {
                res.render("topic/topic-add", {
                    title: "编辑资讯",
                    data: data.data,
                    name: req.session.user.user
                });
            } else {
                res.redirect("/");
            }

        })
    } else {
        res.render("topic/topic-add", {
            title: "新增资讯",
            data: '',
            name: req.session.user.user
        });
    }



}

// // // // 列表
// exports.list = function(req, response) {

//     //网关地址，示例中为沙箱环境,正式环境请修改为https://openapi.alipay.com/gateway.do?
//     var GATEWAY_URL = 'https://openapi.alipay.com/gateway.do?';
//     // var GATEWAY_URL = 'https://openapi.alipaydev.com/gateway.do?';
//     var APP_ID = '2018010901733082';

//     //签名方式
//     var SIGN_TYPE = 'RSA2';
//     var PRIVATE_KEY = 'MIIEowIBAAKCAQEAvjOdao2AhdpwAsd9jcIJkm/nYPbWXnUltWBX+QU8CdbMGf6IZijyJ2x2c8Xdvn82juYwuKrOlMNmjmn2abA9WBzRHjWj+UNZ6cWQAZBeUMZIdIdNS3DQ8DicDjhlQ5ajdAAB78C0vu+erlltQOUxjyH1TTwIp0okWNPciWqVKXWcPKk+0wMlGnNIrVEipNha51v8sIjio0mev1rkT+lOJjjET/pqy/Krn4xY4Ec7EU0HJvO9ZjBlKxPZKuS9UOI/fFFijhN7eFH5FWk+txfu115j5iXyrmer25a4Ezu03xEzuQEudBCob7eCUXfzcIRIs2wRZvwRsq+IapKazCQpfwIDAQABAoIBAAmY+ymESGb4tcw+GsTLdMYx5WAMNJcBnEyBtw62x+fLMfNh16ooCMgafgOriVvyeWNOlEjNPa1eCs/G4wtEPGQ02AyJMmQClQfp0zFxAoFa8A8JQMo8wB5PDPjeuaVmdYsF8RMTC0vTNZOgqZWruwt48DLcg6dFY34j+q3odexoj5NiS59J5TtIVhJqm9iSeBJJYfRzFh0IfT0zdwr6zVa6IvxELBgivIHD9cOPiA/YnDO/QTM2Gdfkwo9em42OrAamm5XtcQ3PINHSSQsODHIetAoA8bVp7r06/s2ntkMtD9gecmBkPDiGLr2u3IiYEDBiImtgRNy2BbcFfrkw+gECgYEA6OgGMM/ZgW4TVCF0DFQ5Yc2ZRFap/bgwFXnyHxPQdSWuSDs5+6j/xDzMuGFZPT5ic2Lp4M4K80ML0uXnLIYvTte54cqCtKLGHt37+AKkRkAhdlLf8ye0OGWkVTL2fr9JepVSx2OkKYVq2/ULBSB08fUiDmLv89gdgyCi0wKJMn8CgYEA0Q+YhrqqVaDzjTiX8DblXiRA4dtMspdy2Rs+LNq5ryiuRWW2Q+rC2+PVucTjBz0mfXGPUsQD6+hLVmFjNoRkUndVm4HDe5IbUyMjDIrf6ybTK+oNll+iy7KA0iS9XEv1AeRp2uJk3K3jHgy47qoe6lUjoYPgv2nKa7NurX3riQECgYBeemiwelA4Icfzc9KYgb35P6axwxoYExRmUd523tnL+6oUIPpnbOm72BIPpWXG4zyapABNsiddANCWD67UL+aW7Am6XyTgU7tcoB3rQF8VJESus/WmtG92BT1BVngJeF09Pb+jpHbeZQGxElkTDlSCJjdXcKj32K44GBAU2s1+zwKBgQCy/TVLdJnNQkYDTMbZBUcPeN6MAKQD66KKusZaxNFhY+UAyXppX5+Bf+lGaYkuc252zDk3VVc+LN4DkNHOpT73U/BZeZoSPB9k6JpjbKsVu2HlITiM3EiXObcNNCNj2CxmeFcg7eAJCF+BJMdYnxJk8ovVBwHvH/YMi81ggISeAQKBgCgjS9eywOcUC9Z/+wjWJG8vWhecUkQhzG/JJC8XG3CCEOhxgfPdJmhQS5qDOIn7XUO07uYAd9757iF2tu5eKOQlhJhhR56kS1HSuMaroai3/DJyWQLlyaxovovC/2uK7dKhqMJnL0pyF/vzlOfcnIdixnckMHClTiLNv2pVXWrm';
//     var ALI_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAriA5h+qR8hORQf4pBTpAPQtXASlAfLmjtyRULkcWjJoKyHmBbL7Xt4CzoNAp/BCiAhxLtT13Dkl7BsKEO/dPjrbtBZGRCHUOxSn3p0Nh+g4wfPWIETsRXN5Sce2ENNzg6x5NOTE5bMKrJmHBMwPmkcAGDpbJollpeqWfBfupQC6Fy1LWw5vAWgMBGxG/bm1OiLTZwYW21fTq+ds3ga4BL+iUnm1VhZfsYOT/uwHvJbqOJES6ZJcfH17wgpR7ExmksUeZnqT67WEa6GMIN8jG47xpyaH5y2nMz6PFER9QhsTXMp1UY9RMR3vu25mE9c/Q75HsrK4PvnmmHXlKDXTo1QIDAQAB';
//     //将RSA公私钥转换为PEM格式
//     // var privateKey = '-----BEGIN PRIVATE KEY-----\n' + PRIVATE_KEY + '\n-----END PRIVATE KEY-----';
//     var privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' + PRIVATE_KEY + '\n-----END RSA PRIVATE KEY-----';
//     var aliPublicKey = '-----BEGIN PUBLIC KEY-----\n' + ALI_PUBLIC_KEY + '\n-----END PUBLIC KEY-----';

//     // var privateKey = PRIVATE_KEY;
//     // var aliPublicKey = ALI_PUBLIC_KEY;
//     //准备业务请求参数、签名用的应用私钥、验签用的支付宝公钥，示例中为预下单接口
//     var date = new Date();
// 	var dateStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//     var requestParams = {
//         app_id: '2018010901733082',
//         method: 'alipay.trade.app.pay',
//     	charset: 'UTF-8',
//     	format:'json',
//         sign_type: 'RSA2',
//         timestamp: '2018-02-25 20:26:31',
//         version: '1.0',
//         notify_url:'', //测试
//         biz_content: {
// 		    "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
// 		    "subject":"大乐透",
// 		    "out_trade_no":"70501111111S001111119",
// 		    "timeout_express":"30m",
// 		    "total_amount":9.00,
// 		    "product_code":"QUICK_MSECURITY_PAY"
//         }
//     }
//     //将biz_content参数序列化为JSON格式字符串
//     // requestParams.biz_content = JSON.stringify(requestParams.biz_content);
//     //去除无效参数，排序并生成待签名字符串
//     var preStr = '';
//     var keySet = [];
//     for (var key of Object.keys(requestParams).sort()) {
//         if (!requestParams[key] || key == 'sign') {
//             continue;
//         }
//         keySet.push(key);
//     }
//     for (var i = 0; i < keySet.length; i++) {
//         var key = keySet[i];
//         var value = requestParams[key];
//         if (i == keySet.length - 1) {
//             preStr = preStr + key + '=' + value + '';
//         } else {

//         	if (key == 'biz_content') {
//         		value = JSON.stringify(value);
//         	}
//             preStr = preStr + key + '=' + value + '&';
//         }
//     }

//     //生成签名
//     var crypto = require('crypto');
//     var qs = require('querystring');
//     var https = require('https');

//     var signer = crypto.createSign('RSA-SHA256');

//     signer.update(preStr);
//    	var sign = signer.sign(privateKey, 'base64');
//    	console.log(sign)

//     //请求支付宝

//     requestParams.biz_content = JSON.stringify(requestParams.biz_content);
//     requestParams.sign = sign;

//     for (let key in requestParams) {
//     	requestParams[key] = encodeURI(requestParams[key])
//     }
 
//     var requestUrl = GATEWAY_URL + qs.stringify(requestParams);
  	
//     // console.log(encodeURI(content),'content')

//   	console.log(qs.stringify(requestParams),111);
//     https.get(requestUrl, function(res) {
//         res.setEncoding('utf8')
//         res.on('data', function(chunk) {
//             console.log("响应数据：" + chunk);
//             //对响应数据进行验签应数据进行验签
//             var responseData = JSON.parse(chunk);
//             //获取待验签字符串
//             var preVerifyStr = JSON.stringify(responseData.alipay_trade_precreate_response);
//             //转义正斜杠
//             var reg = new RegExp('/', "g");
//             preVerifyStr = preVerifyStr.replace(reg, '\\/');
//             //验签
//             var verifier = crypto.createVerify('RSA-SHA256');
//             if (SIGN_TYPE == 'RSA') {
//                 verifier = crypto.createVerify('RSA-SHA1');
//             }
//             verifier.update(preVerifyStr);
//             console.log("验签结果：" + verifier.verify(aliPublicKey, responseData.sign, 'base64'));
//             response.json(responseData);

//         });
//     }).on('error', function(e) {
//         console.log("Got error: " + e.message);
//     });


//     // dbService.findDatas(article.tableName, article.schema, {}, "", "", function(data) {
//     //     res.json(data);
//     // });

// }

exports.list = function(req, res) {

    dbService.findDatas(article.tableName, article.schema, {}, "", "", function(data) {
       
        var filter = {};
        filter._id = { "$in": ['5aa0fb0a3208a708d0dc031d','5ab30d0e0d9039328cd33144'] };

        var arr=[{
            id:'5aa0fb0a3208a708d0dc031d',
            num:1
        },{
            id:'5ab30d0e0d9039328cd33144',
            num:2
        }]
           
        res.json(data);
        
    });


}


// 获取授权token
function getUserToken(){

    var str = AliayOrder.buildTokenParams('alipay.system.oauth.token',{
        code:'8c118e9ab51d475eafc2325cadbaTB17'
    },1)

    var requestUrl = AliayOrder.accountSettings.APP_GATEWAY_URL + str;

    https.get(requestUrl, function(res) {

        res.setEncoding('utf8')
        res.on('data', function(chunk) {

            var chunk  = JSON.parse(chunk);
            if (chunk.alipay_system_oauth_token_response) {

                console.log(chunk.alipay_system_oauth_token_response.access_token,'token')
                getUserMsg(chunk.alipay_system_oauth_token_response.access_token);
            }
            console.log(chunk,'相应数据');
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

// 根据token获取用户消息
function getUserMsg(token){

    var str = AliayOrder.buildTokenParams('alipay.user.info.share',{
        auth_token:token
    },2)

    var requestUrl = AliayOrder.accountSettings.APP_GATEWAY_URL + str;

    https.get(requestUrl, function(res) {

        res.setEncoding('utf8')
        res.on('data', function(chunk) {
            var chunk  = JSON.parse(chunk);
            console.log(chunk,"用户信息" );
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}
// 支付接口
// exports.list = function(req, res) {

//    	// var str = AliayOrder.buildParams('大乐透',new Date().getTime(),'0.01');
//     var str = AliayOrder.buildParams('alipay.trade.app.pay',{
//         subject: '大乐透',  
//         out_trade_no: new Date().getTime(),  
//         total_amount: '0.01',  
//         product_code: 'QUICK_MSECURITY_PAY',
//         goods_type:1,
//         enable_pay_channels:'balance,moneyFund,credit_group'
//     })


//    	res.json({ali_data:str});
   	
// }

// 支付回调
exports.notify = function(req, res) {

    let status = AliayOrder.verifySign(res.body);
    
    console.log(res.body,'回调参数')
    console.log(status,'回调参数')

    if (status) {
        res.end('success');
    }else{
        res.end('failure');
    }
    
}
// 退款接口
// exports.list = function(req, response) {

//     var str = AliayOrder.buildParams('alipay.trade.refund',{
//        out_trade_no: '1521083331614',  
//         refund_amount: '0.01'
//     })

//     var requestUrl = AliayOrder.accountSettings.APP_GATEWAY_URL + str;

//     https.get(requestUrl, function(res) {

//         res.setEncoding('utf8')
//         res.on('data', function(chunk) {
//             console.log("响应数据：" + chunk);
//             response.json(JSON.parse(chunk));
//         });
//     }).on('error', function(e) {
//         console.log("Got error: " + e.message);
//     });

// }

// 添加文章
exports.save = function(req, res) {

    var values = req.body;
    if (values.title != '' && values.content != '') {
        dbService.saveOrUpdate(article.tableName, article.schema, {}, {}, values, function(data) {
            res.json(data);
        })
    }

}

// 更新文字
exports.update = function(req, res) {

    var id = req.params.id;
    var values = req.body;

    if (values.title != '' && values.content != '') {
        dbService.updateData(article.tableName, article.schema, { _id: id }, values, {}, function(data) {
            res.json(data);
        })


    }

}

// 删除文章
exports.delete = function(req, res) {

    var id = req.params.id;
    if (id) {
        dbService.deleteDataById(article.tableName, article.schema, id, "", function(data) {
            res.json(data);
        })
    }

}
function dateFtt(fmt, date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 