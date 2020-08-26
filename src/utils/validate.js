/**
 * 过滤特殊字符
 */
export function stripscript(str) {
    //格式 RegExp("[在中间定义特殊过滤字符]")
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/***
 * 验证邮箱
 */
export function validateEmail(value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (reg.test(value)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 验证密码
 */
export function validatePass(value) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return reg.test(value) ? false : true;
}
/**
 * 验证验证码
 */
export function validateVCode(value){
    let reg=/^[0-9A-Za-z]{6}$/;
    return reg.test(value) ? false : true;
}