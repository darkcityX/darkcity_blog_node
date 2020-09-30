const express = require('express');
const backStageRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */
// -博主信息模块
const admintorRouters = require('./admintor_routers');
// -文章模块
const articleRouters = require('./article_routers');

/**
 * @description: 二级路由挂载
 *  - /bloger 博主信息模块
 *  -/articleRouters 文章模块
 */
backStageRouter.use('/admin', admintorRouters);
backStageRouter.use('/article', articleRouters);



module.exports = backStageRouter;