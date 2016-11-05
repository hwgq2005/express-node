
//状态编号
var status = {

    SUCCESS : 0,
    SUCCESS_MSG : '操作成功',

    PASSWORK : 1,
    PASSWORK_MSG : '密码错误',

    PARAME : 2,
    PARAME_MSG : '参数错误',

    TOKEN : 3,
    TOKEN_MSG : '令牌过期',

    USERNULL : 4,
    USERNULL_MSG : '帐户不存在',

    DBERROR : 5,
    DBERROR_MSG : '操作数据库异常',

    DBNULL : 6,
    DBNULL_MSG : '没有查询结果',

    EXCEPTION : 7,
    EXCEPTION_MSG : '其他异常',

    USEREXIT : 8,
    USEREXIT_MSG : '账号已存在',

    USERACTION : 9,
    USERACTION_MSG : '账号未激活'

};

//状态名称
module.exports = status;
