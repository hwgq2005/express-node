

//状态编号
var actionStatus = {
    
    SUCCESS : 0,
    SUCCESS_MSG : '申请中',

    PASSWORK : 1,
    PASSWORK_MSG : '已激活',

    PARAME : 2,
    PARAME_MSG : '未通过',

    TOKEN : 3,
    TOKEN_MSG : '已删除',

    USERNULL : 4,
    USERNULL_MSG : '已上架',

    DBERROR : 5,
    DBERROR_MSG : '已下架',

    DBNULL : 6,
    DBNULL_MSG : '没有查询结果',

    EXCEPTION : 7,
    EXCEPTION_MSG : '其他异常',


    USEREXIT : 8,
    USEREXIT_MSG : '账号已存在'

};

//状态名称
module.exports = status;
