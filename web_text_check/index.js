//web文本检查工具

const Koa = require('koa2');
const readline = require('readline');
const router = require('./routes');
let app = new Koa();

app.use(async (ctx,next) => {
    let startTime = new Date().getTime();
    console.log(`request url: ${ctx.url} ; request method: ${ctx.method} `);
    await next();
    let spendTime = new Date().getTime();
    console.log(`${spendTime - startTime} ms`);
});

//配置路由
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);