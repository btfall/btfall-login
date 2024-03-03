const express = require('express')
const router=express.Router()
const routerhander=require('../router_hander/user')
const expressJoi=require('@escook/express-joi')
const {reg_login_schema}=require('../schema/user')
//注册新用户
router.post('/reguser',expressJoi(reg_login_schema),routerhander.reguser)
//登录
router.post('/login',expressJoi(reg_login_schema),routerhander.login)
module.exports=router