const pool = require('./../../connent');

/**
 * @description: 查询【文章分类】
 * @param {type} 
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function queryArticleType(){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM articleClass',(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

/**
 * @description: 查询【文章列表】
 * @param {type} 
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function queryArticleList(){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM articleDetails',(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

/**
 * @description: 查询【文章详情】
 * @param {string} id 文章aid 
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function queryArticleDetails(id){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM articleDetails WHERE aid = ?',[id],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}



module.exports = {
    queryArticleType,
    queryArticleList,
    queryArticleDetails
}
