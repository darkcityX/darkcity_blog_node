# darkcity_blog_node


## 数据库创建
    - 博主信息表
        id    
        name
        age
        tags
        signature
        github
        qq
        wechat

    - 文章类型表
        id              // 类型id
        typeName        // 类型名称
        orderNum        // 排序编号   作为置顶字段适用

        文章类型
            前端
            后端
            服务器

    
    - 文章内容表
        id              // 文章编号
        typeId         // 文章类型编号
        title           // 文章标题
        introduce       // 文章简介
        content         // 文章主体
        createTime      // 创建时间
        view_count      // 浏览次数



