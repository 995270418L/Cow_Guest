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

let source = "";

//获取上传的原文件
router.post('/postText1',upload.single('upload'),(ctx,next) => {
    console.log('uploadText1');
    //上传之后
    let upload = ctx.req.file.path.split('/').pop();
    let text = fs.readFileSync(path.join(__dirname,"../public/"+upload),'utf8');
    source = text;
    ctx.body = text;
});

//获取上传后的新文件
router.post('/postText2',upload.single('upload'),(ctx,next) =>{
    console.log('uploadText2');
    let upload = ctx.req.file.path.split('/').pop();
    let update = fs.readFileSync(path.join(__dirname,"../public/" + upload),'utf-8');
    let newText = compare(source,update);
    ctx.body = JSON.stringify(newText);
});

/**
 * source:原文件
 * update:新文件
 */
function compare(source, update){
    //对不同的字符进行标记
    let return_value = {update:[],text2:update,differ:0,total:0};
    
    let source_arr = source.split("\n");
    let update_arr  = update.split("\n");
    let diff,total,result;
    //i 代表 update_arr j代表source_arr
    for(let i=0,j=0;j<source_arr.length && i<update_arr.length ;i++,j++){
        //先判断单词不同还是字符不同
        // console.log("update_arr: " +update_arr[i]);
        // console.log("source_arr:" +source_arr[j]);
        let up_words = update_arr[i];
        let sr_words = source_arr[i];
        if(up_words == "" && sr_words != ""){
            j--;
            continue;
        }else if(up_words != "" && sr_words == ""){
            return_value.update.push("\\n");
            i--;
            continue;
        }
        //使用正则表达式来匹配(多行匹配)
        //不懂正则意思 ? http://www.cnblogs.com/afarmer/archive/2011/08/29/2158860.html : 略过
        let re = new RegExp("(?=.*?)[^"+ sr_words +"](?=.*?)","gi");
        while( (result = re.exec(up_words))!= null ){
            //这是找寻所有的不同的字符 只能执行单项匹配，这个的目的是为了和原文件比较，为什么还要考虑原文件的不同之处
            return_value.update.push(result);
        }
    }
    if(return_value){
        diff = return_value.update.length;
        let total = update.split("\n").join("").length;
        return_value.differ = diff;
        return_value.total = total;
        return return_value;
    }else{
        console.log("return_value is null");
        return null;
    }
}
module.exports = router;
