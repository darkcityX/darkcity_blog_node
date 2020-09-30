const express = require('express');
const articleRouters = express.Router();

const articlePool = require("./../../../db/stage/article_pool");

const TOOLS = require("./../../../tools");

// 新增文章类型接口
articleRouters.post('/addType', async (req, res) => {

    const {type_name, description} = req.body;

    if(!type_name){
        return res.send({
            success: false,
            message: "字段缺失：type_name [分类名称]"
        });
    }

    try{
        const checkTypeName_result = await articlePool.checkArticleTypeName(type_name);
        const addType_result = await articlePool.addArticleType({type_name,description});
    
        if (checkTypeName_result.length>0) {
            return res.send({
                success: false,
                message: `失败：当前分类名已存在！分类名：${type_name}`
            })
        }else{
            // console.log("addType_result:::", addType_result);

            if (addType_result.affectedRows > 0) {
                return res.send({
                    success: true,
                    message: "文章类型添加成功！"
                })
            }else{
                return res.send({
                    success: false,
                    message: `新增分类失败：${message}`
                })
            }

        }
    }catch(err){
        return res.send({
            success: false,
            message: `失败!后台程序异常,原因：${err}`
        })
    }

    // articlePool.checkArticleTypeName(type_name)
    //     .then(data=>{
    //         console.log( "重名：：", data );
    //         if( data.length > 0 ){
    //             return res.send({
    //                 success: false,
    //                 message: `失败：当前分类名已存在！分类名：${type_name}`
    //             })
    //         }else{
    //             return articlePool.addArticleType({type_name,description});
    //         }
    //     })
    //     .then(data=>{
    //         console.log( "22222" );
    //     })
    //     .catch(err => {
    //         return res.send({
    //             success: false,
    //             message: `失败：${err}`
    //         })
    //     });


    // articlePool.addArticleType({type_name,description})
    //     .then(data=>{
    //         if (data.affectedRows > 0 ){
    //             return res.send({
    //                 success: true,
    //                 message: "文章类型添加成功！"
    //             })
    //         }else{
    //             return res.send({
    //                 success: false,
    //                 message: `新增分类失败：${message}`
    //             })
    //         }
    //     })

});

// 获取文章类型接口 
articleRouters.get('/queryType', (req, res) => {

    articlePool.queryArticleType()
        .then(result => {
            return res.send({
                success: true,
                message: "查询成功！",
                entity: {
                    list: result
                }
            });
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            });
        })
});

// 删除文章类型接口   未做是否存在id校验
articleRouters.get('/deleteType', (req, res) => {

    const {tid} = req.query;

    if (!tid) {
        return res.send({
            success: false,
            message: "字段缺失：tid [分类id]"
        });
    }


    articlePool.deleteArticleType(tid)
        .then(data => {
            if (data.affectedRows > 0) {
                return res.send({
                    success: true,
                    message: "文章类型删除成功！"
                })
            } else {
                return res.send({
                    success: false,
                    message: `删除分类失败：${message}`
                })
            }
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `失败：${err}`
            })
        });
});

// 新增文章标签接口
articleRouters.post('/addTag',(req,res) => {
    
    const {label} = req.body;

    if(!label){
        return res.send({
            success: false,
            message: "字段缺失：label [标签名称]"
        });
    }

    // 关联的文章总数
    let relevancy = 0;

    articlePool.addArticleTag({label,relevancy})
        .then(data=>{
            if (data.affectedRows > 0 ){
                return res.send({
                    success: true,
                    message: "文章标签类添加成功！"
                })
            }else{
                return res.send({
                    success: false,
                    message: `新增标签类失败：${message}`
                })
            }
        })
        .catch(err=>{
            return res.send({
                success: false,
                message: `失败：${err}`
            })
        });
});

// 获取文章标签接口
articleRouters.get('/queryTags',(req,res) => {
    articlePool.queryArticleTags()
        .then(result => {
            return res.send({
                success: true,
                message: "查询成功！",
                entity: {
                    list: result
                }
            });
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            });
        })
});

// 删除文章标签接口
articleRouters.get('/deleteTag', (req, res) => {
    const {gid} = req.query;

    if (!gid) {
        return res.send({
            success: false,
            message: "字段缺失：gid [标签gid]"
        });
    }


    articlePool.deleteArticleTag(gid)
        .then(data => {
            if (data.affectedRows > 0) {
                return res.send({
                    success: true,
                    message: "文章标签类删除成功！"
                })
            } else {
                return res.send({
                    success: false,
                    message: `删除标签类失败：${message}`
                })
            }
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `失败：${err}`
            })
        });
});


