const express = require('express');
const admintorRouters = express.Router();

let projectInfo = require("./../../../config");

const JwtUtil = require('../../../public/utils/jwt');

const admintorPool = require("./../../../db/stage/admintor_pool/index");

// 后台登陆接口
admintorRouters.post("/login", (req, res) => {
    const {username,password} = req.body;
    
    if(!username){
        return res.send({
            success: false,
            message: "字段缺失：username"
        })
    }

    if (!password) {
        return res.send({
            success: false,
            message: "字段缺失：password"
        })
    }

    admintorPool.queryAdmintorLogin(username,password)
        .then(data=>{
            // console.log( "登陆：" , data ); 
            if(data.length == 0){
                return res.send({
                    success: false,
                    message: "账户或密码错误！"
                })
            }else{
                const {uid} = data[0];

                // 将用户id传入并生成token
                let jwt = new JwtUtil(uid.toString());
                let token = jwt.generateToken();

                return res.send({
                    success: true,
                    message: "登陆成功！",
                    entity: {
                        token: token
                    }

                })

            }
        })
        .catch(err=>{
            return res.send({
                success: false,
                message: `接口异常！原因：${err}`
            })
        })


});

// 管理员身份信息查询接口
admintorRouters.get("/queryInfo",(req,res) => {
    
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let uid = jwt.verifyToken();
    
    // console.log("queryInfo接口：", uid);

    // 通过token中传递过来的uid进行身份信息查询

    admintorPool.queryAdmintorInfo(uid)
        .then(data=>{
            
            let result = JSON.parse(JSON.stringify(data[0]));

            // 数据修改
            delete result.password;
            result.avater = projectInfo.url + result.avater;

            return res.send({
                success: true,
                message: "查询成功！",
                entity: result
            })
        })
        .catch(err=>{
            return res.send({
                success: false,
                message: `接口异常！原因：${err}`
            })
        })



});


module.exports = admintorRouters;