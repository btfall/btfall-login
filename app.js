const express = require('express')
const app=express()
const joi=require('@hapi/joi')
const config=require('./config')
const expressJWT=require('express-jwt')

//配置cors中间件解决跨域
const cors=require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))
//报错中间件
app.use(function(req,res,next){
    res.cc=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error? err.message:err,
        })
    }
    next()
})
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\/login/]}))
//导入使用router

const userRouter=require('./router/user')
const userinfoRouter=require('./router/userinfo')
app.use('/api',userRouter)
app.use('/my',userinfoRouter)
//定义错误级别中间件
app.use((err,req,res,next)=>{
    //验证失败错误
    if(err instanceof joi.ValidationError)return res.cc(err)
    if(err.name==='UnauthorizedError')return res.cc('身份认证失败')
    //未知错误
    res.cc(err)
})

app.listen(3007,function(){
    console.log('http://127.0.0.1:3007')
})