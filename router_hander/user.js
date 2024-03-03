const db=require('../db/index')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('../config')
exports.reguser=(req,res)=>{
    const userinfo=req.body
    const regusersql='select * from bt_user where username=?'
    db.query(regusersql,[userinfo.username],function(err,results){
        if(err){
            return res.cc(err)
        }
        if(results.length>0){
            return res.cc('用户名已存在')
        }
        userinfo.password=bcrypt.hashSync(userinfo.password,10)

        const adminsql='select * from admininfo where adminpassword=?'
        db.query(adminsql,[userinfo.admin],function(err,results){
            const sql='insert into bt_user set ?'
            if(err){
                return res.cc(err)
            }
            if(results.length!==1)return res.cc('注册失败')
            db.query(sql,{username:userinfo.username,password:userinfo.password},function(err,results){
            if(err){
                return res.send({status:1,message:err.message})
            }
            if(results.affectedRows!==1){
                return res.cc('注册失败，稍候再试')
            }
            res.cc('注册成功',0)
        })
        })
    })
}
exports.login=(req,res)=>{
    const userinfo=req.body
    const sql='select *from bt_user where username=?'
    db.query(sql,userinfo.username,function(err,results){
        if(err)return res.cc(err)
        if(results.length!==1)return res.cc('登录失败')
        //登录成功
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult)return res.cc('密码错误，登录失败')
        //服务端生成token
        const user={...results[0],password:''}
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        // res.cc('登录成功',0)
        // console.log(tokenStr)
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr,
        })
    })
}