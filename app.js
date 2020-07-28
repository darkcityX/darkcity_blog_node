const express = require('express');
const app = express();

const path = require('path');

const bodyPaser = require('body-parser');

// 解析表单数据 x-www-form-urlencode
app.use(bodyPaser.urlencoded({ extended: false }));
// 解析json数据 
app.use(bodyPaser.json());

/**
 * @description: 引入一级路由
 */
// 前台接口总路由
const webRouter = require('./routers/web_routers');
// 后台接口总路由
// const backStageRouter = require('./routers/stage_routers');




// 一级路由挂载
app.use('/web', webRouter);
// app.use('/backstage', backStageRouter);

/**
 * 静态资源服务：上传资源的访问
 * */ 
app.use('/public',express.static(path.join(__dirname,'./public/uploads')));


app.listen("3300", () => {
    console.log(
        " ......................阿弥陀佛......................\n" +
        "                       _oo0oo_                       \n" +
        "                      o8888888o                      \n" +
        "                      88\" . \"88                    \n" +
        "                      (| -_- |)                      \n" +
        "                      0\\  =  /0                     \n" +
        "                    ___/‘---’\\___                   \n" +
        "                  .' \\|       |/ '.                 \n" +
        "                 / \\\\|||  :  |||// \\              \n" +
        "                / _||||| -卍-|||||_ \\               \n" +
        "               |   | \\\\\\  -  /// |   |            \n" +
        "               | \\_|  ''\\---/''  |_/ |             \n" +
        "               \\  .-\\__  '-'  ___/-. /             \n" +
        "             ___'. .'  /--.--\\  '. .'___            \n" +
        "         .\"\" ‘<  ‘.___\\_<|>_/___.’>’ \"\".        \n" +
        "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |         \n" +
        "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /     \n" +
        "    =====‘-.____‘.___ \\_____/___.-’___.-’=====      \n" +
        "                       ‘=---=’                       \n" +
        "                                                     \n" +
        "....................佛祖保佑 ,永无BUG.................\n" +
        ".......... 该项目由【我们都对】团队鼎力支持 ...........\n" +
        "............服务启动 http://localhost:3300........... \n" +
        "  api文档(公共)：http://localhost:3300/apidoc/common \n" +
        "  api文档(前台)：http://localhost:3300/apidoc/web    \n" +
        "  api文档(后端)：http://localhost:3300/apidoc/backstage "
    );
})