  
#设置客户端的字符集编码格式
SET NAMES UTF8;

#删除指定的数据库mall
DROP DATABASE IF EXISTS darkcity_blog;

#创建mall数据库
CREATE DATABASE darkcity_blog CHARSET=UTF8;

#进入mall数据库
USE darkcity_blog;

/* ----- 文章类型表: 开始 ------ */
CREATE TABLE articleClass
(
    id      INT NOT NULL AUTO_INCREMENT,   # 一级商品分类编号
	typeName VARCHAR(10) NOT NULL,          # 一级分类名称
	label     VARCHAR(100),
	PRIMARY KEY (fid)
);
/* ----- 文章类型表: 开始 ------ */