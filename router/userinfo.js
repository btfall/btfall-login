const express=require('express')
const jwt=require('jsonwebtoken')
const config=require('../config')
const router =express.Router()
router.get('/userinfo',(req,res)=>{
    const token=req.headers.authorization.substring(7)
    const userinfo=jwt.verify(token, config.jwtSecretKey)
    //true代表管理员
    // console.log(userinfo.isadmin==='1')
        res.send({status:0,admin:userinfo})
})
module.exports=router