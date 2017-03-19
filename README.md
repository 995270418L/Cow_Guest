# [牛客－编程之美](https://www.nowcoder.com)

## web文本检测应用
项目后台使用nodeJS进行文件的处理，核心代码封装成一个compare方法，接受两个参数source和update分别是原文件内容和改后文件内容，前后端使用原生ajax通信。应用运行速度还是挺客观的。
核心代码是使用正则按行匹配文本内容，找出更新的部分内容

		let re = new RegExp("(?=.*?)[^"+ sr_words +"](?=.*?)","gi");
		while( (result = re.exec(up_words))!= null ){
				return_value.update.push(result);
	　　 }

你也可以更改正则匹配原则，匹配更多的特殊情况

#### 本地使用:
	npm install 
	node index.js
	打开浏览器: http://127.0.0.1:3000

项目还需继续完善，比如前端添加在线匹配功能(边输入边匹配)，针对英文的特殊匹配，行间匹配等等
由于前端技术不太行，所以如有更多bug欢迎put request
