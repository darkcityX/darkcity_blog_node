const uuid = require('node-uuid');

const pool = require('./../../connent');

/*** ---------- 文章分类：开始 ---------- ***/

/**
 * @description: 校验文章分类是否重名
 * @param {String} typeName 分类名 
 * @return: Promise
 * @Date Changed: 2020-09-04
 */
// 
function checkArticleTypeName(typeName){
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM articleClass WHERE type_name = ?',[typeName], (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

/**
 * @description: 新增【文章分类】
 * @param {JSON} typeData 新增需要的字段
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function addArticleType(typeData) {
    const {type_name,description} = typeData;
    let tid= uuid.v4();
    let create_time = new Date().getTime();

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO articleClass VALUES (?,?,?,?)', [tid, type_name, description, create_time], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/**
 * @description: 查询【文章分类】
 * @param {type} 
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function queryArticleType() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM articleClass', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/**
 * @description: 删除【文章分类】
 * @param {String}} tid 文章id
 * @return: Promise
 * @Date Changed: 2020-08-07
 */
function deleteArticleType(tid) {

    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM articleClass WHERE tid = ?', [tid], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/*** ---------- 文章分类：结束 ---------- ***/


/*** ---------- 文章标签：开始 ---------- ***/
/**
 * @description: 新增【文章标签】
 * @param {JSON} tagData 新增需要的字段
 * @return: Promise
 * @Date Changed: 2020-08-12
 */
function addArticleTag(tagData) {
    const {label,relevancy} = tagData;
    let gid= uuid.v4();
    let create_time = new Date().getTime();

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO articleTags VALUES (?,?,?,?)', [gid, label, relevancy, create_time], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/**
 * @description: 查询【文章标签】
 * @param {type} 
 * @return: Promise
 * @Date Changed: 2020-08-12
 */
function queryArticleTags() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM articleTags', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/**
 * @description: 删除【文章分类】
 * @param {String}} tid 文章id
 * @return: Promise
 * @Date Changed: 2020-08-07
 */
function deleteArticleTag(gid) {

    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM articleTags WHERE gid = ?', [gid], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

/*** ---------- 文章标签：结束 ---------- ***/

/*** ---------- 文章数据：开始 ---------- ***/


/**
 * @description: 查询【文章列表】
 * @param {Array}   queryParams 查询参数
 * @param {String}      queryData.gid       文章编号id
 * @param {String}      queryData.type_id   文章类型id
 * @param {String}      queryData.title     文章标题
 * @return: Promise
 * @Date Changed: 2020-07-31
 */
function queryArticleList(tableState, queryParams) {
    // console.log( "queryParams::", queryParams );
    return new Promise((resolve, reject) => {        

        let sql = "SELECT * FROM articleDetails";
        let query = [];

        // 筛选参数处理
        queryParams.length > 0 ? queryParams.forEach((el,idx) => {
            if(idx === 0){
                sql += ` WHERE ${el.key} = ?`;
            }else if(queryParams.length-1 == idx ){
                sql += ` AND ${el.key} = ? ORDER BY create_time DESC`
            }else{
                sql += ` AND ${el.key} = ?`;
            }
            query.push(el.value);
        }): sql += ` ORDER BY create_time DESC`;

        // 页码参数处理
        if (!!tableState && JSON.stringify(tableState) !== "{}") {
            let currentPage = tableState.currentPage || 1;
            let pageSize = tableState.pageSize || 2;

            let start = Number((currentPage - 1) * pageSize);
            let end = Number(pageSize);

            sql += ` LIMIT ?,?`;

            query.push(start, end);

        }

        // console.log("sql:  ", sql);
        // console.log("query:  ", query);


        pool.query(sql, query, (err, result) => {
            if (err) {
                reject(err);
            } else {
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
function queryArticleDetails(id) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM articleDetails WHERE aid = ?', [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * @description: 新增文章
 * @param {String} type_id      分类id
 * @param {String} type_name    分类名称
 * @param {Array}  tags         标签数据
 * @param {String}  tags.gid        标签id
 * @param {String}  tags.label      标签名称
 * @param {String} title        标题
 * @param {String} create_time  创建时间
 * @param {String} introduce    简介
 * @param {String} content      内容
 * @return: Promise
 * @Date Changed: 2020-08-13
 */
function addArticle({type_id, type_name, tags, title, create_time, introduce, content}=params){
    let aid = uuid.v4();
    let view_count = 0;
    create_time = !create_time ? new Date().getTime() : new Date(Date.parse(create_time.replace(/-/g, "/"))).getTime();



    return new Promise((resolve,reject)=>{

        pool.query('INSERT INTO articleDetails VALUE(?,?,?,?,?,?,?,?,?)', [aid, type_id, type_name, tags, title, view_count, create_time, introduce, content],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });

    })

}

/**
 * @description: 删除文章
 * @param {String} aid 
 * @return: Promise
 * @Date Changed: 2020-08-17
 */
function deleteArticle(aid){
    return new Promise((resolve,reject)=>{
        pool.query('DELETE FROM articleDetails WHERE aid = ?',[aid],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}

/*** ---------- 文章数据：结束 ---------- ***/



module.exports = {
    checkArticleTypeName, //校验分类是否重名
    addArticleType,     // 新增文章分类类
    queryArticleType,   // 查询文章分类类列表
    deleteArticleType,  // 删除文章分类类

    addArticleTag,      // 新增文章标签类
    queryArticleTags,   // 查询文章标签类
    deleteArticleTag,   // 删除文章标签类

    queryArticleList,   // 查询文章列表
    queryArticleDetails,// 查询文章详情
    addArticle,         // 新增文章
    deleteArticle       // 删除文章
}
