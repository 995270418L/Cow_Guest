# [牛客－编程之美](https://www.nowcoder.com)

## web文本检测应用
项目使用javascript进行文件的处理，核心代码封装成一个compare方法，接受两个参数source和update分
别是原文件内容和改后文件内容。

	
* 项目优点:
	1.	使用map数据结构来储存不同字符的位置和值(所以需要浏览器支持es6语法)
	2.	针对显示效果的优化(innerHTML,空格)
	3.	代码易理解
* 缺点 :
	1.	文件过大文字过多页面显示效果不好(会造成浏览器卡顿)
	2.	不能跨行匹配（重点）
	3.	不能前端边输入边匹配
	4.	for循环太多，速度不行
	5.	还有bug等着我去发现......


总之还是不太满意，下一步的目标是争取使用正则去匹配字符串，那样速度快。欢迎pull


#### 本地使用:
	npm install 
	node index.js
	打开浏览器: http://127.0.0.1:3000

*****