// 获取文章列表接口
articleRouters.get('/queryList', (req, res) => {
    const {aid, title, type_id, currentPage, pageSize} = req.query;

    let tableState = {};
    let queryParams = [];

    if(!!aid){
        queryParams.push({
            key: "aid",
            value: aid
        })
    }

    if(!!title){
        queryParams.push({
            key: "title",
            value: title
        });
    }

    if(!!type_id){
        queryParams.push({
            key: "type_id",
            value: type_id
        });
    }

    if (!!currentPage && !!pageSize ) {
        tableState.currentPage = currentPage;
        tableState.pageSize = pageSize;
    } else if (currentPage != undefined && pageSize == undefined) {
        return res.send({
            success: false,
            message: '页码参数【pageSize】缺失！页码参数包括【currentPage、pageSize】'
            
        });
    } else if (currentPage == undefined && pageSize != undefined) {
        return res.send({
            success: false,
            message: '页码参数【currentPage】缺失！页码参数包括【currentPage、pageSize】'

        });
    }

    articlePool.queryArticleList(tableState,queryParams)
        .then(result => {

            let listData = result.map(item => {
                return {
                    "aid": item.aid,
                    "type_id": item.type_id,
                    "type_name": item.type_name,
                    "tags": item.tags,
                    "title": item.title,
                    "create_time": TOOLS.toWorkTime(item.create_time),
                    "view_count": item.view_count,
                    "introduce": item.introduce,
                    "content": item.content
                }
            });

            return res.send({
                success: true,
                message: "查询成功！",
                entity: {
                    list: listData
                }
            });
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            })
        })
});

// 获取文章详情接口
articleRouters.get('/queryDetails', (req, res) => {
    const {
        aid: id
    } = req.query;

    if (!id) {
        return res.send({
            success: false,
            message: "参数缺失：aid【文章编号aid】"
        })
    }

    articlePool.queryArticleDetails(id)
        .then(result => {
            if (result.length == 0) {
                return res.send({
                    success: true,
                    message: `查询失败,当前编号【${id}】文章不存在!`
                })
            } else {
                let detailsData = result.map(item => {
                    return {
                        "aid": item.aid,
                        "type_id": item.type_id,
                        "type_name": item.type_name,
                        "tags": item.tags,
                        "title": item.title,
                        "create_time": TOOLS.toWorkTime(item.create_time),
                        "view_count": item.view_count,
                        "introduce": item.introduce,
                        "content": item.content
                    }
                });

                return res.send({
                    success: true,
                    message: "查询成功",
                    entity: detailsData[0]
                })
            }
        })
        .catch(err => {
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            })
        })
});

// 新增文章接口
articleRouters.post('/add', (req, res) => {
    const {type_id, type_name, tagsData:tags, title, create_time, introduce, content} = req.body;

    if (!title) {
        return res.send({
            success: false,
            message: "参数缺失,缺少文章标题字段【title】"
        });
    } else if (title.length > 30) {
        return res.send({
            success: false,
            message: "参数格式错误,文章标题不得超过30位"
        });
    } else if (!/^[A-Za-z0-9\u4e00-\u9fa5-_——]+$/.test(title)) {
        return res.send({
            success: false,
            message: "参数格式错误,文章标题格式不正确！数字、字母、汉字、——、-及_"
        });
    } else if(!type_id){
        return res.send({
            success: false,
            message: "参数缺失,缺少文章分类id【type_id】"
        })
    } else if (!type_name) {
        return res.send({
            success: false,
            message: "参数缺失,缺少文章分类字段【type_name】"
        });
    } else if (!tags.length) {
        return res.send({
            success: false,
            message: "参数缺失,缺少文章标签字段【tagsData】"
        });
    } else if (!introduce) {
        return res.send({
            success: false,
            message: "参数缺失,缺少文章简介字段【introduce】"
        });
    } else if (!content) {
        return res.send({
            success: false,
            message: "参数缺失,缺少文章内容字段【content】"
        });
    }else{

        let requireParams = {
            type_id, type_name, tags: JSON.stringify(tags), title, create_time, introduce, content
        }

        // console.log("requireParams", requireParams.tags);

        articlePool.addArticle(requireParams)
            .then(data=>{
                // console.log( data );
                if( data.affectedRows > 0){
                    return res.send({
                        success: true,
                        message: "文章新增成功！"
                    })
                }else{
                    return res.send({
                        success: false,
                        message: `文章新增失败！原因：${message}`
                    })
                }
            })
            .catch(err=>{
                return res.send({
                    success: false,
                    message: `失败，原因:${err}!`
                })    
            })
    }

    


});

// 删除文章接口
articleRouters.get('/delete', (req, res) => {
    const {aid} = req.query;
    
    if(!aid){

        return res.send({
            success: false,
            message: '字段缺失：【aid】文章编号id'
        });

    }else{
        let requireParams = [{
            key: "aid",
            value: aid
        }];

        articlePool.queryArticleList(null, requireParams)
            .then(data=>{
                // console.log('data>>', data.length);

                if( data.length > 0 ){

                    return articlePool.deleteArticle(aid);

                }else{

                    return res.send({
                        success: false,
                        message: `当前aid【${aid}】文章不存在不存在！`
                    });

                }

            })
            .then(data=>{
                // console.log( "文章删除回调", data );
                if (  data.affectedRows>0 ){
                    return res.send({
                        success: true,
                        message: `编号：【${aid}】，已删除！`
                    })
                }
            })
            .catch(err=>{
                return res.send({
                    success: false,
                    message: `后台程序异常！原因：${err}`
                })
            });

    }




});



module.exports = articleRouters;