  // 对特殊符号进行转义
  function escapeHtml(str){
	  return str.replace(/[<>"&]/g,function(match){
		  switch(match){
			  case '<':
				return '&lt';
			  case '>':
				return '&gt';
			 case '&':
				return '&amp';
			 case '\"':
				return 'quot';
		  }
	  })
  }
  
  //时间戳格式化  返回格式为 2019-04-17
  function timeFormat(){
	  var d = new Date();
	  var year = d.getFullYear();
	  var month = d.getMonth() + 1;
	  month = month < 10 ? '0'+month : month;
	  var day = d.getDate();
		day = day < 10 ? '0'+ day : day;
	   return `${daya}-${month}-${day}`;
  }
  
  //抓取页面某一类元素
  function getElement(){
	  var domList = document.getElementsByTagName('input');
	  var checkBoxList = [];
	  
	  var len = domList.length;
	  
	  while(len--){
		  if(domList[len].type == 'checkbox'){
			  checkBoxList.push(domList[len])
		  }
	  }
  }
  
  //清除字符串前后的空格   使用自带接口trim（）考虑兼容性
  function clearStrSpace(){
	  if(!String.prototype.trim){
		  String.prototype.trim = function(){
			  // %s 匹配空白字符、回车 换行 制表符 tab  空格
			  return this.replace(/^\s+/,'').replace(/\s+$/,'')
		  }
	  }
  }
  
  //判断一个字符串中出现次数最多的字符 并统计这个次数
  function countStr(str){
	  var json = {};
	  for(var i=0;i<str.length;i++){
		  if(!json[str.charAt(i)]){
			  json[str.charAt(i)] = 1;
		  }else{
			  json[str.charAt(i)]++;
		  }
	  }
	  
	  var iMax = 0;
	  var index = '';
	  for(var a in json){
		  if(json[i]>iMax){
			  iMax = json[i];
			  index = i;
		  }
	  }
	  return `出现次数最多的是:${index}出现${iMax}次`;
	};
  
  //兼容写法
  function eventFun(){
	  var event = event || window.event;
	  
	  document.documentElement.clientWidth || document.body.clientWidth
	  
	  var target = event.srcElement || event.target;
  };
  
 //数组去重
 Array.prototype.unique = function(){
	 var len = this.length,
		 newArr = []
		 flag = 1;
	 for(var i=0;i<len;i++,flag=1){
		 for(var j=0;j<i;j++){
			 if(this[i] == this[j]){
				 flag = 0; //找到相同的数字后  不执行添加数据
			 }
		 }
		 flag ? newArr.push(this[i]) :'';
	 }
	 return newArr;
 }
 
 Number.prototype.N = function(){
	 let re = 1;
	 for(let i=0;i<=this;i++){
		 re *= i;
	 }
	 return re
 };
 
 //eg   var num = 6; alert(num.N())
 
 //阻止冒泡函数
 function stopPropagation(e){
	 e = e || window.event;
	 if(e.stopPropagation){
		 e.stopPropagation()
	 }else{
		 e.cancelBubble = true;
	 }
 }
 
 //将url 参数组成一个对象集合、  eg  var url = '?name=12&age=12'
 String.prototype.urlQuertString = function(){
	 var url = this.split('?')[1].split("&"),
		  len = url.length;
		  
	 this.url = {};
	 for(var i=0;i<len;i++){
		 var cell = url[i].split('='),
			key = cell[0],
			val = cell[1];
			
			this.url[""+key+""] = val;
	 }
	 return this.url;
 }
 
 
 //traversal(document) 循环目标节点  进行你需要的操作
 function traversal(node) {
    //对node的处理
    if (node && node.nodeType === 1) {
        console.log(node.tagName);
    }
    var i = 0,
        childNodes = node.childNodes,
        item;
    for (; i < childNodes.length; i++) {
        item = childNodes[i];
        if (item.nodeType === 1) {
            //递归先序遍历子节点
            traversal(item);
        }
    }
}
