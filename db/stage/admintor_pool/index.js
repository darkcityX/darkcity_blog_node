const pool = require('./../../connent');

/**
 * @description: 校验管理员账户及密码（登陆功能）
 * @param {string} username 管理员账号 
 * @param {string} password 管理员密码 
 * @return: Promise
 * @Date Changed: 2020-08-05
 */
function queryAdmintorLogin(username,password){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM admintor WHERE username = ? AND password = ?', [username,password],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}

/**
 * @description: 通过管理员id查询用户信息
 * @param {string} uid 管理员id
 * @return: Promise
 * @Date Changed: 2020-08-05
 */
function queryAdmintorInfo(uid){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM admintor WHERE uid = ?',[uid],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

module.exports = {
    queryAdmintorLogin,
    queryAdmintorInfo
}
