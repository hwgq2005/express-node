
var nodemailer = require('nodemailer');

module.exports = function() {

    var service = {};

    service.paySuccessNotice=function(){
        // 开启一个 SMTP 连接池
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.qq.com", // 主机
            secureConnection: true, // 使用 SSL
            sercure: true, 
            port: 465, // SMTP 端口
            // service:'qq',

            auth: {
                user: '262281610@qq.com',
                pass: 'roptddprpenbbiai'
            }
        });

        // 设置邮件内容
        var mailOptions = {
            from: "262281610@qq.com", // 发件地址
            // to: "262281610@qq.com", // 收件列表
            to: "262281610@qq.com,474208459@qq.com", // 收件列表
            subject: "继续测试", // 标题
            html: "测试，别紧张" // html 内容
        }

        // 发送邮件
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response.message);
                console.log("Message sent: " + response.message);
            }
            smtpTransport.close(); // 如果没用，关闭连接池
        });

    }

    return service;
    
}();