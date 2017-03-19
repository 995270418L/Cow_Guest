const router = require('koa-router')();
const multer = require('koa-multer');
const fs = require('fs');
const path = require('path');

router.get('/',(ctx,next) => {
    let text = fs.readFileSync(path.join(__dirname,'../textInput.html'),'utf8');
    ctx.response.header = {'Content-type':'text/html'};
    ctx.body = text;   
});

//配置上传路径
const upload = multer({
    dest: path.join(__dirname,"../public")
});


//获取上传的原文件
router.post('/postText1',upload.single('upload'),(ctx,next) => {
    console.log('uploadText1');
    //上传之后
    let upload = ctx.req.file.path.split('/').pop();
    let text = fs.readFileSync(path.join(__dirname,"../public/"+upload),'utf8');
    ctx.body = text;
});

//获取上传后的新文件
router.post('/postText2',upload.single('upload'),(ctx,next) =>{
    console.log('uploadText2');
    let upload = ctx.req.file.path.split('/').pop();
    let update = fs.readFileSync(path.join(__dirname,"../public/" + upload),'utf-8');
    // let newText = compare(source,update);
    ctx.body = update;
});
module.exports = router;
