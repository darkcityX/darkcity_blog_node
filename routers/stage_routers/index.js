const express = require('express');
const backStageRouter = express.Router();



/**
 * @description: 导入二级路由【后台接口路由】
 */
// -用户模块
const blogerRouters = require('./bloger_router');

/**
 * @description: 二级路由挂载
 *  - /user 用户模块
 */
backStageRouter.use('/bloger', blogerRouters);



module.exports = backStageRouter;