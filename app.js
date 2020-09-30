const express = require('express');
const app = express();

const path = require('path');

const bodyPaser = require('body-parser');

const JwtUtil = require('./public/utils/jwt');

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
const backStageRouter = require('./routers/stage_routers');


/**
 * @description: 后台配置处理跨域问题
 * @Date Changed: 2020-07-31
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //这段仅仅为了方便返回json而已
    // res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});

/**
 * @description: 接口token验证校验
 * @Date Changed: 2020-08-05
 */
app.use((req, res, next) => {
    if (req.url.includes("/backstage")) { // 后台接口进行token校验

        // 过滤掉后台部分不需要进行token校验的接口
        if (!req.url.includes("/login")) {

            let token = req.headers.token;
            let jwt = new JwtUtil(token);
            let result = jwt.verifyToken();

            if(result == 'err'){

                return res.send({
                    success: false,
                    message: "登录已过期,请重新登录",
                    entity: {
                        token: -1
                    }
                });

            }else{
                next();
            }


        }else{
            next();
        }

    }else{  // 前台接口不用进行token校验
        next();
    }
});


// 一级路由挂载
app.use('/web', webRouter);
app.use('/backstage', backStageRouter);



/**
 * 静态资源服务：上传资源的访问
 * */ 
app.use('/public',express.static(path.join(__dirname,'./public/uploads')));

//
app.use('/', express.static(path.join(__dirname, './www/build')));


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
        ".........  该项目由【darkcity_x】支持完成  ...........\n" +
        "............服务启动 http://localhost:3300........... " 
    );
})