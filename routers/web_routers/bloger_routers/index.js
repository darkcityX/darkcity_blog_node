const express = require('express');
const blogerRouters = express.Router();

let projectInfo = require("./../../../config")

// 查询博主信息接口
blogerRouters.get("/queryInfo",(req,res)=>{
    let result = {
        success: true,
        message: "查询成功！",
        entity: {
            avater: `${projectInfo.url}${projectInfo.imagePath}/cc.jpg`,
            name: "darkcity_X",
            age: "26",
            tags: ['2年coder','移动端','pc端','react','vue','node'],
            signature: "执行 执行",
            github: "https://github.com/darkcityX",
            qq: "1668684752",
            wechat: "du1313107"
        }
    }
    res.send(result);
});


module.exports = blogerRouters;