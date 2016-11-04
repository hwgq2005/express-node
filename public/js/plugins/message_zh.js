/*
 * author       : Richa
 * date         : 2016-01-21
 * description  : 验证提示逻辑
 */


/**
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：地区码
 * yymmdd: 出生年月日
 * xx: 顺序类编码，无法确定
 * p: 性别，奇数为男，偶数为女
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：地区码
 * yyyymmdd: 出生年月日
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
 *
 */
 define(['jqueryVdt'], function() {


    $.extend($.validator.messages, {
        required : "不能为空",
        remote : "请修正该字段",
        email : "请输入正确格式的电子邮件",
        url : "请输入合法的网址",
        date : "请输入合法的日期",
        dateISO : "请输入合法的日期 (ISO).",
        number : "请输入合法的数字",
        digits : "只能输入整数",
        creditcard : "请输入合法的信用卡号",
        equalTo : "请再次输入相同的值",
        accept : "请输入拥有合法后缀名的字符串",
        maxlength : $.validator.format("请输入长度最多为 {0}的字符"),
        minlength : $.validator.format("请输入长度至少为 {0}的字符"),
        rangelength : $.validator.format("长度介于 {0} 和 {1}间"),
        range : $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max : $.validator.format("最大值不超过 {0}"),
        min : $.validator.format("最小值不低于 {0}")
    });


    // 添加新验证规则（校验本值是否大于指定元素的值）
    $.validator.addMethod('gt', function (value, element, params) {
        
        if (params === false || value === '') {
            return true;
        } else {
            var $target = $(params);
            if ($target.length > 0) {
                if ($.isNumeric($target.eq(0).val()) && $.isNumeric(value)) {
                    return (parseFloat($target.eq(0).val()) < parseFloat(value)) ? true : false;
                } else {
                    return ($target.eq(0).val() < value) ? true : false;
                }
            }
        }
    }, '必须大于指定值');


    // 添加新验证规则（校验是否是手机号码）
    $.validator.addMethod('tel', function (value, element, params) {
        if (params === false || value === '') {
            return true;
        } else {
            return (/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) ? true : false;
        }
    }, '手机号格式不正确');


    // 添加新验证规则（校验网址）
    $.validator.addMethod('domain', function (value, element, params) {
        if (params === false || value === '') {
            return true;
        } else {
            return (/^(((ht|f)tp(s?))\:\/\/)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$/.test(value)) ? true : false;
        }
    }, '网址格式不正确');


    // 添加新验证规则（校验是否是身份证号码）
    $.validator.addMethod('idCardValid', function (value, element, params) {
        if (params === false || value === '') {
            return true;
        } else {
            var idCard = $.trim(value.replace(/ /g, ""));
            if (idCard.length == 15) {
                return isValidityBrithBy15IdCard(idCard);
            } else if (idCard.length == 18) {
                var a_idCard = idCard.split("");// 得到身份证数组
                if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }, '请输入正确的身份证号码');


    // 添加新验证规则（校验是否是邮箱号码）
    $.validator.addMethod('mail', function(value, element, params) {
        if (params === false || value === '') {
            return true;
        } else {
            return (/^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/.test(value)) ? true : false;
        }
    },'邮箱格式不正确');


    $.validator.addMethod('cash', function(value, element, params) {
        if (params === false || value === '') {
            return true;
        } else {
            return (/^([1-9]\d{0,15}|0)(\.\d{1,2})?$/.test(value)) ? true : false;
        }
    },'金额最多保留两位小数');


    // 添加新验证规则（校验是否银行卡账号）
    $.validator.addMethod("luhmCheck", function(value, element) {
        var lastNum = value.substr(value.length - 1, 1);// 取出最后一位（与luhm进行比较）
        var first15Num = value.substr(0, value.length - 1);// 前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array(); // 奇数位*2的积 <9
        var arrJiShu2 = new Array(); // 奇数位*2的积 >9

        var arrOuShu = new Array(); // 偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {// 奇数位
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            } else
            // 偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();// 奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();// 奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; // 奇数位*2 < 9 的数组之和
        var sumOuShu = 0; // 偶数位数组之和
        var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        // 计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        // 计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;
        return this.optional(element) || (lastNum == luhm);
    }, "请输入正确的银行卡账号");

        

    //重写jquery验证的提示方法
    $.validator.setDefaults({

        success : $.noop,
        onkeyup : false,
        ignore  : '.ignore',

        /**
         * 不管是否出错都会调用该函数
         */
        errorPlacement: function(error, element) {
            var $formGroup = $(element).closest('.form-group');

            if (error.is(':empty')) {
                $formGroup.removeClass('error').addClass('success').find('.help-block').html('');
            } else {
                $formGroup.addClass('error').removeClass('success').find('.help-block').html(error[0].innerHTML);
            }
        }
    });

});

function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
};

function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
};

var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量
    console.log(a_idCard[17]);
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];// 加权求和
    }
    var valCodePosition = sum % 11;// 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}