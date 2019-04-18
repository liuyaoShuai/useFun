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

//冒泡排序法
function sort(element){
	for(var i=0;i<element.length;i++){
		for(var j=0;j<element.length;j++){
			if(element[j] > element[i]){
				let middle = element[j];
				element[j] = element[j + 1];
				element[j+1] = middle;
			}
		}
	}
}

//判断浏览器类型以及版本信息  {brower:'chrome',ver:'63'}
function getBrowserInfo(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}

//原生书写ajax过程
function jsAjax(){
	
		//1.创建ajax对象
        //只兼容非ie6的浏览器，在ie6浏览器上运行会提示没有被定义
        //var oAjax = new XMLHttpRequest();//这才是ajax实际的请求
        //alert(oAjax);
        
        //ie6浏览器下按照下面方法写,但是在别的浏览器中不能用，会报错。
        //var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        //alert(oAjax);
        
        //鉴于上面出现的问题，可以采取下面的方法解决，用if判断是否为IE6浏览器
        if(window.XMLHttpRequest)//如果有XMLHttpRequest，那就是非IE6浏览器。()里面加window的原因下面会有描述。
        {
            var oAjax = new XMLHttpRequest();//创建ajax对象
        }
        else//如果没有XMLHttpRequest，那就是IE6浏览器
        {
            var oAjax = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
        }
        
        //2.连接服务器
        //open(方法、文件名、异步传输）
        //方法：
            //传输方式是get方式还是post方式。
        //文件名
            //告诉服务器要读哪个文件
        //异步传输
            //异步：多件事一件一件的做
            //同步：多件事情一起进行
            //但是js里面的同步和异步和现实的同步异步相反。
                //同步：多件事一件一件的做
                //异步：多件事情一起进行
        //ajax天生是用来做异步的
        
        oAjax.open("GET","a.txt?t='+new Date().getTime()",true);//加上t='+new Date().getTime()"的目的是为了消除缓存，每次的t的值不一样。
        
        //3.发送请求
        oAjax.send();
        
        //4.接收返回
        //客户端和服务器端有交互的时候会调用onreadystatechange
        oAjax.onreadystatechange=function()
        {
            //oAjax.readyState  //浏览器和服务器，进行到哪一步了。
                //0->（未初始化）：还没有调用 open() 方法。
                //1->（载入）：已调用 send() 方法，正在发送请求。
                //2->载入完成）：send() 方法完成，已收到全部响应内容。
                //3->（解析）：正在解析响应内容。
                //4->（完成）：响应内容解析完成，可以在客户端调用。
            if(oAjax.readyState==4)
            {
                if(oAjax.status==200)//判断是否成功,如果是200，就代表成功
                {
                    alert("成功"+oAjax.responseText);//读取a.txt文件成功就弹出成功。后面加上oAjax.responseText会输出a.txt文本的内容
                }
                else
                {
                    alert("失败");
                }
            }
        };	
}

//上述函数简写成以下函数
function ajax(url,fnSucc)
{
    if(window.XMLHttpRequest)
        {
            var oAjax = new XMLHttpRequest();
        }
        else
        {
            var oAjax = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
        }
        oAjax.open("GET",url,true);//把要读取的参数的传过来。
        oAjax.send();
        oAjax.onreadystatechange=function()
        {
            if(oAjax.readyState==4)
            {
                if(oAjax.status==200)
                {
                    fnSucc(oAjax.responseText);//成功的时候调用这个方法
                }
                else
                {
                    if(fnfiled)
                    {
                        fnField(oAjax.status);
                    }
                }
            }
        };
}


