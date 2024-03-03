const joi=require('@hapi/joi')
/*
string:字符串
alphanum:只能是a-z,A-Z,0-9
min:最小长度
max:最大长度
required:非空
pattern:正则
*/

const username=joi.string().alphanum().min(1).max(10).required()

const password=joi.string().pattern(/^[\S]{6,12}$/).required()
const admin=joi.string().alphanum()
exports.reg_login_schema={
    body:{
        username,
        password,
        admin
    }
}