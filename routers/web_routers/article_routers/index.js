const express = require('express');
const articleRouters = express.Router();

const articlePool = require("./../../../db/web/article_pool");

const TOOLS = require("./../../../tools");


// 获取文章类型接口
articleRouters.get('/queryType',(req,res)=>{

    articlePool.queryArticleType()
        .then(result=>{
            return res.send({
                success: true,
                message: "查询成功！",
                entity: {
                    list: result
                }
            });
        })
        .catch(err=>{
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            });
        })



    // let result = {
    //     success: true,
    //     message: "查询成功！",
    //     entity: {
    //         list: [
    //             {
    //                 id: 100,
    //                 typeName: "react",
    //                 label: "",
    //                 orderNum: 1
    //             },
    //             {
    //                 id: 200,
    //                 typeName: "vue",
    //                 label: "",
    //                 orderNum: 0
    //             }
    //         ]
    //     }
    // }
    

    // res.send(result);
})

// 获取文章列表接口
articleRouters.get('/queryList',(req,res)=>{

    articlePool.queryArticleList()
        .then(result=>{

            console.log( result[0] );

            let listData = result.map(item=>{
                return {
                    "aid": item.aid,
                    "type_id": item.type_id,
                    "type_name": item.type_name,
                    "title": item.title,
                    "create_time": TOOLS.toWorkTime(item.create_time ),
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
        .catch(err=>{
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            })
        })
})

// 获取文章详情接口
articleRouters.get('/queryDetails', (req, res) => {
    const {aid:id} = req.query;

    if(!id){
        return res.send({
            success: false,
            message: "参数缺失：aid【文章编号aid】"
        })
    }

    articlePool.queryArticleDetails(id)
        .then(result=>{
            if( result.length == 0 ){
                return res.send({
                    success: true,
                    message: `查询失败,当前编号【${id}】文章不存在!`
                })
            }else{
                let detailsData = result.map(item => {
                    return {
                        "aid": item.aid,
                        "type_id": item.type_id,
                        "type_name": item.type_name,
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
        .catch(err=>{
            return res.send({
                success: false,
                message: `查询失败，原因:${err}!`
            })
        })
    // let result = {
    //     success: true,
    //     message: "查询成功",
    //     entity: {
    //         id: "1",
    //         typeId: "100",
    //         title: "react自学",
    //         introduce: "React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。",
    //         content: '# P01:课程介绍和环境搭建\n' +
    //             '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    //             '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    //             '**这是加粗的文字**\n\n' +
    //             '*这是倾斜的文字*`\n\n' +
    //             '***这是斜体加粗的文字***\n\n' +
    //             '~~这是加删除线的文字~~ \n\n' +
    //             '\`console.log(111)\` \n\n' +
    //             '# p02:来个Hello World 初始React3.0\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n' +
    //             '***\n\n\n' +
    //             '# p03:React3.0基础知识讲解\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n\n' +
    //             '# p04:React3.0基础知识讲解\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n\n' +
    //             '#5 p05:React3.0基础知识讲解\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n\n' +
    //             '# p06:React3.0基础知识讲解\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n\n' +
    //             '# p07:React3.0基础知识讲解\n' +
    //             '> aaaaaaaaa\n' +
    //             '>> bbbbbbbbb\n' +
    //             '>>> cccccccccc\n\n' +
    //             '``` var a=11; ```',
    //         create_time: "",
    //         view_count: 1102
    //     }

    // }

    // res.send(result);
})


module.exports = articleRouters;