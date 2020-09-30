#设置客户端的字符集编码格式
SET NAMES UTF8;

#删除指定的数据库mall
DROP DATABASE IF EXISTS darkcity_blog;

#创建mall数据库
CREATE DATABASE darkcity_blog CHARSET=UTF8;

#进入mall数据库
USE darkcity_blog;

/* ---------------------------------------- 前台：开始 ---------------------------------------- */

/* ----- 博主信息表: 开始 ------ */
CREATE TABLE bloger
(
    uid     VARCHAR(50) NOT NULL,     # 博主id
    name    VARCHAR(10) NOT NULL,            # 博主名称
    age     VARCHAR(5),                      # 博主年龄
    avater  VARCHAR(50) NOT NULL,            # 头像地址
    tags    VARCHAR(200),                    # 技能标签
    signature VARCHAR(200),                  # 座右铭
    github  VARCHAR(50),                     # github地址
    qq      VARCHAR(50),                     # qq地址
    wechat  VARCHAR(50),                     # 微信地址
    PRIMARY KEY (uid)
);

INSERT INTO bloger VALUES 
(
    "7879765465461xa4sd6a5",
    "darkcity_X",
    "18",
    "/public/cc.jpg",
    "['vue','react']",
    "骚年，努力吧！",
    "githubsss111",
    "1668795461",
    "darkcsit_x"
);
/* ----- 博主信息表: 结束 ------ */


/* ----- 文章类型表: 开始 ------ */
CREATE TABLE articleClass
(
    tid          VARCHAR(50) NOT NULL,          # 文章分类编号
	type_name    VARCHAR(10) NOT NULL,          # 文章分类名称(10)
	description  VARCHAR(50),                   # 文章分类说明(最大50,不必填)
    create_time  BIGINT,                        # 创建时间(毫秒级时间戳11位)
	PRIMARY KEY (tid)
);

INSERT INTO articleClass VALUES
("e2f000f8-21b3-48de-aeff-fa605d2042b9", 'vue', '渐进式框架', 1596094345998),
("a2ewq0f8-21b3-48de-aeff-fa605d2q42b8", 'react', 'facsbook你懂的', 1596094345998);

/* ----- 文章类型表: 开始 ------ */

/* ----- 文章标签表: 开始 ------ */
CREATE TABLE articleTags
(
    gid          VARCHAR(50) NOT NULL,           # 文章标签编号
	label        VARCHAR(10) NOT NULL,           # 文章标签名称(10)
	relevancy    INT(100),                       # 文章标签关联文章数
    create_time  BIGINT,                         # 创建时间(毫秒级时间戳11位)
	PRIMARY KEY (gid)
);

INSERT INTO articleTags VALUES
("c0afb133-b15a-48de-90d5-b248cffccc45", 'html', 10, 1596094345998),
("c02acb23-b15a-48de-90d5-b248cffc289a", 'css', 0, 1596094345998);

/* ----- 文章标签表: 结束 ------ */





/* ----- 文章详情表: 开始 ------ */
CREATE TABLE articleDetails
(
    aid         VARCHAR(50) NOT NULL,  # 文章编号id
    type_id     VARCHAR(50) NOT NULL,         # 文章类型编号
    type_name   VARCHAR(10) NOT NULL,         # 文章分类名称
    tags        VARCHAR(500),                 # 文章标签
    title       VARCHAR(50) NOT NULL,         # 文章标题(不大于50个字符)
    view_count  INT,                          # 浏览次数
    create_time BIGINT,                       # 创建时间(毫秒级时间戳11位)
    introduce   TEXT,                         # 文章简介(65535)
    content     TEXT,                         # 文章内容(65535)
    PRIMARY KEY (aid)
);

INSERT INTO articleDetails VALUES
(
    "5546f720-1c12-46a2-809a-ec88ccf29617",
    'a2ewq0f8-21b3-48de-aeff-fa605d2q42b8',
    'react',
    '',
    'react自学',
    112,
    1596094345998,
    "React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。",
    '# P01:课程介绍和环境搭建\n [ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n > Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n **这是加粗的文字**\n\n *这是倾斜的文字*`\n\n ***这是斜体加粗的文字***\n\n ~~这是加删除线的文字~~ \n\n \`console.log(111)\` \n\n # p02:来个Hello World 初始React3.0\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n ***\n\n\n # p03:React3.0基础知识讲解1111\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n # p04:React3.0基础知识讲解222222\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n #6 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  #5 p05:React3.0基础知识讲解333333\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n  # p06:React3.0基础知识讲解444444\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n # p07:React3.0基础知识讲解555555\n > aaaaaaaaa\n >> bbbbbbbbb\n >>> cccccccccc\n\n ``` var a=11; ```'

);
/* ----- 文章详情表: 结束 ------ */


/* ----- 后台管理员信息表: 开始 ------ */
CREATE TABLE admintor
(
    uid         VARCHAR(50) NOT NULL,     # 管理员id
    username    VARCHAR(10) NOT NULL,            # 管理员账号
    password    VARCHAR(20) NOT NULL,            # 管理员密码
    avater      VARCHAR(50) NOT NULL,            # 管理员头像
    nickname    VARCHAR(10) NOT NULL,            # 管理员昵称
    role        VARCHAR(10) NOT NULL,            # 管理员权限： _root[根管理员]   _admin[管理员] 
    PRIMARY KEY (uid)
);

INSERT INTO admintor VALUES(
    "dsadsadsa121312311d",
    'admin',
    '123456',
    "/public/cc.jpg",
    '大王二',
    '_root'
);

/* ---------------------------------------- 后台：结束 ---------------------------------------- */