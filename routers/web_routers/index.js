const express = require('express');
const webRouter = express.Router();



/**
 * @description: 导入二级路由【接口路由】
 */
// -用户模块
const blogerRouters = require('./bloger_routers');
// -文章相关
const articleRouters = require('./article_routers');

/**
 * @description: 二级路由挂载
 *  - /bloger 博主信息模块
 */
webRouter.use('/bloger', blogerRouters);
webRouter.use('/article', articleRouters);



module.exports = webRouter;